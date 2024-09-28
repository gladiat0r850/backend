'use client'
import { useRef, useState } from 'react'
import { MapPin, Phone, Mail, Send, LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import emailjs from '@emailjs/browser'

export default function ContactPage() {
    const form = useRef<HTMLFormElement>(null); // Initialize ref with null
    const [formData, setFormData] = useState({
      from_name: '',
      from_email: '',
      from_phone: '',
      message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prevState) => ({
          ...prevState,
          from_name: e.target.value
        }));
      };
      const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prevState) => ({
          ...prevState,
          from_email: e.target.value
        }));
      };
      const handlePhoneNumberAssignment = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prevState) => ({
          ...prevState,
          from_phone: e.target.value
        }));
      };
      const handleMessage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prevState) => ({
          ...prevState,
          message: e.target.value
        }));
      };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true); // Set submitting state to true
  
      if (form.current) {
        console.log('submitting')
        // Ensure form.current is not undefined or null
        emailjs.sendForm('service_dmd9j2r', 'template_mskstxf', form.current, {
            publicKey: 'Ai0j2nqxYP2sFQ_IB'
        })
          .then(() => {
            setIsSubmitting(false)
            setFormData({
              from_name: '',
              from_email: '',
              from_phone: '',
              message: ''
            })
            alert('Email sent successfully!');
          })
          .catch((error) => {
            setIsSubmitting(false)
            console.error('Failed to send email:', error);
          });
      }
    };

  return (
    <div className="min-h-screen bg-white mt-12 text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Contact Velocity Apex
          </h1>
          <p className="mt-3 text-xl text-gray-600">
            Get in touch with our supercar experts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
            <form ref={form} onSubmit={handleSubmit} className="space-y-4">
            <div>
    <Label htmlFor="from_name">Name</Label>
    <Input
      id="from_name"
      name="from_name" // Updated name
      type="text"
      value={formData.from_name} // Corresponding value from formData
      onChange={handleNameChange}
      required
      className="w-full bg-white"
    />
  </div>
  <div>
    <Label htmlFor="from_email">Email</Label>
    <Input
      id="user_email"
      name="from_email" // Matches formData.user_email
      type="email"
      value={formData.from_email}
      onChange={handleEmailChange}
      required
      className="w-full bg-white"
    />
  </div>
  <div>
    <Label htmlFor="from_phone">Phone</Label>
    <Input
      id="user_phone"
      name="user_phone" // Matches formData.user_phone
      type="number"
      value={formData.from_phone}
      onChange={handlePhoneNumberAssignment}
      className="w-full bg-white"
    />
  </div>
  <div>
    <Label htmlFor="message">Message</Label>
    <Textarea
      id="message"
      name="message" // Updated name
      value={formData.message} // Corresponding value from formData
      onChange={handleMessage}
      required
      className="w-full h-32 resize-none bg-white"
    />
  </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Sending <LoaderCircle className="ml-2 h-5 w-5 animate-spin" /> </>
                ) : (
                  <>Send Message <Send className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </form>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <MapPin className="h-6 w-6 mr-3 text-blue-600" />
                <div>
                  <p className="font-semibold">Address</p>
                  <p>123 Supercar Lane, Speed City, SC 12345</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 mr-3 text-blue-600" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-6 w-6 mr-3 text-blue-600" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p>info@velocityapex.com</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-sm text-gray-600">
                Our team is available Monday through Friday, 9am to 6pm EST.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}