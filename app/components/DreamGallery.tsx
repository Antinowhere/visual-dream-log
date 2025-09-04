'use client';

import { Dream } from '../types/dream';
import { Calendar, Trash2, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
import DreamModal from './DreamModal';

interface DreamGalleryProps {
  dreams: Dream[];
  onDeleteDream: (id: string) => void;
}

export default function DreamGallery({ dreams, onDeleteDream }: DreamGalleryProps) {
  const [selectedDream, setSelectedDream] = useState<Dream | null>(null);

  if (dreams.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No dreams recorded yet. Start by logging your first dream!</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dreams.map((dream) => (
          <div key={dream.id} className="dream-card group relative">
            {dream.imageUrl && (
              <div className="mb-4 rounded-lg overflow-hidden">
                <img
                  src={dream.imageUrl}
                  alt={dream.title}
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
            
            <h3 className="text-xl font-semibold mb-2">{dream.title}</h3>
            
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(dream.createdAt), 'MMM dd, yyyy')}</span>
            </div>
            
            <p className="text-gray-300 text-sm line-clamp-3 mb-4">
              {dream.details}
            </p>
            
            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => setSelectedDream(dream)}
                className="flex items-center gap-1 px-3 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded text-sm transition-colors"
              >
                <Eye className="w-4 h-4" />
                View
              </button>
              
              <button
                onClick={() => onDeleteDream(dream.id)}
                className="flex items-center gap-1 px-3 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded text-sm transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedDream && (
        <DreamModal
          dream={selectedDream}
          onClose={() => setSelectedDream(null)}
        />
      )}
    </>
  );
}
