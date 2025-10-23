'use client';


export const BrandPrinciples = () => {

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Brand Principles
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our brand principles guide how we communicate and present ourselves to the world.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-8 border border-border/20 hover:border-border/40 transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Consistency</h3>
            <p className="text-muted-foreground mb-4">
              Maintain consistent visual and verbal identity across all touchpoints.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Unified visual language</li>
              <li>• Consistent messaging tone</li>
              <li>• Cohesive brand experience</li>
            </ul>
          </div>
          
          <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-8 border border-border/20 hover:border-border/40 transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Authenticity</h3>
            <p className="text-muted-foreground mb-4">
              Stay true to our values and mission in every brand interaction.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Genuine brand voice</li>
              <li>• Honest communication</li>
              <li>• Value-driven messaging</li>
            </ul>
          </div>
          
          <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-8 border border-border/20 hover:border-border/40 transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Clarity</h3>
            <p className="text-muted-foreground mb-4">
              Communicate clearly and effectively with our audience.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Clear messaging</li>
              <li>• Simple communication</li>
              <li>• Easy to understand</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
