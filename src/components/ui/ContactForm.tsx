'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mail, MessageSquare, Briefcase, Linkedin, Building, Check } from 'lucide-react';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactForm = ({ isOpen, onClose }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    discussion: '',
    occupation: '',
    linkedin: '',
    workplace: '',
    isUnemployed: false,
    isStudent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked,
      workplace: checked ? '' : prev.workplace
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const emailBody = `
New Coffee Chat Request

Name: ${formData.name}
Email: ${formData.email}
Occupation: ${formData.occupation}
LinkedIn: ${formData.linkedin || 'Not provided'}
Workplace: ${formData.isUnemployed ? 'Unemployed' : formData.isStudent ? 'Student' : formData.workplace}

What would you like to discuss:
${formData.discussion}
      `.trim();

      const mailtoLink = `mailto:max@buzzvil.com?subject=Coffee Chat Request from ${formData.name}&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoLink, '_blank');
      
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
        setFormData({
          name: '',
          email: '',
          discussion: '',
          occupation: '',
          linkedin: '',
          workplace: '',
          isUnemployed: false,
          isStudent: false,
        });
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-background border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Coffee Chat Request</h2>
              <p className="text-muted-foreground mt-1">Let&apos;s discuss design over coffee!</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
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

            {/* Discussion Topic */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <MessageSquare className="w-4 h-4 inline mr-2" />
                What would you like to discuss with us? *
              </label>
              <textarea
                name="discussion"
                value={formData.discussion}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                placeholder="Tell us what you&apos;d like to discuss..."
              />
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <Briefcase className="w-4 h-4 inline mr-2" />
                Your occupation *
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
                LinkedIn profile (optional)
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

            {/* Workplace Status */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <Building className="w-4 h-4 inline mr-2" />
                Current workplace
              </label>
              
              {/* Checkboxes */}
              <div className="space-y-3 mb-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isUnemployed}
                    onChange={(e) => handleCheckboxChange('isUnemployed', e.target.checked)}
                    className="w-4 h-4 text-primary bg-muted/30 border-border rounded focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">Unemployed</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isStudent}
                    onChange={(e) => handleCheckboxChange('isStudent', e.target.checked)}
                    className="w-4 h-4 text-primary bg-muted/30 border-border rounded focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">Student</span>
                </label>
              </div>

              {/* Workplace Input */}
              {!formData.isUnemployed && !formData.isStudent && (
                <input
                  type="text"
                  name="workplace"
                  value={formData.workplace}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Your current company or organization"
                />
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitted ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Request'}</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactForm;
