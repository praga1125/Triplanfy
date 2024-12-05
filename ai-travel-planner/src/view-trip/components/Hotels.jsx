import { PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
  const hotels = trip?.tripData?.hotels;
  console.log(hotels);

  if (!hotels || hotels.length === 0) {
    return (
      <p className="text-gray-500 mt-5 text-center italic">
        No hotels available for this trip yet.
      </p>
    );
  }

  return (
    <div className="my-8 sm:my-12">
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <h2 className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Recommended Hotels
        </h2>
        <span className="text-xl sm:text-2xl">🏨</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {hotels.map((item, index) => (
          <HotelCardItem item={item} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
