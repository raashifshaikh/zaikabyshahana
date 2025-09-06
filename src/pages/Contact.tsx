import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { showSuccess } from "@/utils/toast";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto py-16 md:py-24 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-900">Get in Touch</h1>
          <p className="text-stone-600 mt-2">We'd love to hear from you! Send us a message or find us at the locations below.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-amber-50 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-red-900 mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">Full Name</label>
                <Input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">Email Address</label>
                <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">Message</label>
                <Textarea id="message" name="message" required value={formData.message} onChange={handleChange} placeholder="Your message..." rows={5} />
              </div>
              <Button type="submit" className="w-full bg-red-800 hover:bg-red-900">
                Send Message
              </Button>
            </form>
          </div>
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-red-900">Contact Information</h2>
            <div className="flex items-start space-x-4">
              <div className="bg-red-800 text-white p-3 rounded-full">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Our Kitchen Studio</h3>
                <p className="text-stone-600">123 Culinary Lane, Foodie City, 90210</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-red-800 text-white p-3 rounded-full">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Email Us</h3>
                <p className="text-stone-600">hello@zaikabyshahana.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-red-800 text-white p-3 rounded-full">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Call Us</h3>
                <p className="text-stone-600">(123) 456-7890</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;