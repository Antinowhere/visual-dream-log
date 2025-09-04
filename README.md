# Dream Log of Doom

A dream journal app that helps you log your dreams and transforms them into AI-generated imagery using OpenAI's DALL-E.

## Features

- **Dream Logging**: Capture detailed dream entries with prompts for:
  - Scene/Location
  - Time of day
  - Weather/Atmosphere
  - Characters/People
  - Context/Storyline
  - Additional details
  
- **AI Image Generation**: Each dream is transformed into a unique, dreamlike image using DALL-E 3

- **Dream Gallery**: Browse all your recorded dreams with their generated images

- **Local Storage**: Dreams are saved locally in your browser

- **Dark Theme**: Beautiful dark blue theme optimized for nighttime journaling

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file and add your OpenAI API key:
```
OPENAI_API_KEY=your-openai-api-key-here
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- OpenAI API (DALL-E 3)
- React Hook Form
- Lucide Icons

## Usage

1. Click "New Dream" to open the dream entry form
2. Fill in all the fields to capture your dream details
3. Click "Save Dream & Generate Image" 
4. Wait for the AI to generate a unique visual representation
5. View your dreams in the gallery
6. Click on any dream to see full details

## Note

Make sure you have an active OpenAI API key with access to DALL-E 3 image generation.# visual-dream-log
