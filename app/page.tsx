'use client';

import { useState, useEffect } from 'react';
import { Moon, Plus, BookOpen } from 'lucide-react';
import DreamForm from './components/DreamForm';
import DreamGallery from './components/DreamGallery';
import HiddenMessage from './components/HiddenMessage';
import { Dream } from './types/dream';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function Home() {
  const [dreams, setDreams] = useLocalStorage<Dream[]>('dreams', []);
  const [showForm, setShowForm] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const handleDreamSaved = (newDream: Dream) => {
    setDreams([newDream, ...dreams]);
    setShowForm(false);
  };

  const handleDeleteDream = (id: string) => {
    setDreams(dreams.filter(dream => dream.id !== id));
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header style={{backgroundColor: '#0a1628', borderBottom: '1px solid #0f1e35'}}>
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Moon className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold">Dream Log of Doom</h1>
          </div>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="dream-button flex items-center gap-2"
          >
            {showForm ? (
              <>
                <BookOpen className="w-5 h-5" />
                View Dreams
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                New Dream
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {showForm ? (
          <DreamForm onDreamSaved={handleDreamSaved} />
        ) : (
          <>
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-semibold mb-2">Your Dream Journal</h2>
              <p className="text-gray-400">
                {!isClient 
                  ? "Loading your dreams..."
                  : dreams.length === 0 
                    ? "Start recording your dreams and watch them come to life with AI-generated imagery"
                    : `You have recorded ${dreams.length} dream${dreams.length === 1 ? '' : 's'}`
                }
              </p>
            </div>
            
            <DreamGallery dreams={dreams} onDeleteDream={handleDeleteDream} />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6" style={{borderTop: '1px solid #0f1e35'}}>
        <div className="container mx-auto px-4 text-center text-sm text-gray-400">
          <p>Dream Log of Doom - Transform your dreams into visual memories</p>
        </div>
      </footer>
      
      <HiddenMessage />
    </div>
  );
}