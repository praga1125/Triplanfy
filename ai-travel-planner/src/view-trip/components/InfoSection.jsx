import { Button } from "@/components/ui/button";
import { PHOTO_REF_URL, searchPlaces } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";

function InfoSection({ trip }) {
  const [placePhoto, setPlacePhoto] = useState(null);
  useEffect(() => {
    if (trip?.userSelection?.destination?.label) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.destination?.label,
      };
      const response = await searchPlaces(data);
      if (response?.places?.[0]?.photos?.[0]) {
        console.log(response.places[0].photos[3].name);
        const photoRefUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          response.places[0].photos[3].name
        );
        setPlacePhoto(photoRefUrl);
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
      setPlacePhoto("/test.jpg"); // Fallback image
    }
  };

  return (
    <div className="relative">
      <div className="aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-xl">
        <img
          src={placePhoto}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          alt={trip?.userSelection?.destination?.label || "Destination Image"}
        />
      </div>

      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
        <div className="space-y-4">
          <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {trip?.userSelection?.destination?.label}
          </h2>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full">
              <span className="mr-2 text-lg">📅</span>
              <span className="text-sm sm:text-base text-gray-700">
                {trip?.userSelection?.noOfDays} Days
              </span>
            </div>

            <div className="flex items-center bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full">
              <span className="mr-2 text-lg">💸</span>
              <span className="text-sm sm:text-base text-gray-700">
                {trip?.userSelection?.budget} Budget
              </span>
            </div>

            <div className="flex items-center bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full">
              <span className="mr-2 text-lg">🥂</span>
              <span className="text-sm sm:text-base text-gray-700">
                {trip?.userSelection?.travelCompanion} Travelers
              </span>
            </div>
          </div>
        </div>

        <Button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 px-6 py-3 rounded-full">
          <FiSend className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
        </Button>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <div className="flex items-center bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full">
          <span className="mr-2 text-lg">⌛</span>
          <span className="text-sm sm:text-base text-gray-700">
            Best Time: {trip?.tripData?.bestTimeToVisit}
          </span>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
