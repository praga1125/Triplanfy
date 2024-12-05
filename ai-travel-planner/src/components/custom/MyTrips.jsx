import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { PlusCircle, MapPin, Calendar, Users, Trash2 } from "lucide-react";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { PHOTO_REF_URL, searchPlaces } from "@/service/GlobalApi";

function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placePhotos, setPlacePhotos] = useState({});
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.email) {
      fetchUserTrips();
    }
  }, [user]);

  useEffect(() => {
    if (trips.length > 0) {
      // Fetch photos with rate limiting and caching
      const fetchPhotos = async () => {
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const batchSize = 2; // Reduce batch size to 2
        const retryDelay = 2000; // 2 seconds delay for retries
        const maxRetries = 3;

        // Check localStorage for cached photos first
        const cachedPhotos = JSON.parse(
          localStorage.getItem("placePhotos") || "{}"
        );
        setPlacePhotos(cachedPhotos);

        for (let i = 0; i < trips.length; i += batchSize) {
          const batch = trips.slice(i, i + batchSize);

          await Promise.all(
            batch.map(async (trip) => {
              const destination = trip.userSelection?.destination?.label;
              if (!destination) return;

              // Skip if we already have a cached photo
              if (cachedPhotos[trip.id]) return;

              let retries = 0;
              while (retries < maxRetries) {
                try {
                  await getPlacePhoto(trip.id, destination);
                  break;
                } catch (error) {
                  retries++;
                  if (retries === maxRetries) {
                    console.error(
                      `Failed to fetch photo for ${destination} after ${maxRetries} retries`
                    );
                    setPlacePhotos((prev) => ({
                      ...prev,
                      [trip.id]: "/test.jpg",
                    }));
                  } else {
                    await delay(retryDelay);
                  }
                }
              }
            })
          );

          // Longer delay between batches
          if (i + batchSize < trips.length) {
            await delay(2000); // 2 second delay between batches
          }
        }
      };

      fetchPhotos();
    }
  }, [trips]);

  const getPlacePhoto = async (tripId, destination) => {
    try {
      const data = {
        textQuery: destination,
      };
      const response = await searchPlaces(data);

      if (response?.places?.[0]?.photos?.[0]) {
        const photoRefUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          response.places[0].photos[0].name
        );

        // Update state and cache
        setPlacePhotos((prev) => {
          const newPhotos = {
            ...prev,
            [tripId]: photoRefUrl,
          };
          // Cache the photos in localStorage
          localStorage.setItem("placePhotos", JSON.stringify(newPhotos));
          return newPhotos;
        });
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
      throw error; // Re-throw to handle in the retry logic
    }
  };

  const fetchUserTrips = async () => {
    try {
      const tripsRef = collection(db, "AiTrips");
      const q = query(tripsRef, where("userEmail", "==", user.email));
      const querySnapshot = await getDocs(q);

      const userTrips = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTrips(userTrips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTrip = () => {
    navigate("/create-trip");
  };

  const handleViewTrip = (tripId) => {
    navigate(`/view-trip/${tripId}`);
  };

  const handleEditTrip = (tripId) => {
    navigate(`/create-trip?edit=${tripId}`);
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      await deleteDoc(doc(db, "AiTrips", tripId));
      // Update local state to remove the deleted trip
      setTrips(trips.filter((trip) => trip.id !== tripId));
      // Remove the photo from cache
      const updatedPhotos = { ...placePhotos };
      delete updatedPhotos[tripId];
      setPlacePhotos(updatedPhotos);
      localStorage.setItem("placePhotos", JSON.stringify(updatedPhotos));
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-100 h-80 w-full rounded-xl"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Planned Trips</h1>
        <Button
          onClick={handleCreateTrip}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Plan New Trip
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="group bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={placePhotos[trip.id] || "/test.jpg"}
                alt={trip.userSelection?.destination?.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                  {trip.userSelection?.budget}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {trip.userSelection?.destination?.label}
                </h3>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative p-2 group/delete transition-all duration-300 focus:outline-none hover:bg-red-50 rounded-full overflow-hidden sm:p-2.5 md:p-3"
                  onClick={() => handleDeleteTrip(trip.id)}
                >
                  <Trash2 className="h-5 w-5 text-red-500 group-hover/delete:text-red-600 group-hover/delete:scale-110 group-hover/delete:rotate-12 transition-all duration-300 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                  <span className="absolute inset-0 bg-red-100/20 scale-0 group-hover/delete:scale-100 rounded-full transition-transform duration-300"></span>
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{trip.userSelection?.noOfDays} Days</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>From: {trip.userSelection?.source?.label}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{trip.userSelection?.travelCompanion} travelers</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleViewTrip(trip.id)}
                  className="flex-1 rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300"
                >
                  View Details
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleEditTrip(trip.id)}
                  className="flex-1 rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300"
                >
                  Edit Trip
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {trips.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No trips planned yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start planning your next adventure!
            </p>
            <Button
              onClick={handleCreateTrip}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Your First Trip
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyTrips;
