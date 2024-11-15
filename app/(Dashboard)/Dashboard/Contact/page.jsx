"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className={`h-full w-full flex flex-col bg-white p-8 rounded-xl`}>
      <h1 className="text-4xl font-bold text-blue-700 mb-2 text-center">
        Get in Touch
      </h1>
      <p className="text-lg text-black mb-6 text-center">
        We are eager to hear from you , Feel free to reach out!
      </p>

      <div
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-grow overflow-auto"
      >
        <Card className="lg:col-span-1 p-4 shadow-xl rounded-xl bg-blue-50 border-2 border-blue-500">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4 lg:text-center text-blue-700">
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-600" />
                <p className="text-sm text-black">ajayps04981@gmail.com</p>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-blue-600" />
                <p className="text-sm text-black">+91 9257675123</p>
              </div>
              <div className="flex items-center">
                <MapPin className="lg:h-8 lg:w-8 mr-2 text-blue-600" />
                <p className="text-sm text-black">
                  Netaji Subhash University , Dwarka Sector-3 , New Delhi
                </p>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-600" />
                <div className="text-sm text-black">
                  <p>Monday - Friday: 9AM - 5PM</p>
                  <p>Saturday: 10AM - 2PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2 text-blue-700 lg:text-center">
                Follow Us
              </h3>
              <div className="flex mt-7 items-center justify-center space-x-3 pr-3">
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Facebook className="h-8 w-8" />
                </a>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Twitter className="h-8 w-8" />
                </a>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Instagram className="h-8 w-8" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 p-6 shadow-xl rounded-xl  bg-white border-2 border-blue-500">
          <CardContent>
            <h2 className="text-2xl font-semibold mb-4 text-blue-700 text-center">
              Send us a message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-black mb-1"
                  >
                    Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border-blue-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-500"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-black mb-1"
                  >
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-blue-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-500"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-black mb-1 "
                >
                  Subject
                </label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full border-blue-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-500"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full h-32 border-blue-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-500"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                Send Message
                <Send className="ml-2 mt-[2px] h-4 w-4" />
              </Button>
            </form>
            {isSubmitted && (
              <Alert className="mt-4 bg-green-100 border-green-400 text-green-700">
                <AlertDescription>
                  Thank you for reaching out! We have received your message and
                  will get back to you soon.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
