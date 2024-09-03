import json
import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import time

chrome_options = Options()
chrome_options.add_argument("--headless")  
chrome_options.add_argument("--disable-gpu")  
chrome_options.add_argument("--no-sandbox") 
chrome_options.add_argument("--disable-dev-shm-usage")  

driver = webdriver.Chrome(options=chrome_options)

vulnerabilities_data = []

def scrape_page():
    page_source = driver.page_source
    soup = BeautifulSoup(page_source, "html.parser")
    
    vulnerabilities = soup.find_all('span', class_='advListItem')
    
    if not vulnerabilities:
        print("No vulnerabilities found on page.")
        return False
    
    for item in vulnerabilities:
        vulnerability_name = item.find('a').text.strip()
        
        parent = item.find_parent('tr')
        
        if parent:
            severity_elem = parent.find('td', class_='impactTD').find('span', class_='ng-binding')
            if severity_elem:
                severity = severity_elem.text.strip()
            else:
                severity = "Unknown"
            
            vulnerabilities_data.append({
                "Vulnerability": vulnerability_name,
                "Severity": severity
            })
        else:
            print("Parent row not found for vulnerability:", vulnerability_name)
    
    return True

base_url = "https://sec.cloudapps.cisco.com/security/center/publicationListing.x"
driver.get(base_url)
time.sleep(3)  

page_count = 0
max_pages = 5

while page_count < max_pages:
    if not scrape_page():
        break
    
    try:
        next_button = driver.find_element(By.CSS_SELECTOR, "button.nextPage")
        if "ng-disabled" in next_button.get_attribute("class"):

            break
        next_button.click()
        time.sleep(3)  
        page_count += 1 
    except Exception as e:
        print(f"An error occurred: {e}")
        break

driver.quit()

current_script_dir = os.path.dirname(os.path.abspath(__file__))

parent_dir = os.path.dirname(current_script_dir)
target_folder = os.path.join(parent_dir, "data")  

if not os.path.exists(target_folder):
    os.makedirs(target_folder)

output_file = os.path.join(target_folder, "cisos_vulnerabilities.json")

with open(output_file, "w") as json_file:
    json.dump(vulnerabilities_data, json_file, indent=4)

print(f"Data has been written to {output_file}")
