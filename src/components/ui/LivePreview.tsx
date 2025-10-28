'use client';

import { ReactNode } from 'react';
import { Smartphone } from 'lucide-react';

interface LivePreviewProps {
  title: string;
  children?: ReactNode;
  className?: string;
}

const LivePreview = ({ title, children, className = '' }: LivePreviewProps) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <h5 className="text-sm font-medium text-white">
        Live Preview
      </h5>
      <div className="flex justify-center">
        {/* Mobile Frame with 9:16 ratio (vertical phone) */}
        <div className="w-[200px] bg-black rounded-[1.5rem] p-1 shadow-2xl">
          <div className="bg-muted/20 rounded-[1.25rem] h-[400px] flex items-center justify-center" style={{ aspectRatio: '9/16' }}>
            {children ? (
              <div className="w-full h-full flex items-center justify-center">
                {children}
              </div>
            ) : (
              <div className="text-center space-y-3 px-4">
                <Smartphone className="w-8 h-8 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground break-words font-medium">
                  {title}
                </p>
                <p className="text-xs text-muted-foreground/70">
                  Preview coming soon
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
