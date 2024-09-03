import json
import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import time

# Set up Chrome options for headless mode
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run Chrome in headless mode
chrome_options.add_argument("--disable-gpu")  # Disable GPU acceleration
chrome_options.add_argument("--no-sandbox")  # Bypass OS security model
chrome_options.add_argument("--disable-dev-shm-usage")  # Overcome limited resource problems

# Initialize the WebDriver with the specified options
driver = webdriver.Chrome(options=chrome_options)

# List to store all vulnerability data
vulnerabilities_data = []

def scrape_page():
    # Get the page source after JavaScript has executed
    page_source = driver.page_source
    soup = BeautifulSoup(page_source, "html.parser")
    
    # Find all elements with the class 'advListItem'
    vulnerabilities = soup.find_all('span', class_='advListItem')
    
    if not vulnerabilities:
        print("No vulnerabilities found on page.")
        return False
    
    for item in vulnerabilities:
        # Extract the vulnerability name
        vulnerability_name = item.find('a').text.strip()
        
        # Locate the parent element and find the associated severity class
        parent = item.find_parent('tr')
        
        if parent:
            # Find the severity text
            severity_elem = parent.find('td', class_='impactTD').find('span', class_='ng-binding')
            if severity_elem:
                severity = severity_elem.text.strip()
            else:
                severity = "Unknown"
            
            # Add data to the list
            vulnerabilities_data.append({
                "Vulnerability": vulnerability_name,
                "Severity": severity
            })
        else:
            print("Parent row not found for vulnerability:", vulnerability_name)
    
    return True

# URL of the first page
base_url = "https://sec.cloudapps.cisco.com/security/center/publicationListing.x"
driver.get(base_url)
time.sleep(3)  # Allow initial page load time

# Counter for the number of pages scraped
page_count = 0
max_pages = 5

while page_count < max_pages:
    if not scrape_page():
        break
    
    try:
        # Find the "Next" button and click it
        next_button = driver.find_element(By.CSS_SELECTOR, "button.nextPage")
        if "ng-disabled" in next_button.get_attribute("class"):
            # If the "Next" button is disabled, exit the loop
            break
        next_button.click()
        time.sleep(3)  # Wait for the next page to load
        page_count += 1  # Increment page counter
    except Exception as e:
        print(f"An error occurred: {e}")
        break

# Close the WebDriver
driver.quit()

# Get the directory of the current script
current_script_dir = os.path.dirname(os.path.abspath(__file__))

# Define the path to the target folder (one directory up)
parent_dir = os.path.dirname(current_script_dir)
target_folder = os.path.join(parent_dir, "data")  # Folder name 'data' in the parent directory

# Ensure the target folder exists
if not os.path.exists(target_folder):
    os.makedirs(target_folder)

# Define the full path to the output JSON file
output_file = os.path.join(target_folder, "cisos_vulnerabilities.json")

# Write the data to the JSON file
with open(output_file, "w") as json_file:
    json.dump(vulnerabilities_data, json_file, indent=4)

print(f"Data has been written to {output_file}")
