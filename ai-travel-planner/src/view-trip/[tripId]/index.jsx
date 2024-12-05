import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlaceToVisit from "../components/PlaceToVisit";
import Footer from "../components/Footer";

function index() {
  const { tripId } = useParams();
  const [tripData, setTripData] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    const docRef = doc(db, "AiTrips", tripId);
    const docSnap = await getDoc(docRef);
    console.log(docSnap);

    if (docSnap.exists()) {
      console.log("Document :", docSnap.data());
      setTripData(docSnap.data());
    } else {
      console.log("No such document!");
      toast("No Trip Found!");
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px:56">
      {/* Information Section */}
      <InfoSection trip={tripData} />
      {/* Recommended Hotels */}
      <Hotels trip={tripData} />
      {/* Daily plans */}
      <PlaceToVisit trip={tripData} />
      {/* footer */}
      <Footer />
    </div>
  );
}

export default index;
