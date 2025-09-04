import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { dreamDescription } = await request.json();

    if (!dreamDescription) {
      return NextResponse.json(
        { error: 'Dream description is required' },
        { status: 400 }
      );
    }

    // Generate a prompt for DALL-E based on the dream description
    const imagePrompt = `A dreamlike, surreal artistic interpretation of: ${dreamDescription}. Style: ethereal, mystical, with soft glowing colors and dreamlike atmosphere.`;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: imagePrompt,
      size: "1024x1024",
      quality: "standard",
      n: 1,
    });

    const imageUrl = response.data[0]?.url;

    if (!imageUrl) {
      throw new Error('No image generated');
    }

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
