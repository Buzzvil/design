'use client';

export const BrandResources = () => {

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Brand Resources
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Downloadable assets and resources for implementing our brand.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-8 border border-border/20">
            <h3 className="text-2xl font-semibold text-white mb-4">Logo Assets</h3>
            <p className="text-muted-foreground mb-4">
              High-resolution logo files in various formats.
            </p>
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Download
            </button>
          </div>
          
          <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-8 border border-border/20">
            <h3 className="text-2xl font-semibold text-white mb-4">Color Palette</h3>
            <p className="text-muted-foreground mb-4">
              Brand colors with hex codes and usage guidelines.
            </p>
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Download
            </button>
          </div>
          
          <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-8 border border-border/20">
            <h3 className="text-2xl font-semibold text-white mb-4">Templates</h3>
            <p className="text-muted-foreground mb-4">
              Ready-to-use templates for presentations and documents.
            </p>
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Download
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
