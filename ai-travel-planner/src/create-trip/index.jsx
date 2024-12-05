import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  selectBudgetOptions,
  SelectTravelsList,
} from "@/constants/options";
import { doc, documentId, setDoc } from "firebase/firestore";
import { chatSession } from "@/service/AIModal";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function CreateTrip() {
  const [source, setSource] = useState();
  const [destination, setDestination] = useState();
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    noOfDays: "",
    budget: "",
    travelCompanion: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const saveAiTrip = async (tripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AiTrips", docId), {
      userSelection: formData,
      tripData,
      userEmail: user?.email,
      id: docId,
    });
    window.dispatchEvent(new Event("userUpdated"));
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  const onGenerateTrips = async () => {
    if (
      !formData?.source ||
      !formData?.destination ||
      !formData?.noOfDays ||
      formData?.noOfDays <= 0 ||
      !formData?.budget ||
      !formData?.travelCompanion
    ) {
      toast("Please enter all the required values correctly.");
      return;
    }

    setLoading(true);
    try {
      const FINAL_PROMPT = AI_PROMPT.replace(
        "{source}",
        formData?.source?.label
      )
        .replace("{destination}", formData?.destination?.label)
        .replace("{totalDays}", formData?.noOfDays)
        .replace("{traveler}", formData?.travelCompanion + " people")
        .replace("{budget}", formData?.budget)
        .replace("{totalDays}", formData?.noOfDays);

      console.log(FINAL_PROMPT);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      let responseText = result.response?.text();
      console.log("Raw AI Response:", responseText);

      // Extract JSON from markdown or direct response
      let jsonMatch = responseText.match(/{.*}/s);

      if (!jsonMatch) {
        throw new Error("No valid JSON found in response");
      }

      try {
        const jsonString = jsonMatch[0];
        const tripData = JSON.parse(jsonString);
        await saveAiTrip(tripData);
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError);
        toast.error("Failed to parse trip data. Please try again.");
      }
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("Failed to generate trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Plan Your Dream Journey ✨
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
            Let our AI travel planner create a personalized itinerary that
            matches your preferences perfectly.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
          >
            <h2 className="text-2xl font-semibold mb-6">Journey Details 🗺️</h2>

            <div className="space-y-8">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Starting Point
                </label>
                <GooglePlacesAutocomplete
                  apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                  selectProps={{
                    value: source,
                    onChange: (val) => {
                      setSource(val);
                      handleInputChange("source", val);
                    },
                    styles: {
                      control: (provided) => ({
                        ...provided,
                        borderRadius: "0.75rem",
                        borderColor: "#E5E7EB",
                        padding: "0.25rem",
                        boxShadow: "none",
                        "&:hover": {
                          borderColor: "#3B82F6",
                        },
                      }),
                    },
                  }}
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Destination
                </label>
                <GooglePlacesAutocomplete
                  apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                  selectProps={{
                    value: destination,
                    onChange: (v) => {
                      setDestination(v);
                      handleInputChange("destination", v);
                    },
                    styles: {
                      control: (provided) => ({
                        ...provided,
                        borderRadius: "0.75rem",
                        borderColor: "#E5E7EB",
                        padding: "0.25rem",
                        boxShadow: "none",
                        "&:hover": {
                          borderColor: "#3B82F6",
                        },
                      }),
                    },
                  }}
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Duration (Days)
                </label>
                <Input
                  className="rounded-xl py-3 text-lg"
                  placeholder="How many days?"
                  type="number"
                  value={formData.noOfDays}
                  min="0"
                  onChange={(e) => {
                    const value = Math.max(0, parseInt(e.target.value, 10));
                    handleInputChange("noOfDays", value);
                  }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
          >
            <h2 className="text-2xl font-semibold mb-6">
              Budget Preference 💰
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectBudgetOptions.map((item, index) => (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  key={index}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-200 ${
                    formData?.budget === item.title
                      ? "bg-blue-50 border-2 border-blue-500"
                      : "border border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => handleInputChange("budget", item.title)}
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
          >
            <h2 className="text-2xl font-semibold mb-6">
              Travel Companions 👥
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SelectTravelsList.map((item, index) => (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  key={index}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-200 ${
                    formData?.travelCompanion === item.people
                      ? "bg-purple-50 border-2 border-purple-500"
                      : "border border-gray-200 hover:border-purple-300"
                  }`}
                  onClick={() =>
                    handleInputChange("travelCompanion", item.people)
                  }
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center pt-8"
          >
            <Button
              disabled={loading}
              onClick={onGenerateTrips}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <motion.div
                      animate={{
                        y: [0, -8, 0],
                        transition: {
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0,
                        },
                      }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                    <motion.div
                      animate={{
                        y: [0, -8, 0],
                        transition: {
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0.2,
                        },
                      }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                    <motion.div
                      animate={{
                        y: [0, -8, 0],
                        transition: {
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0.4,
                        },
                      }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  </div>
                  <span>Crafting your adventure...</span>
                </div>
              ) : (
                "Generate My Dream Trip ✨"
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default CreateTrip;
