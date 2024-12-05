import { PHOTO_REF_URL, searchPlaces } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCardItem({ item, index }) {
  const [placePhoto, setPlacePhoto] = useState("/test.jpg");
  useEffect(() => {
    item && GetPlacePhoto();
  }, [item]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: item.hotelName,
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
    <div>
      <Link
        key={index}
        to={`https://www.google.com/maps/search/?api=1&query=${item.hotelName},${item.address}`}
        target="_blank"
        className="group"
      >
        <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2">
          <div className="relative">
            <img
              src={placePhoto}
              className="w-full h-40 sm:h-48 object-cover"
              alt={placePhoto}
            />
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-sm">
              <span className="text-yellow-500">★</span>
              <span className="ml-1 font-medium">{item?.rating}</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 space-y-2 sm:space-y-3">
            <h3 className="font-semibold text-base sm:text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
              {item?.hotelName}
            </h3>

            <div className="flex items-center text-gray-600">
              <svg
                className="w-4 h-4 mr-2 flex-shrink-0"
                fill="none"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <p className="text-xs sm:text-sm line-clamp-1">{item?.address}</p>
            </div>

            <div className="flex items-center text-gray-700">
              <svg
                className="w-4 h-4 mr-2 flex-shrink-0"
                fill="none"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                />
              </svg>
              <p className="text-xs sm:text-sm font-medium">
                ₹{item?.price.min} - ₹{item?.price.max}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
              {item?.description}
            </p>

            <button className="w-full mt-3 sm:mt-4 bg-blue-50 text-blue-600 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm hover:bg-blue-100 transition-colors">
              View on Maps →
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelCardItem;
