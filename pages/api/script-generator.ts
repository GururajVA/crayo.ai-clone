import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

// Type definitions
interface ChatRequest {
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  model?: string;
}

interface ChatResponse {
  content?: string;
  error?: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, model = 'gpt-4' } = req.body as ChatRequest;
    
    if (!messages || messages.length === 0) {
      return res.status(400).json({ error: 'Messages are required' });
    }

    const completion = await openai.chat.completions.create({
      messages,
      model,
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = completion.choices[0].message.content;
    
    if (!content) {
      throw new Error('Failed to generate content');
    }

    res.status(200).json({ content });
  } catch (error) {
    console.error('Chat completion error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate content';
    res.status(500).json({ error: errorMessage });
  }
}