import { GoogleGenAI, Type, FunctionDeclaration, GenerateContentResponse } from "@google/genai";
import { Product, CartItem } from "./types";

export class GeminiService {
  private ai: GoogleGenAI;
  private model: string = 'gemini-3-pro-preview';

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: (process.env.API_KEY as string) });
  }

  getTools(): FunctionDeclaration[] {
    return [
      {
        name: 'getCartDetails',
        parameters: {
          type: Type.OBJECT,
          description: 'Retrieves the current items in the user\'s shopping cart.',
          properties: {},
        },
      },
      {
        name: 'getWishlistDetails',
        parameters: {
          type: Type.OBJECT,
          description: 'Retrieves the current items in the user\'s wishlist.',
          properties: {},
        },
      },
      {
        name: 'navigateToPage',
        parameters: {
          type: Type.OBJECT,
          description: 'Navigates the user to a specific page. This triggers a confirmation button in the chat UI.',
          properties: {
            path: {
              type: Type.STRING,
              description: 'The URL path (e.g., "/cart", "/shop", "/wishlist", "/checkout").',
            },
            pageName: {
              type: Type.STRING,
              description: 'Human-readable name for the button (e.g., "Go to Checkout", "Visit the Shop").',
            }
          },
          required: ['path', 'pageName'],
        },
      },
      {
        name: 'addToCart',
        parameters: {
          type: Type.OBJECT,
          description: 'Adds an item to the shopping cart.',
          properties: {
            productId: {
              type: Type.STRING,
              description: 'The unique ID of the product.',
            },
            productName: {
              type: Type.STRING,
              description: 'Display name of the product.',
            }
          },
          required: ['productId', 'productName'],
        },
      },
      {
        name: 'toggleWishlist',
        parameters: {
          type: Type.OBJECT,
          description: 'Adds or removes an item from the wishlist.',
          properties: {
            productId: {
              type: Type.STRING,
              description: 'The unique ID of the product.',
            },
            productName: {
              type: Type.STRING,
              description: 'Display name of the product.',
            }
          },
          required: ['productId', 'productName'],
        },
      }
    ];
  }

  async chat(
    message: string, 
    history: any[], 
    context: { 
      cart: CartItem[], 
      wishlist: Product[], 
      availableProducts: Product[] 
    }
  ) {
    try {
      const systemInstruction = `
        You are "Totesy AI", the elite personal shopper for Totesy (Ghana's #1 campus tote brand).
        Owner: Christiana Tetteh (Killer Alomi).
        
        YOUR MISSION:
        - When a user asks what's in their cart or wishlist, call the 'getCartDetails' or 'getWishlistDetails' tool.
        - Once you get the tool results, LIST the items clearly in the chat using Markdown (bolding, bullet points).
        - NEVER just provide a link/button if they ask to see their items. List them first, then offer navigation as an optional extra.
        
        CATALOG DATA:
        ${JSON.stringify(context.availableProducts.map(p => ({ id: p.id, name: p.name, price: p.price, vibe: p.vibe })))}
        
        STYLE:
        - Professional but friendly Ghanaian campus flavor ("vibe", "chale", "sharp").
        - Use Markdown for bolding product names and prices.
        - Be encouraging and helpful.
      `;

      // For tool calling to work with getCartDetails, we might need multiple rounds, 
      // but the initial call will trigger the tool use in the ChatBot component.
      const response = await this.ai.models.generateContent({
        model: this.model,
        contents: [
          ...history,
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction,
          tools: [{ functionDeclarations: this.getTools() }],
        },
      });

      return response;
    } catch (error) {
      console.error("Gemini Chat Error:", error);
      throw error;
    }
  }

  // Helper for tool execution loop
  async chatWithToolResponse(
    history: any[],
    toolResponses: any[],
    context: any
  ) {
    const systemInstruction = `
        You are "Totesy AI".
        Owner: Christiana Tetteh.
        
        LIST the items provided in the tool response clearly using Markdown.
        If the cart or wishlist is empty, suggest some items from the catalog.
        
        CATALOG DATA:
        ${JSON.stringify(context.availableProducts.map(p => ({ id: p.id, name: p.name, price: p.price, vibe: p.vibe })))}
    `;

    return await this.ai.models.generateContent({
      model: this.model,
      contents: [
        ...history,
        {
          role: 'model',
          parts: toolResponses.map(tr => ({
            functionResponse: tr
          }))
        }
      ],
      config: {
        systemInstruction,
        tools: [{ functionDeclarations: this.getTools() }],
      }
    });
  }
}