'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mail, MessageSquare, Briefcase, Linkedin, Building, Check, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactForm = ({ isOpen, onClose }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    occupation: '',
    linkedin: '',
    employmentStatus: 'yes', // 'yes', 'no', 'student'
    workplace: '',
    discussion: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      employmentStatus: value,
      workplace: value !== 'yes' ? '' : prev.workplace
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Check if EmailJS is configured
      const emailjsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      
      if (emailjsPublicKey && emailjsPublicKey !== 'YOUR_PUBLIC_KEY') {
        // Use EmailJS for direct email sending
        emailjs.init(emailjsPublicKey);
        
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          occupation: formData.occupation,
          linkedin: formData.linkedin || 'Not provided',
          employment_status: formData.employmentStatus === 'yes' ? 'Yes, employed' : formData.employmentStatus === 'no' ? 'No, not employed' : 'Student',
          workplace: formData.employmentStatus === 'yes' ? formData.workplace : '',
          message: formData.discussion,
          to_email: 'max@buzzvil.com'
        };

        const result = await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          templateParams,
          emailjsPublicKey
        );

        if (result.status === 200) {
          setIsSubmitted(true);
          setTimeout(() => {
            setIsSubmitted(false);
            onClose();
            resetForm();
          }, 2000);
        } else {
          throw new Error('Email sending failed');
        }
      } else {
        // Fallback to mailto approach
        const emailBody = `
New Coffee Chat Request

=== About You ===
Name: ${formData.name}
Email: ${formData.email}
Occupation: ${formData.occupation}
LinkedIn: ${formData.linkedin || 'Not provided'}

=== Current Status ===
Employment Status: ${formData.employmentStatus === 'yes' ? 'Yes, employed' : formData.employmentStatus === 'no' ? 'No, not employed' : 'Student'}
${formData.employmentStatus === 'yes' ? `Current Workplace: ${formData.workplace}` : ''}

=== Discussion Topic ===
What would you like to discuss:
${formData.discussion}
        `.trim();

        const mailtoLink = `mailto:max@buzzvil.com?subject=Coffee Chat Request from ${formData.name}&body=${encodeURIComponent(emailBody)}`;
        window.open(mailtoLink, '_blank');
        
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          onClose();
          resetForm();
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to send email. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      occupation: '',
      linkedin: '',
      employmentStatus: 'yes',
      workplace: '',
      discussion: '',
    });
    setError('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h1 className="text-xl font-bold text-foreground">Coffee Chat Request</h1>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: About You */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">About You</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Occupation */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <Briefcase className="w-4 h-4 inline mr-2" />
                    Occupation *
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="e.g., Product Designer, UX Researcher, Developer"
                  />
                </div>

                {/* LinkedIn */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <Linkedin className="w-4 h-4 inline mr-2" />
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="https://linkedin.com/in/yourname"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Employment Status */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Employment Status</h2>
              
              <div className="flex flex-wrap gap-3">
                <label className="flex items-center space-x-2 cursor-pointer px-4 py-2 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                  <input
                    type="radio"
                    name="employmentStatus"
                    value="yes"
                    checked={formData.employmentStatus === 'yes'}
                    onChange={handleRadioChange}
                    className="w-4 h-4 text-primary bg-muted/30 border-border focus:ring-primary"
                  />
                  <span className="text-sm font-medium">Yes</span>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer px-4 py-2 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                  <input
                    type="radio"
                    name="employmentStatus"
                    value="no"
                    checked={formData.employmentStatus === 'no'}
                    onChange={handleRadioChange}
                    className="w-4 h-4 text-primary bg-muted/30 border-border focus:ring-primary"
                  />
                  <span className="text-sm font-medium">No</span>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer px-4 py-2 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                  <input
                    type="radio"
                    name="employmentStatus"
                    value="student"
                    checked={formData.employmentStatus === 'student'}
                    onChange={handleRadioChange}
                    className="w-4 h-4 text-primary bg-muted/30 border-border focus:ring-primary"
                  />
                  <span className="text-sm font-medium">Student</span>
                </label>
              </div>

              {/* Workplace Input - only show if employed */}
              {formData.employmentStatus === 'yes' && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <Building className="w-4 h-4 inline mr-2" />
                    What is your current workplace? *
                  </label>
                  <input
                    type="text"
                    name="workplace"
                    value={formData.workplace}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Your current company or organization"
                  />
                </div>
              )}
            </div>

            {/* Section 3: Discussion Topic */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Discussion Topic</h2>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  What would you like to discuss? *
                </label>
                <textarea
                  name="discussion"
                  value={formData.discussion}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  placeholder="Tell us what you'd like to discuss..."
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-8 border-t border-border">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isSubmitted ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Request Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Request'}</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactForm;
