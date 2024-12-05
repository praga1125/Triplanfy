import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "Generate Travel Plan for Location: Goa, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, travel cost, Time travel each of the location for 3 days with each day many plans with best time to visit in JSON format",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location: Chennai to Goa, for 5 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Travel cost, Time travel each of the location for 3 days with each day many plans with best time to visit in only JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "tripDetails": {\n    "destination": "Goa from Chennai",\n    "duration": "5 Days",\n    "travelers": "Couple",\n    "budget": "Cheap"\n  },\n  "travel": {\n    "mode": "Flight/Train (depending on budget)",\n    "cost": {\n      "flight": {\n        "min": 4000,\n        "max": 8000\n      },\n      "train": {\n        "min": 2000,\n        "max": 4000\n      }\n    },\n    "travelTime": {\n      "flight": "2 hours",\n      "train": "24-36 hours"\n    }\n  },\n  "hotels": [\n    {\n      "hotelName": "The Lazy Goan",\n      "address": "Calangute, Goa",\n      "price": {\n        "min": 1500,\n        "max": 2500\n      },\n      "imageUrl": "https://example.com/lazygoan.jpg",\n      "geoCoordinates": [15.4995, 73.7789],\n      "rating": 4.0,\n      "description": "Budget-friendly hotel near Calangute beach"\n    },\n    {\n      "hotelName": "Seashell Beach Resort",\n      "address": "Palolem, Goa",\n      "price": {\n        "min": 1200,\n        "max": 2000\n      },\n      "imageUrl": "https://example.com/seashell.jpg",\n      "geoCoordinates": [15.0935, 73.9701],\n      "rating": 3.5,\n      "description": "Simple resort with beach access in Palolem"\n    },\n    {\n      "hotelName": "Guest House in Panjim",\n      "address": "Panjim, Goa",\n      "price": {\n        "min": 800,\n        "max": 1500\n      },\n      "imageUrl": "https://example.com/panjimguesthouse.jpg",\n      "geoCoordinates": [15.4951, 73.8164],\n      "rating": 3.0,\n      "description": "Basic guesthouse in Panjim city, good value"\n    }\n  ],\n  "itinerary": {\n    "day1": [\n      {\n        "placeName": "Arrival in Goa & Panjim",\n        "placeDetails": "Check into hotel, explore Panjim\'s Fontainhas Latin Quarter, Immaculate Conception Church",\n        "imageUrl": "https://example.com/panjim.jpg",\n        "geoCoordinates": [15.4951, 73.8164],\n        "ticketPricing": "Free",\n        "rating": 4.5,\n        "travelCost": 0,\n        "travelTime": "2 hours"\n      }\n    ],\n    "day2": [\n      {\n        "placeName": "Beaches (North Goa)",\n        "placeDetails": "Calangute Beach, Baga Beach – relax, swim, enjoy street food",\n        "imageUrl": "https://example.com/calangute.jpg",\n        "geoCoordinates": [15.4995, 73.7789],\n        "ticketPricing": "Free",\n        "rating": 4.0,\n        "travelCost": "local transport (50-100 INR)",\n        "travelTime": "Full Day"\n      },\n      {\n        "placeName": "Sunset at Chapora Fort",\n        "placeDetails": "Watch the sunset over Vagator beach from Chapora Fort (featured in Dil Chahta Hai)",\n        "imageUrl": "https://example.com/chapora.jpg",\n        "geoCoordinates": [15.5343, 73.7381],\n        "ticketPricing": "50 INR (approx)",\n        "rating": 4.5,\n        "travelCost": "local transport (50-100 INR)",\n        "travelTime": "2-3 hours"\n      }\n    ],\n    "day3": [\n      {\n        "placeName": "South Goa Beaches",\n        "placeDetails": "Palolem Beach, Agonda Beach – quieter, more relaxed atmosphere",\n        "imageUrl": "https://example.com/palolem.jpg",\n        "geoCoordinates": [15.0935, 73.9701],\n        "ticketPricing": "Free",\n        "rating": 4.5,\n        "travelCost": "Bus/Taxi (300-500 INR)",\n        "travelTime": "Full Day"\n      }\n    ],\n    "day4": [\n      {\n        "placeName": "Dudhsagar Falls (Optional)",\n        "placeDetails": "If time and budget allows, take a jeep safari to Dudhsagar Falls",\n        "imageUrl": "https://example.com/dudhsagar.jpg",\n        "geoCoordinates": [15.2342, 74.1037],\n        "ticketPricing": "800-1200 INR per person (approx)",\n        "rating": 4.5,\n        "travelCost": "800-1200 INR (excluding travel to location)",\n        "travelTime": "Full Day"\n      },\n      {\n        "placeName": "Spice Plantation (Optional)",\n        "placeDetails": "Visit a spice plantation for a tour and traditional Goan lunch",\n        "imageUrl": "https://example.com/spice.jpg",\n        "geoCoordinates": "[Varies]",\n        "ticketPricing": "500-800 INR (approx)",\n        "rating": 4.0,\n        "travelCost": "500-800 INR (excluding travel to location)",\n        "travelTime": "3-4 hours"\n      }\n    ],\n    "day5": [\n      {\n        "placeName": "Departure from Goa",\n        "placeDetails": "Travel to airport/railway station for departure",\n        "imageUrl": "",\n        "geoCoordinates": null,\n        "ticketPricing": null,\n        "rating": null,\n        "travelCost": null,\n        "travelTime": "Depends on mode of transportation"\n      }\n    ]\n  },\n  "bestTimeToVisit": "October to March (winter)"\n}\n```',
        },
      ],
    },
  ],
});
