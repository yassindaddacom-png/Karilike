import { GoogleGenAI, Type } from "@google/genai";
import { Property, PropertyType } from "../types";

// Initialize Gemini Client
// Note: In a real production app, you might want to proxy this through a backend to keep the key secret,
// but for this client-side demo, we use the env variable directly as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Uses Gemini to interpret a natural language query and filter the property list.
 * It returns a list of property IDs that match the user's intent.
 */
export const searchPropertiesWithAI = async (
  query: string,
  allProperties: Property[]
): Promise<string[]> => {
  try {
    // Create a simplified version of properties to save tokens and reduce complexity for the model
    const simplifiedProps = allProperties.map(p => ({
      id: p.id,
      description: p.description,
      amenities: p.amenities,
      location: p.location,
      price: p.price,
      type: p.type
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        You are a smart rental assistant for "KariLike" (كاري ليك).
        Your task is to match a user's natural language query to the available properties.
        
        User Query: "${query}"
        
        Available Properties (JSON):
        ${JSON.stringify(simplifiedProps)}
        
        Instructions:
        1. Analyze the user's intent (e.g., looking for cheap, specific location, specific amenities).
        2. Select the IDs of properties that are good matches.
        3. Return ONLY a JSON array of strings (property IDs).
        4. If no specific matches are found but the query is vague, return a diverse set of IDs.
        5. If absolutely no matches, return an empty array.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          }
        }
      }
    });

    const jsonStr = response.text || "[]";
    const matchedIds = JSON.parse(jsonStr) as string[];
    return matchedIds;

  } catch (error) {
    console.error("AI Search Error:", error);
    return [];
  }
};

/**
 * Generates a rental listing description based on basic features provided by a homeowner.
 */
export const generateListingDescription = async (
  type: string,
  location: string,
  features: string
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Write a compelling, professional, and warm rental listing description for a property.
        Focus on the benefits for a tenant (student or employee).
        Avoid jargon. Keep it under 100 words.
        
        Property Details:
        Type: ${type}
        Location: ${location}
        Key Features/Amenities: ${features}
      `,
    });
    return response.text || "Could not generate description.";
  } catch (error) {
    console.error("AI Description Error:", error);
    return "Beautiful property in a great location. Contact for details.";
  }
};

/**
 * Chat assistant helper
 */
export const getChatResponse = async (
  message: string,
  currentProperty?: Property
): Promise<string> => {
  try {
    let context = "You are KariLike (كاري ليك), a helpful AI assistant for a rental platform that connects renters directly to owners (no brokers).";
    
    if (currentProperty) {
      context += `\nThe user is currently looking at this property: ${currentProperty.title} located at ${currentProperty.location}, price ${currentProperty.price} MAD.`;
    } else {
      context += `\nThe user is browsing the home page.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        ${context}
        
        User: ${message}
        
        Reply helpfuly and concisely. If they ask about fees, remind them KariLike has no broker fees.
      `
    });

    return response.text || "I'm having trouble connecting right now. Please try again.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "I'm sorry, I encountered an error. Please try again later.";
  }
};