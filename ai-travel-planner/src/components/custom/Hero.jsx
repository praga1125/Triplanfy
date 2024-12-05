import React, { useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { motion } from "framer-motion";

function Hero() {
  const [openDialog, setOpenDialog] = useState(false);
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const handleDialogClose = () => setOpenDialog(false);
  const handleGetStarted = () => {
    if (!user) {
      setOpenDialog(true);
    } else {
      navigate("/create-trip");
    }
  };

  const logIn = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log(codeResp);
      getUserProfile(codeResp);
    },
    onError: (error) => console.log(error),
  });

  const getUserProfile = async (tokenInfo) => {
    console.log(tokenInfo?.access_token);
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        window.dispatchEvent(new Event("userUpdated"));
        navigate("/create-trip");
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="font-extrabold text-3xl sm:text-4xl lg:text-[50px] text-center leading-tight"
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Plan Your Perfect Trip with AI:
            </span>
            <span className="block mt-2">
              {" "}
              Personalized Itineraries in Minutes
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-gray-600 text-center max-w-3xl"
          >
            Let our intelligent travel assistant create a customized travel
            itinerary based on your preferences, budget, and interests - so you
            can spend less time planning and more time exploring.
          </motion.p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleGetStarted}
              className="mt-6 py-3 px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-full hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1"
            >
              Get Started, It's Free
            </Button>
          </motion.div>

          {/* Dialog for login */}
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-2xl border-0">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-bold text-center text-gray-800">
                  <motion.img
                    src="/logo.svg"
                    className="mx-auto mb-4 w-32"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  />
                </DialogTitle>
                <DialogDescription className="text-center text-lg text-gray-600">
                  Sign in securely with Google to start your journey
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={logIn}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <FcGoogle className="h-6 w-6" />
                    <span>Sign In With Google</span>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    onClick={handleDialogClose}
                    className="w-full border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300"
                  >
                    Cancel
                  </Button>
                </motion.div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </motion.div>
  );
}

export default Hero;
