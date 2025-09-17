'use client';

import { useState } from 'react';

const TeamTest = () => {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  return (
    <section id="team" className="py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Team Test
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Testing team component functionality
          </p>
          {/* Debug info */}
          <div className="mt-4 p-2 bg-yellow-200 text-black rounded">
            Debug: Hovered member = {hoveredMember || 'none'}
          </div>
        </div>

        {/* Test Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {['Max', 'Jia', 'Elle'].map((name) => (
            <div
              key={name}
              className="h-full p-8 bg-background rounded-2xl border border-border hover-lift glass overflow-visible relative cursor-pointer"
              onMouseEnter={() => {
                console.log('Hovering over card:', name);
                setHoveredMember(name);
              }}
              onMouseLeave={() => {
                console.log('Leaving card:', name);
                setHoveredMember(null);
              }}
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold">
                  {name[0]}
                </div>
                <h3 className="text-xl font-bold mb-2">{name}</h3>
                <p className="text-muted-foreground">Test team member</p>
                
                {/* Tooltip */}
                <div className={`absolute -top-2 -right-2 bg-red-500 border-2 border-yellow-400 rounded-lg px-3 py-2 shadow-lg transition-all duration-200 pointer-events-none z-50 whitespace-nowrap transform -translate-y-1 ${
                  hoveredMember === name ? 'opacity-100' : 'opacity-50'
                }`}>
                  <div className="text-sm font-medium text-white">
                    Test Value • Test Principle
                  </div>
                  <div className="absolute top-full right-3 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-yellow-400"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamTest;
