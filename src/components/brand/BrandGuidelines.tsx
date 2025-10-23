'use client';

export const BrandGuidelines = () => {

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Brand Guidelines
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive guidelines for implementing our brand across all mediums.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-8 border border-border/20">
            <h3 className="text-2xl font-semibold text-white mb-4">Visual Identity</h3>
            <p className="text-muted-foreground mb-4">
              Logo usage, color palette, typography, and visual elements.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Logo variations and usage</li>
              <li>• Color specifications</li>
              <li>• Typography guidelines</li>
              <li>• Iconography standards</li>
            </ul>
          </div>
          
          <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-8 border border-border/20">
            <h3 className="text-2xl font-semibold text-white mb-4">Voice & Tone</h3>
            <p className="text-muted-foreground mb-4">
              How we communicate and express our brand personality.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Brand voice characteristics</li>
              <li>• Tone guidelines</li>
              <li>• Writing style</li>
              <li>• Communication principles</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
