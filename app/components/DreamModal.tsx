'use client';

import { Dream } from '../types/dream';
import { X, Calendar, Clock, CloudRain, MapPin, Users, BookOpen, Sparkles } from 'lucide-react';
import { format } from 'date-fns';

interface DreamModalProps {
  dream: Dream;
  onClose: () => void;
}

export default function DreamModal({ dream, onClose }: DreamModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-dream-blue-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-dream-blue-800 border-b border-dream-blue-700 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{dream.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dream-blue-700 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {dream.imageUrl && (
            <div className="mb-6 rounded-lg overflow-hidden">
              <img
                src={dream.imageUrl}
                alt={dream.title}
                className="w-full h-auto"
              />
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-gray-300 mb-6">
            <Calendar className="w-4 h-4" />
            <span>{format(new Date(dream.createdAt), 'MMMM dd, yyyy')}</span>
          </div>

          <div className="space-y-4">
            <div className="dream-card">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold">Scene/Location</h3>
              </div>
              <p className="text-gray-300">{dream.scene}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="dream-card">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <h3 className="font-semibold">Time</h3>
                </div>
                <p className="text-gray-300">{dream.time}</p>
              </div>

              <div className="dream-card">
                <div className="flex items-center gap-2 mb-2">
                  <CloudRain className="w-5 h-5 text-blue-400" />
                  <h3 className="font-semibold">Weather/Atmosphere</h3>
                </div>
                <p className="text-gray-300">{dream.weather}</p>
              </div>
            </div>

            <div className="dream-card">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold">Characters/People</h3>
              </div>
              <p className="text-gray-300">{dream.characters}</p>
            </div>

            <div className="dream-card">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold">Context/Storyline</h3>
              </div>
              <p className="text-gray-300">{dream.context}</p>
            </div>

            <div className="dream-card">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold">Additional Details</h3>
              </div>
              <p className="text-gray-300">{dream.details}</p>
            </div>

            <div className="dream-card">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold">Perspective/POV</h3>
              </div>
              <p className="text-gray-300">{dream.perspective}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
