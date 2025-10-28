export interface InteractionPattern {
  id: string;
  titleKey: string;
  descriptionKey: string;
  tags: string[];
  code?: string;
}

export const interactionPatterns: InteractionPattern[] = [
  {
    id: 'onLoad',
    titleKey: 'interactionPatterns.whileLoading',
    descriptionKey: 'interactionPatterns.whileLoading.description',
    tags: ['Skeleton UI', 'Loading States', 'Progressive Disclosure'],
    code: `// Skeleton Loading Component
const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
  </div>
);

// Usage
{isLoading ? <SkeletonCard /> : <ActualContent />}`
  },
  {
    id: 'onScroll',
    titleKey: 'interactionPatterns.pageScroll',
    descriptionKey: 'interactionPatterns.pageScroll.description',
    tags: ['Vertical Scroll', 'Parallax', 'Reveal Animations'],
    code: `// Scroll-triggered Animation
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('target');
      if (element) {
        const rect = element.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return isVisible;
};`
  },
  {
    id: 'notify',
    titleKey: 'interactionPatterns.notify',
    descriptionKey: 'interactionPatterns.notify.description',
    tags: ['Toast', 'Banner', 'System Messages'],
    code: `// Toast Notification Hook
const useToast = () => {
  const [toasts, setToasts] = useState([]);
  
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };
  
  return { toasts, showToast };
};`
  },
  {
    id: 'alert',
    titleKey: 'interactionPatterns.alert',
    descriptionKey: 'interactionPatterns.alert.description',
    tags: ['Critical Alerts', 'Warnings', 'User Attention'],
    code: `// Alert Modal Component
const AlertModal = ({ isOpen, onClose, title, message, type }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4">
        <div className="flex items-center mb-4">
          <AlertCircle className="w-6 h-6 text-red-500 mr-2" />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{message}</p>
        <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">
          Dismiss
        </button>
      </div>
    </div>
  );
};`
  },
  {
    id: 'pauseAsk',
    titleKey: 'interactionPatterns.pauseAsk',
    descriptionKey: 'interactionPatterns.pauseAsk.description',
    tags: ['Modal', 'Popup', 'Confirmation'],
    code: `// Confirmation Dialog
const ConfirmationDialog = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
        <p className="mb-4">{message}</p>
        <div className="flex space-x-3">
          <button onClick={onCancel} className="flex-1 px-4 py-2 border rounded">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-blue-500 text-white rounded">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};`
  },
  {
    id: 'magnify',
    titleKey: 'interactionPatterns.magnify',
    descriptionKey: 'interactionPatterns.magnify.description',
    tags: ['Bottom Sheet', 'Expandable', 'Detail View'],
    code: `// Bottom Sheet Component
const BottomSheet = ({ isOpen, onClose, children }) => {
  return (
    <div className={\`fixed inset-0 z-50 \${isOpen ? 'block' : 'hidden'}\`}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-96 overflow-y-auto">
        <div className="w-12 h-1 bg-gray-300 rounded mx-auto mt-2 mb-4" />
        {children}
      </div>
    </div>
  );
};`
  },
  {
    id: 'screenToScreen',
    titleKey: 'interactionPatterns.screenToScreen',
    descriptionKey: 'interactionPatterns.screenToScreen.description',
    tags: ['Navigation', 'Transitions', 'Screen Flow'],
    code: `// Page Transition Hook
const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const navigateWithTransition = (path) => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      router.push(path);
      setIsTransitioning(false);
    }, 300);
  };
  
  return { isTransitioning, navigateWithTransition };
};`
  },
  {
    id: 'feedback',
    titleKey: 'interactionPatterns.feedback',
    descriptionKey: 'interactionPatterns.feedback.description',
    tags: ['Touch', 'Swipe', 'Gestures', 'Haptic'],
    code: `// Touch Feedback Hook
const useTouchFeedback = () => {
  const [isPressed, setIsPressed] = useState(false);
  
  const handleTouchStart = () => {
    setIsPressed(true);
    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };
  
  const handleTouchEnd = () => {
    setIsPressed(false);
  };
  
  return { isPressed, handleTouchStart, handleTouchEnd };
};`
  },
  {
    id: 'moreToCome',
    titleKey: 'interactionPatterns.moreToCome',
    descriptionKey: 'interactionPatterns.moreToCome.description',
    tags: ['Coming Soon', 'Development', 'User Needs'],
    code: `// Coming Soon Placeholder
const ComingSoonPattern = () => (
  <div className="text-center py-8">
    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
      <Plus className="w-8 h-8 text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-600 mb-2">
      New Pattern Coming Soon
    </h3>
    <p className="text-gray-500">
      We&apos;re constantly developing new interaction patterns based on user needs.
    </p>
  </div>
);`
  }
];
