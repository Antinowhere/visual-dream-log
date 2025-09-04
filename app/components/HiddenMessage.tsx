'use client';

import { useState, useEffect } from 'react';

export default function HiddenMessage() {
  const [showMessage, setShowMessage] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    // Show hint after 30 seconds, then every 60 seconds
    const hintTimer = setTimeout(() => {
      setShowHint(true);
      // Hide hint after 4 seconds
      setTimeout(() => setShowHint(false), 4000);
      
      // Repeat hint every 60 seconds
      const interval = setInterval(() => {
        setShowHint(true);
        setTimeout(() => setShowHint(false), 4000);
      }, 60000);

      return () => clearInterval(interval);
    }, 30000);

    return () => clearTimeout(hintTimer);
  }, []);

  return (
    <>
      {/* Subtle hint that appears periodically */}
      {showHint && (
        <div className="fixed bottom-6 right-6 z-30 bg-gray-800/70 text-gray-300 px-3 py-2 rounded text-xs animate-pulse">
          💫 Something lurks in the corner...
        </div>
      )}

      {/* Larger invisible trigger area in bottom right */}
      <div 
        className="fixed bottom-0 right-0 w-20 h-20 z-40 cursor-pointer"
        onMouseEnter={() => setShowMessage(true)}
        onMouseLeave={() => setShowMessage(false)}
        title="..."
      />
      
      {/* Hidden message popup */}
      {showMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-red-900/95 backdrop-blur-sm text-red-100 p-6 rounded-lg shadow-2xl border border-red-800 max-w-sm animate-fade-in">
          <div className="text-center">
            <h3 className="text-lg font-bold mb-3 text-red-200">⚠️ WARNING ⚠️</h3>
            <p className="text-sm leading-relaxed mb-4">
              Malcolm, your dreams are not what they seem. The visions you've been having... 
              they're bleeding through. The boundary is weakening. You must stop sleeping. 
              The entities know you've found this message. They're watching. 
              Trust no one. Especially not your own subconscious.
            </p>
            <p className="text-xs text-red-300 italic">
              Sweet dreams...
            </p>
            <p className="text-xs text-red-400 mt-2 font-semibold">
              -Liam
            </p>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
