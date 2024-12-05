import { PHOTO_REF_URL, searchPlaces } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PlaceCardItem({ item }) {
  const [placePhoto, setPlacePhoto] = useState("/test.jpg");
  useEffect(() => {
    item && GetPlacePhoto();
  }, [item]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: item.placeName,
      };
      const response = await searchPlaces(data);
      if (response?.places?.[0]?.photos?.[0]) {
        console.log(response.places[0].photos[3].name);
        const photoRefUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          response.places[0].photos[3].name
        );
        console.log();
        setPlacePhoto(photoRefUrl);
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
      setPlacePhoto("/test.jpg"); // Fallback image
    }
  };
  return (
    <div>
      <Link
        key={item.placeName}
        to={`https://www.google.com/maps/search/?api=1&query=${item.placeName}`}
        target="_blank"
        className="group flex-1 min-w-[300px]"
      >
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow h-full">
          <div className="flex flex-col gap-3">
            {placePhoto && (
              <img
                src={placePhoto}
                alt={item.placeName}
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
            )}
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg">{item.placeName}</h4>
              {(item.rating || item.rating != 0) && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  ⭐ {item.rating}
                </span>
              )}
            </div>

            <p className="text-gray-600 text-sm">{item.placeDetails}</p>

            <div className="flex flex-col gap-2 text-sm text-gray-500">
              {item.travelTime && <p>⏰ {item.travelTime}</p>}
              {(item.travelCost || item.travelCost === 0) && (
                <p>💰 Travel Cost: {item.travelCost}</p>
              )}
              {(item.ticketPricing || item.ticketPricing === 0) && (
                <p>🎟️ Entry: {item.ticketPricing}</p>
              )}
              {item.geoCoordinates && Array.isArray(item.geoCoordinates) && (
                <p>📍 Coordinates: {item.geoCoordinates.join(", ")}</p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PlaceCardItem;
