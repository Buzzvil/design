'use client';

export const ProductGuidelines = () => {

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Product Guidelines
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Design guidelines for creating consistent and effective product experiences.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-8 border border-border/20 hover:border-border/40 transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">🧩</span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">UI Components</h3>
            <p className="text-muted-foreground mb-4">
              Standardized components and patterns for product interfaces.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Button styles and states</li>
              <li>• Form elements</li>
              <li>• Navigation patterns</li>
              <li>• Card layouts</li>
            </ul>
          </div>
          
          <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-8 border border-border/20 hover:border-border/40 transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Interaction Patterns</h3>
            <p className="text-muted-foreground mb-4">
              Guidelines for user interactions and micro-animations.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Hover states</li>
              <li>• Loading animations</li>
              <li>• Transition effects</li>
              <li>• Feedback patterns</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
