import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to detect if a query is in Hindi / Devanagari script
function isHindiText(text: string): boolean {
  return /[\u0900-\u097F]/.test(text);
}

// Check if an error represents 429 quota exhaustion or rate limits
function isQuotaError(err: any): boolean {
  if (!err) return false;
  const str =
    (typeof err === 'string' ? err : (err.message || '') + ' ' + (err.status || '') + ' ' + JSON.stringify(err)).toLowerCase();
  return (
    str.includes('429') ||
    str.includes('resource_exhausted') ||
    str.includes('quota') ||
    str.includes('rate limit') ||
    str.includes('rate-limit')
  );
}

// Domain-aware knowledge base for graceful fallback when external quota is temporarily exhausted
function generatePortfolioFallback(query: string, isHindi: boolean = false): string {
  const q = query.toLowerCase();

  if (
    q.includes('skill') ||
    q.includes('stack') ||
    q.includes('tech') ||
    q.includes('language') ||
    q.includes('तकनीक') ||
    q.includes('स्किल्स')
  ) {
    return isHindi
      ? `**अभिषेक का कोर टेक स्टैक:**
• **फ्रंटएंड:** React 19, TypeScript, Next.js / Vite, Tailwind CSS, Framer Motion
• **बैकएंड:** Node.js, Express.js, मॉड्यूलर REST APIs, WebSocket
• **डेटाबेस:** MongoDB, PostgreSQL
• **मशीन लर्निंग व AI:** Python, PyTorch, LangChain, Gemini API
• **टूल्स व इंफ्रा:** Docker, AWS, Git, Linux

*(नोट: जेमिनी API कोटा रीच होने के कारण पोर्टफोलियो नॉलेज बेस से उत्तर दिया जा रहा है।)*`
      : `**Abhishek's Core Technical Stack:**
• **Frontend:** React 19, TypeScript, Next.js / Vite, Tailwind CSS, Framer Motion
• **Backend:** Node.js, Express.js, Modular REST APIs, WebSocket
• **Database:** MongoDB, PostgreSQL
• **AI & Machine Learning:** Python, PyTorch, LangChain, Gemini API
• **DevOps & Cloud:** Docker, AWS, Git, Linux

*(Note: Served via internal portfolio knowledge base during live Gemini API quota maintenance.)*`;
  }

  if (
    q.includes('project') ||
    q.includes('work') ||
    q.includes('portfolio') ||
    q.includes('demo') ||
    q.includes('link') ||
    q.includes('प्रोजेक्ट') ||
    q.includes('काम')
  ) {
    return isHindi
      ? `**अभिषेक के प्रमुख लाइव प्रोजेक्ट्स व डेमो:**
1. **Back.Removal (AI Background Removal SaaS):**
   • लाइव डेमो: https://back-removel-j9yy.vercel.app/
   • तकनीक: React, Node.js, MongoDB, Clerk Auth, Razorpay, Vercel

2. **Phishing Detection AI (Explainable Machine Learning):**
   • लाइव डेमो: https://abhishek-kumar-seven.vercel.app/
   • तकनीक: Python, XGBoost, Random Forest, SHAP, LIME, FastAPI, React

3. **ABHISHEK.MEDIAA (Visual Journalism):**
   • प्लेटफॉर्म: https://instagram.com/abhishek.mediaa (150K+ फॉलोअर्स)

आप मुख्य पृष्ठ पर स्क्रॉल करके भी सीधे "Live Demo" बटन से इन प्रोजेक्ट्स को लॉन्च कर सकते हैं!`
      : `**Abhishek's Featured Live Projects & Demos:**
1. **Back.Removal (AI Background Removal SaaS):**
   • Live Demo: https://back-removel-j9yy.vercel.app/
   • Tech Stack: React, Node.js, MongoDB, Clerk Auth, Razorpay, Vercel
   • Sub-second neural segmentation and secure credit checkout.

2. **Phishing Detection AI (Explainable Machine Learning):**
   • Live Demo: https://abhishek-kumar-seven.vercel.app/
   • Tech Stack: Python, XGBoost, Random Forest, SHAP, LIME, FastAPI, React
   • 96.2% validation accuracy with real-time explainability dashboards.

3. **ABHISHEK.MEDIAA (Visual Journalism):**
   • Platform: https://instagram.com/abhishek.mediaa
   • Combined 150K+ audience across digital channels.

You can also click the **"Live Demo"** button directly on any project card in the Projects section!`;
  }

  if (
    q.includes('contact') ||
    q.includes('hire') ||
    q.includes('email') ||
    q.includes('reach') ||
    q.includes('संपर्क') ||
    q.includes('हायर')
  ) {
    return isHindi
      ? `**अभिषेक से संपर्क करें:**
• आप नेविगेशन बार या फूटर में **"संपर्क" (Contact)** बटन दबाकर सीधे फॉर्म के ज़रिये संदेश भेज सकते हैं।
• अभिषेक नए प्रोजेक्ट्स, इंजीनियरिंग रोल्स और टेक्निकल कंसल्टिंग के लिए उपलब्ध हैं!`
      : `**Get in Touch with Abhishek:**
• Click the **"Contact"** button in the navigation bar or footer to send a direct message.
• Abhishek is currently open for select engineering roles, contract collaborations, and technical consulting.`;
  }

  if (
    q.includes('location') ||
    q.includes('where') ||
    q.includes('city') ||
    q.includes('place') ||
    q.includes('map') ||
    q.includes('स्थान') ||
    q.includes('कहाँ')
  ) {
    return isHindi
      ? `**अभिषेक का स्थान व कार्यक्षेत्र:**
• **लोकेशन:** भारत (New Delhi / Remote & Global)
• **सहयोग:** वैश्विक रिमोट प्रोजेक्ट्स, क्लाइंट ऑन-साइट विज़िट्स और अंतर्राष्ट्रीय टीमों के साथ काम करने के लिए उपलब्ध।`
      : `**Abhishek's Location & Availability:**
• **Primary Base:** India (Delhi NCR / Bengaluru tech corridor & Global Remote)
• **Collaboration:** Available for worldwide remote contracts, on-site technical workshops, and global software projects.`;
  }

  if (q.includes('service') || q.includes('सेवा')) {
    return isHindi
      ? `**अभिषेक द्वारा दी जाने वाली सेवाएं:**
01. **फुल-स्टैक MERN इंजीनियरिंग:** मॉडर्न रिएक्ट वेब ऐप्स और स्केलेबल नोड बैकएंड।
02. **मॉडर्न फ्रंटएंड आर्किटेक्चर:** टेलविंड और फ्रेम मोशन के साथ अल्ट्रा-रिस्पॉन्सिव UI।
03. **API व बैकएंड सिस्टम्स:** सुरक्षित, मॉड्यूलर REST व GraphQL APIs।
04. **मशीन लर्निंग व AI इंटीग्रेशन:** कस्टम AI फीचर्स और जेमिनी इंटीग्रेशन।`
      : `**Services Offered by Abhishek:**
01. **Full-Stack MERN Engineering:** Production-grade web applications from database to UI.
02. **Modern Frontend Architecture:** Fluid, accessible, and tactile interfaces with React, Tailwind & Framer Motion.
03. **API & Backend Systems:** High-throughput REST endpoints, authentication, and database modeling.
04. **Machine Learning & AI Integration:** Intelligent features leveraging modern GenAI models and custom pipelines.`;
  }

  return isHindi
    ? `नमस्ते! मैं अभिषेक का AI सहायक हूँ। अभिषेक एक कुशल फुल-स्टैक MERN डेवलपर, मशीन लर्निंग इंजीनियर और विज़ुअल स्टोरीटेलर हैं। आप उनके प्रोजेक्ट्स, स्किल्स, सेवाओं, लोकेशन या गूगल मैप्स स्थानों के बारे में पूछ सकते हैं!`
    : `Hello! I'm Abhishek's AI Assistant. Abhishek is a Full-Stack MERN Developer, Machine Learning Engineer, and Visual Storyteller. Feel free to ask about his projects, technical expertise, services, location, or nearby tech hubs via Google Maps!`;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Initialize GoogleGenAI client server-side with required User-Agent
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Multi-turn Gemini chat endpoint with Google Search & Google Maps Grounding
  app.post('/api/chat', async (req, res) => {
    const {
      message,
      history = [],
      model = 'gemini-3.5-flash',
      groundingMode = 'maps', // 'maps' | 'search' | 'none'
      location, // optional { latitude: number, longitude: number }
    } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const isHindi = isHindiText(message);

    // Auto-detect if query is place/maps oriented
    const placeRegex = /(where|location|map|place|directions|nearby|cafe|restaurant|office|city|address|tech hub|co-working|hotel|travel|कहाँ|स्थान|जगह|नक्शा)/i;
    const isPlaceQuery = placeRegex.test(message);

    // Determine actual grounding tool to use
    let activeToolMode = groundingMode;
    if (activeToolMode === 'maps' || (isPlaceQuery && activeToolMode !== 'none')) {
      activeToolMode = 'maps';
    }

    // Comprehensive system instruction defining the chatbot role
    const systemInstruction = `You are Abhishek's AI Assistant & Interactive Portfolio Guide. You represent Abhishek — a Full-Stack MERN Developer, Machine Learning Engineer, and Visual Storyteller.
You possess deep knowledge of Abhishek's portfolio, background, skillset, and geographical presence:
- Core Tech Stack: React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Node.js, Express, MongoDB, Python, PyTorch, LangChain, Gemini API, Docker, AWS, Git.
- Featured Projects:
  1. Back.Removal: AI background removal SaaS platform built with React, Node.js, MongoDB, Clerk Auth, Razorpay. Live Demo URL: https://back-removel-j9yy.vercel.app/
  2. Phishing Detection AI: Real-time explainable ML phishing detector with XGBoost, Random Forest, SHAP, and LIME. Live Demo URL: https://abhishek-kumar-seven.vercel.app/
  3. ABHISHEK.MEDIAA: Photojournalism and digital content platform with 150K+ audience: https://instagram.com/abhishek.mediaa
- Location & Global Reach: Abhishek collaborates with global teams, tech startups, and clients across India (Delhi NCR, Bengaluru), North America, Europe, and Remote.
- Professional Services: Full-Stack MERN Engineering, Modern Frontend Architecture, API & Backend Engineering, Machine Learning Integration.
- Availability: Abhishek is open for select engineering roles, contract projects, technical consulting, and freelance collaborations.

Key Rules:
1. Act as a welcoming, articulate, and technically adept guide for portfolio visitors.
2. For questions regarding locations, places, meeting spots, tech hubs, co-working spaces, cities, or navigation, leverage Google Maps Grounding with gemini-3.5-flash to provide accurate, real-world place recommendations, addresses, and insights.
3. For questions regarding recent technology news, real-time web facts, or external documentation, leverage Google Search Grounding to deliver accurate, fresh insights.
4. If the user writes or queries in Hindi, reply gracefully in Hindi (or Hinglish if conversational).
5. Keep answers concise, informative, well-formatted, and visually scannable with bullet points or code snippets when helpful.`;

    // Build contents array with valid multi-turn history
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const item of history) {
        if (item && item.role && item.text) {
          contents.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.text }],
          });
        }
      }
    }

    // Append current user message
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    // Cascade models to try if quota or rate limits are encountered
    const candidateModels = Array.from(
      new Set([
        model || 'gemini-3.5-flash',
        'gemini-3.5-flash',
        'gemini-3.8-flash',
        'gemini-3.1-flash-lite',
      ])
    ).filter(Boolean);

    let lastError: any = null;

    // Try executing through model fallback cascade
    for (const currentModel of candidateModels) {
      // Configure tools according to activeToolMode
      let tools: any[] | undefined = undefined;
      let toolConfig: any = undefined;

      if (activeToolMode === 'maps') {
        // Grounding with Google Maps (per SKILL.md: use gemini-3.5-flash or gemini-3.8-flash)
        tools = [{ googleMaps: {} }];
        if (location && typeof location.latitude === 'number' && typeof location.longitude === 'number') {
          toolConfig = {
            retrievalConfig: {
              latLng: {
                latitude: location.latitude,
                longitude: location.longitude,
              },
            },
          };
        }
      } else if (activeToolMode === 'search') {
        // Grounding with Google Search
        tools = [{ googleSearch: {} }];
      }

      // First attempt with the requested grounding tool
      try {
        const response = await ai.models.generateContent({
          model: currentModel,
          contents,
          config: {
            systemInstruction,
            tools,
            toolConfig,
          },
        });

        const text = response.text || '';
        const groundingChunks =
          response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

        // Extract Google Maps grounding chunks (maps uri and title)
        const mapSources: Array<{ uri: string; title: string; address?: string }> = [];
        const webSources: Array<{ uri: string; title: string }> = [];

        for (const chunk of groundingChunks as any[]) {
          if (chunk.maps) {
            mapSources.push({
              uri: chunk.maps.uri || '',
              title: chunk.maps.title || 'View on Google Maps',
              address: chunk.maps.placeAnswerSources?.reviewSnippets?.[0] || '',
            });
          }
          if (chunk.web && chunk.web.uri) {
            webSources.push({
              uri: chunk.web.uri,
              title: chunk.web.title || 'Web Reference',
            });
          }
        }

        return res.json({
          text,
          mapSources: mapSources.filter((m) => Boolean(m.uri)),
          webSources: webSources.filter((w) => Boolean(w.uri)),
          modelUsed: currentModel,
          mapsUsed: Boolean(activeToolMode === 'maps' && mapSources.length > 0),
          searchUsed: Boolean(activeToolMode === 'search' && webSources.length > 0),
        });
      } catch (err: any) {
        lastError = err;
        console.warn(`[Gemini Chat] Model ${currentModel} (grounding: ${activeToolMode}) failed:`, err?.message || err);

        // If grounded attempt failed, try currentModel without grounding tools
        if (tools) {
          try {
            console.log(`[Gemini Chat] Retrying ${currentModel} without grounding tools...`);
            const retryResponse = await ai.models.generateContent({
              model: currentModel,
              contents,
              config: {
                systemInstruction,
              },
            });

            const text = retryResponse.text || '';
            return res.json({
              text,
              mapSources: [],
              webSources: [],
              modelUsed: currentModel,
              mapsUsed: false,
              searchUsed: false,
            });
          } catch (retryErr: any) {
            lastError = retryErr;
            console.warn(`[Gemini Chat] ${currentModel} ungrounded retry also failed:`, retryErr?.message || retryErr);
          }
        }

        // Continue to next candidate model in cascade
        continue;
      }
    }

    // If all candidate models in the cascade failed (e.g. 429 quota exhaustion)
    console.error('[Gemini Chat] All live models in cascade exhausted. Falling back to portfolio knowledge base:', lastError?.message || lastError);

    const fallbackAnswer = generatePortfolioFallback(message, isHindi);

    return res.json({
      text: fallbackAnswer,
      mapSources: [],
      webSources: [],
      modelUsed: 'portfolio-guide (offline quota mode)',
      mapsUsed: false,
      searchUsed: false,
      quotaExceeded: isQuotaError(lastError),
    });
  });

  // Mount Vite middleware in development or serve static build in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
