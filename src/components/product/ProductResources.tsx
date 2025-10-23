'use client';

export const ProductResources = () => {

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Product Resources
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Design system components, templates, and tools for product development.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-8 border border-border/20">
            <h3 className="text-2xl font-semibold text-white mb-4">Design System</h3>
            <p className="text-muted-foreground mb-4">
              Complete design system with components and tokens.
            </p>
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              View System
            </button>
          </div>
          
          <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-8 border border-border/20">
            <h3 className="text-2xl font-semibold text-white mb-4">Figma Library</h3>
            <p className="text-muted-foreground mb-4">
              Figma components and templates for design work.
            </p>
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Open Library
            </button>
          </div>
          
          <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-8 border border-border/20">
            <h3 className="text-2xl font-semibold text-white mb-4">Code Components</h3>
            <p className="text-muted-foreground mb-4">
              React components and code snippets for development.
            </p>
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              View Code
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
