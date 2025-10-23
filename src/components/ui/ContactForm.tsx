'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mail, Briefcase, Linkedin, Building, Check, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useContactForm } from '@/contexts/ContactFormContext';

const ContactForm = () => {
  const { isFormOpen, closeForm } = useContactForm();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    occupation: '',
    linkedin: '',
    employmentStatus: '', // 'yes', 'no', 'student', or empty
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
            closeForm();
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
          closeForm();
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
      employmentStatus: '',
      workplace: '',
      discussion: '',
    });
    setError('');
  };

  if (!isFormOpen) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0,
          zIndex: 9998
        }}
        onClick={closeForm}
      />
      
      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-8"
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0,
          zIndex: 9999
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="absolute top-8 right-8 z-10">
          <button
            onClick={closeForm}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Form */}
        <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Basic Info */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">Basic Information</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all text-white placeholder-white/70"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all text-white placeholder-white/70"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* LinkedIn */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-white mb-2">
                    <Linkedin className="w-4 h-4 inline mr-2" />
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all text-white placeholder-white/70"
                    placeholder="https://linkedin.com/in/yourname"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Employment Status */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">Employment Status</h2>
              
              {/* Employment Status - Small Pills */}
              <div>
                <div className="flex gap-2">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="employmentStatus"
                      value="yes"
                      checked={formData.employmentStatus === 'yes'}
                      onChange={handleRadioChange}
                      className="sr-only"
                    />
                    <div className={`px-3 py-1.5 text-sm rounded-full border border-white/20 transition-all ${
                      formData.employmentStatus === 'yes' 
                        ? 'bg-white text-black border-white' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}>
                      I am employed
                    </div>
                  </label>
                  
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="employmentStatus"
                      value="no"
                      checked={formData.employmentStatus === 'no'}
                      onChange={handleRadioChange}
                      className="sr-only"
                    />
                    <div className={`px-3 py-1.5 text-sm rounded-full border border-white/20 transition-all ${
                      formData.employmentStatus === 'no' 
                        ? 'bg-white text-black border-white' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}>
                      I am unemployed
                    </div>
                  </label>
                  
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="employmentStatus"
                      value="student"
                      checked={formData.employmentStatus === 'student'}
                      onChange={handleRadioChange}
                      className="sr-only"
                    />
                    <div className={`px-3 py-1.5 text-sm rounded-full border border-white/20 transition-all ${
                      formData.employmentStatus === 'student' 
                        ? 'bg-white text-black border-white' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}>
                      I am a student
                    </div>
                  </label>
                </div>
              </div>

              {/* Occupation and Workplace - only show if employed */}
              {formData.employmentStatus === 'yes' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      <Briefcase className="w-4 h-4 inline mr-2" />
                      Occupation *
                    </label>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all text-white placeholder-white/70"
                      placeholder="e.g., Product Designer, UX Researcher, Developer"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      <Building className="w-4 h-4 inline mr-2" />
                      Current Workplace *
                    </label>
                    <input
                      type="text"
                      name="workplace"
                      value={formData.workplace}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all text-white placeholder-white/70"
                      placeholder="Your current company or organization"
                    />
                  </div>
                </div>
              )}

              {/* Study Field - only show if student */}
              {formData.employmentStatus === 'student' && (
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    <Briefcase className="w-4 h-4 inline mr-2" />
                    What field are you studying? *
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all text-white placeholder-white/70"
                    placeholder="e.g., Computer Science, Design, Business"
                  />
                </div>
              )}
            </div>

            {/* Section 3: Discussion Topic */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">What would you like to discuss with us?</h2>
              
              <div>
                <textarea
                  name="discussion"
                  value={formData.discussion}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all resize-none text-white placeholder-white/70"
                  placeholder="Tell us what you'd like to discuss..."
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-8">
              <button
                type="button"
                onClick={closeForm}
                className="px-8 py-3 text-white/70 hover:text-white transition-colors font-medium"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 px-8 py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
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
