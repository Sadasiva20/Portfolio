"use client";

import React, { useState } from "react";
import { Form, Input, Textarea, Button, ButtonGroup } from "@heroui/react";
import emailjs from '@emailjs/browser';
import DOMPurify from 'dompurify'; 
import github from '../Icons/github.svg';
import linkedin from '../Icons/linkedin.svg';
import Image from 'next/image';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Me - Siva Sankar',
  description: 'Reach out to Siva Sankar via the contact form. Provide your first name, last name, email, and message to get in touch.',
  keywords: ['Contact', 'Siva Sankar', 'Email', 'Message', 'Portfolio'],
}

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (value.trim() !== '') {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.firstname.trim()) {
      newErrors.firstname = 'First name is required';
    }
    if (!formData.lastname.trim()) {
      newErrors.lastname = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const sanitizedData = {
      ...formData,
      message: DOMPurify.sanitize(formData.message),
    };

    try {
      await emailjs.send(
        'service_129dhn3',
        'template_0dy8viu',
        {
          firstname: sanitizedData.firstname,
          lastname: sanitizedData.lastname,
          email: sanitizedData.email,
          message: sanitizedData.message,
        },
        'xS1v-SnFrKn76m9-j'
      );

      alert('Message sent successfully!');
      setFormData({ firstname: '', lastname: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const handleClear = () => {
    setFormData({ firstname: '', lastname: '', email: '', message: '' });
    setErrors({});
  };

  return (
    
      <div className="flex flex-col min-h-screen bg-primary overflow-hidden">
        <head>
        <meta charSet="utf-8" />
        </head>
      
        <h1 className="text-3xl md:text-4xl text-white font-bold text-center">Contact Me! </h1>
        <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
          <div className="flex items-center justify-center w-full px-4">
            <div className="flex flex-col gap-6 p-8 bg-contact rounded-lg shadow-lg w-full max-w-2xl">
              <Form
                className="w-full"
                validationBehavior="native"
                validationErrors={errors}
                onReset={() => setFormData({ firstname: '', lastname: '', email: '', message: '' })}
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-6 w-full">
                  
                  <div className="w-full">
                    <Input
                      isRequired
                      errorMessage={({ validationDetails }) => {
                        if (validationDetails.valueMissing) {
                          return "First name is required";
                        }
                        return errors.firstname;
                      }}
                      label="First Name"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      className={`w-full font-bold text-lg text-black ${errors.firstname ? 'border-red-600' : ''}`}
                    />
                  </div>
                  
                  
                  <div className="w-full">
                    <Input
                      isRequired
                      errorMessage={({ validationDetails }) => {
                        if (validationDetails.valueMissing) {
                          return "Last name is required";
                        }
                        return errors.lastname;
                      }}
                      label="Last Name"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      className={`w-full font-bold text-lg text-black ${errors.message ? 'border-red-600' : ''}`}
                    />
                  </div>
                  
                  
                  <div className="w-full">
                    <Input
                      isRequired
                      errorMessage={({ validationDetails }) => {
                        if (validationDetails.valueMissing) {
                          return "Please enter your email";
                        }
                        if (validationDetails.typeMismatch) {
                          return "Please enter a valid email address";
                        }
                        return errors.email;
                      }}
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      type="email"
                      className={`w-full font-bold text-lg text-black ${errors.message ? 'border-red-600' : ''}`}
                    />
                  </div>
                  
                  
                  <div className="w-full">
                    <Textarea
                      isRequired
                      errorMessage={({ validationDetails }) => {
                        if (validationDetails.valueMissing) {
                          return "Message is required";
                        }
                        return errors.message;
                      }}
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter your message"
                      className={`w-full font-bold text-lg text-black ${errors.message ? 'border-red-600' : ''}`}
                    />
                  </div>
                  
                  
                  <ButtonGroup className="mt-4 flex flex-col gap-2 w-full">
                    <Button className="w-full text-lg" color="primary" type="submit">Send</Button>
                    <Button className="w-full text-lg" color="default" type="reset"  onClick={handleClear}>Clear</Button>
                  </ButtonGroup>
                </div>
              </Form>
            </div>
          </div>
        </main>
    
        <footer className="bg-primary text-white py-6 text-center">
          <p className="flex justify-center items-center space-x-8 mb-0">
            <span className="text-lg">&copy; {new Date().getFullYear()} Siva Sankar</span>
            <span className="mx-2">
              <a href="https://github.com/Sadasiva20?tab=repositories" target="_blank" rel="noopener noreferrer"  className="text-white hover:text-blue-500">
                <Image src={github} alt="GitHub" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 transition-transform transform hover:scale-125" />
              </a>
            </span>
            <span className="mx-2">
              <a href="https://www.linkedin.com/in/ssank31/" target="_blank" rel="noopener noreferrer"  className="text-white hover:text-blue-500">
                <Image src={linkedin} alt="LinkedIn" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 transition-transform transform hover:scale-125" />
              </a>
            </span>
          </p>
        </footer>
      </div>
    );
  };    
   

  export default ContactForm;
