
import { GoogleGenAI, Type } from "@google/genai";
import { WebsiteData, SectionType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const WEBSITE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    description: { type: Type.STRING },
    theme: {
      type: Type.OBJECT,
      properties: {
        primaryColor: { type: Type.STRING, description: "Hex color code" },
        secondaryColor: { type: Type.STRING, description: "Hex color code" },
        fontFamily: { type: Type.STRING },
        mode: { type: Type.STRING, enum: ['light', 'dark'] }
      },
      required: ['primaryColor', 'secondaryColor', 'fontFamily', 'mode']
    },
    sections: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          type: { type: Type.STRING, enum: Object.values(SectionType) },
          title: { type: Type.STRING },
          subtitle: { type: Type.STRING },
          content: { type: Type.STRING },
          ctaText: { type: Type.STRING },
          imageUrl: { type: Type.STRING },
          items: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                icon: { type: Type.STRING, description: "FontAwesome icon name like 'rocket'" }
              }
            }
          }
        },
        required: ['id', 'type', 'title']
      }
    }
  },
  required: ['name', 'description', 'theme', 'sections']
};

export const generateInitialWebsite = async (prompt: string): Promise<WebsiteData> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Create a comprehensive website JSON structure for: ${prompt}. 
    Ensure the sections are logically ordered (Hero, About, Features, etc.). 
    Make the content professional, engaging, and detailed. 
    Use placeholder image URLs from picsum.photos for any image needs.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: WEBSITE_SCHEMA,
    },
  });

  try {
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Failed to parse website JSON", error);
    throw new Error("Could not generate website. Please try a different prompt.");
  }
};

export const editWebsite = async (currentData: WebsiteData, instruction: string): Promise<WebsiteData> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Modify the following website based on this instruction: "${instruction}".
    
    Current Website JSON:
    ${JSON.stringify(currentData)}
    
    Return the FULL updated JSON matching the schema. Do not omit any existing sections unless requested.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: WEBSITE_SCHEMA,
    },
  });

  try {
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Failed to parse updated website JSON", error);
    throw currentData;
  }
};

export const chatWithGemini = async (history: { role: string, content: string }[], message: string) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are an AI Web Design Assistant. You help users build and refine their websites. Keep responses helpful, concise, and focused on design and content best practices.",
    },
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};

export const generateImageForSection = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: `High quality web design image for: ${prompt}` }]
            },
            config: {
                imageConfig: { aspectRatio: "16:9" }
            }
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
        return `https://picsum.photos/seed/${Math.random()}/1200/800`;
    } catch (e) {
        return `https://picsum.photos/seed/${Math.random()}/1200/800`;
    }
};
