'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Moon, CloudRain, Sun, Clock, MapPin, Users, BookOpen } from 'lucide-react';
import { Dream } from '../types/dream';

interface DreamFormData {
  title: string;
  scene: string;
  time: string;
  weather: string;
  characters: string;
  context: string;
  details: string;
  perspective: string;
}

interface DreamFormProps {
  onDreamSaved: (dream: Dream) => void;
}

export default function DreamForm({ onDreamSaved }: DreamFormProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<DreamFormData>();

  const onSubmit = async (data: DreamFormData) => {
    setIsGenerating(true);
    setError(null);

    try {
      // Combine all dream details into a full description
      const fullDescription = `
        Scene: ${data.scene}
        Time: ${data.time}
        Weather: ${data.weather}
        Characters: ${data.characters}
        Context: ${data.context}
        Details: ${data.details}
        Perspective: ${data.perspective}
      `;

      // Generate image with OpenAI
      const response = await fetch('/api/generate-dream-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dreamDescription: fullDescription }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const { imageUrl } = await response.json();

      // Create dream object
      const dream: Dream = {
        id: Date.now().toString(),
        title: data.title,
        date: new Date().toISOString().split('T')[0],
        scene: data.scene,
        time: data.time,
        weather: data.weather,
        characters: data.characters,
        context: data.context,
        details: data.details,
        perspective: data.perspective,
        fullDescription,
        imageUrl,
        createdAt: new Date().toISOString(),
      };

      // Save dream
      onDreamSaved(dream);
      
      // Reset form
      reset();
    } catch (err) {
      setError('Failed to generate dream image. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="dream-card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Record Your Dream</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="flex items-center gap-2 text-sm font-medium mb-2">
            <Moon className="w-4 h-4" />
            Dream Title
          </label>
          <input
            {...register('title')}
            type="text"
            id="title"
            placeholder="Give your dream a memorable title..."
            className="dream-input"
          />
          {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="scene" className="flex items-center gap-2 text-sm font-medium mb-2">
            <MapPin className="w-4 h-4" />
            Scene/Location
          </label>
          <textarea
            {...register('scene')}
            id="scene"
            rows={2}
            placeholder="Where did your dream take place? Describe the setting..."
            className="dream-textarea"
          />
          {errors.scene && <p className="text-red-400 text-sm mt-1">{errors.scene.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="time" className="flex items-center gap-2 text-sm font-medium mb-2">
              <Clock className="w-4 h-4" />
              Time
            </label>
            <input
              {...register('time')}
              type="text"
              id="time"
              placeholder="Day, night, twilight..."
              className="dream-input"
            />
            {errors.time && <p className="text-red-400 text-sm mt-1">{errors.time.message}</p>}
          </div>

          <div>
            <label htmlFor="weather" className="flex items-center gap-2 text-sm font-medium mb-2">
              <CloudRain className="w-4 h-4" />
              Weather/Atmosphere
            </label>
            <input
              {...register('weather')}
              type="text"
              id="weather"
              placeholder="Sunny, stormy, foggy..."
              className="dream-input"
            />
            {errors.weather && <p className="text-red-400 text-sm mt-1">{errors.weather.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="characters" className="flex items-center gap-2 text-sm font-medium mb-2">
            <Users className="w-4 h-4" />
            Characters/People
          </label>
          <textarea
            {...register('characters')}
            id="characters"
            rows={2}
            placeholder="Who appeared in your dream? Friends, strangers, fantastical beings..."
            className="dream-textarea"
          />
          {errors.characters && <p className="text-red-400 text-sm mt-1">{errors.characters.message}</p>}
        </div>

        <div>
          <label htmlFor="context" className="flex items-center gap-2 text-sm font-medium mb-2">
            <BookOpen className="w-4 h-4" />
            Context/Storyline
          </label>
          <textarea
            {...register('context')}
            id="context"
            rows={3}
            placeholder="What was happening? What was the main narrative or events?"
            className="dream-textarea"
          />
          {errors.context && <p className="text-red-400 text-sm mt-1">{errors.context.message}</p>}
        </div>

        <div>
          <label htmlFor="details" className="flex items-center gap-2 text-sm font-medium mb-2">
            <Sun className="w-4 h-4" />
            Additional Details
          </label>
          <textarea
            {...register('details')}
            id="details"
            rows={3}
            placeholder="Any specific details, emotions, colors, symbols, or feelings that stood out?"
            className="dream-textarea"
          />
          {errors.details && <p className="text-red-400 text-sm mt-1">{errors.details.message}</p>}
        </div>

        <div>
          <label htmlFor="perspective" className="flex items-center gap-2 text-sm font-medium mb-2">
            <BookOpen className="w-4 h-4" />
            Perspective/POV
          </label>
          <input
            {...register('perspective')}
            type="text"
            id="perspective"
            placeholder="First person, third person, bird's eye view, through someone else's eyes..."
            className="dream-input"
          />
          {errors.perspective && <p className="text-red-400 text-sm mt-1">{errors.perspective.message}</p>}
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isGenerating}
          className="dream-button w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Dream Image...
            </>
          ) : (
            <>
              <Moon className="w-5 h-5" />
              Save Dream & Generate Image
            </>
          )}
        </button>
      </form>
    </div>
  );
}
