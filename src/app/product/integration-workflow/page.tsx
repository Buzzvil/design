'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Workflow, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const IntegrationWorkflowPage = () => {
  const { t } = useLanguage();
  const router = useRouter();

  const principles = [
    t('product.guidelines.integrationWorkflow.principle1'),
    t('product.guidelines.integrationWorkflow.principle2'),
    t('product.guidelines.integrationWorkflow.principle3'),
    t('product.guidelines.integrationWorkflow.principle4')
  ];

  return (
    <main className="min-h-screen relative">
      <Header />
      
      {/* Back Button */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-muted-foreground hover:text-white transition-colors mb-8"
            whileHover={{ x: -4 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Guidelines</span>
          </motion.button>
        </div>
      </div>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              {t('product.guidelines.integrationWorkflow.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-4">
              {t('product.guidelines.integrationWorkflow.subtitle')}
            </p>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {t('product.guidelines.integrationWorkflow.description')}
            </p>
          </motion.div>

          {/* Integration Workflow Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-background to-muted/20 rounded-2xl border border-border p-8 lg:p-12 shadow-2xl"
          >
            {/* Section Header */}
            <div className="flex items-start space-x-6 mb-8">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Workflow className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  {t('product.guidelines.integrationWorkflow.title')}
                </h2>
                <p className="text-lg text-muted-foreground font-medium mb-4">
                  {t('product.guidelines.integrationWorkflow.subtitle')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('product.guidelines.integrationWorkflow.description')}
                </p>
              </div>
            </div>

            {/* Principles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {principles.map((principle, principleIndex) => (
                <motion.div
                  key={principleIndex}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: principleIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-6 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/40 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-semibold text-sm">
                      {principleIndex + 1}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {principle}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Workflow Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Workflow Steps</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-muted/20 rounded-xl border border-border/50">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Design</h4>
                  <p className="text-muted-foreground text-sm">
                    Create designs following our guidelines and patterns
                  </p>
                </div>
                <div className="text-center p-6 bg-muted/20 rounded-xl border border-border/50">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Review</h4>
                  <p className="text-muted-foreground text-sm">
                    Team review and feedback collection process
                  </p>
                </div>
                <div className="text-center p-6 bg-muted/20 rounded-xl border border-border/50">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Implement</h4>
                  <p className="text-muted-foreground text-sm">
                    Development handoff and implementation
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Coming Soon Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                Detailed Workflow Documentation Coming Soon
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We&apos;re developing comprehensive workflow documentation including design handoff processes, 
                development guidelines, and quality assurance checklists. Stay tuned for updates.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default IntegrationWorkflowPage;
