import React from "react";
import { Link } from "react-router-dom";
import PlaceCardItem from "./PlaceCardItem";

function PlaceToVisit({ trip }) {
  return (
    <div>
      <h2 className="mt-5 font-bold text-lg">Place To Visit</h2>
      <div>
        {Object.entries(trip?.tripData?.itinerary || {})
          .sort(([dayA], [dayB]) => {
            // Extract day numbers and compare them
            const numA = parseInt(dayA.replace("day", ""));
            const numB = parseInt(dayB.replace("day", ""));
            return numA - numB;
          })
          .map(([day, activities]) => (
            <div key={day} className="mt-8">
              <h3 className="text-xl font-bold capitalize mb-4">{day}</h3>
              <div
                className={`flex flex-wrap gap-6 ${
                  Array.isArray(activities) && activities.length > 2
                    ? "flex-row"
                    : "md:grid md:grid-cols-2"
                }`}
              >
                {Array.isArray(activities) ? (
                  activities.map((item) => <PlaceCardItem item={item} />)
                ) : activities ? (
                  <Link
                    to={`https://www.google.com/maps/search/?api=1&query=${activities.placeName}`}
                    target="_blank"
                    className="group flex-1 min-w-[300px]"
                  >
                    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow h-full">
                      <div className="flex flex-col gap-3">
                        {activities.imageUrl && (
                          <img
                            src={activities.imageUrl}
                            alt={activities.placeName}
                            className="w-full h-48 object-cover rounded-lg mb-2"
                          />
                        )}
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-lg">
                            {activities.placeName}
                          </h4>
                          {activities.rating && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                              ⭐ {activities.rating}
                            </span>
                          )}
                        </div>

                        <p className="text-gray-600 text-sm">
                          {activities.placeDetails}
                        </p>

                        <div className="flex flex-col gap-2 text-sm text-gray-500">
                          {activities.travelTime && (
                            <p>⏰ {activities.travelTime}</p>
                          )}
                          {activities.travelCost && (
                            <p>💰 Travel Cost: {activities.travelCost}</p>
                          )}
                          {activities.ticketPricing && (
                            <p>🎟️ Entry: {activities.ticketPricing}</p>
                          )}
                          {activities.geoCoordinates &&
                            Array.isArray(activities.geoCoordinates) && (
                              <p>
                                📍 Coordinates:{" "}
                                {activities.geoCoordinates.join(", ")}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <p className="text-gray-600">
                      No activities available for this day
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PlaceToVisit;
