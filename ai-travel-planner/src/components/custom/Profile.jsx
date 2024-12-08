import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/");
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleSignOut = () => {
    googleLogout();
    localStorage.clear();
    setUser(null);
    navigate("/");
  };

  if (!user) {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-8">
          <img
            src={user.picture}
            alt="Profile"
            className="w-24 h-24 rounded-full ring-4 ring-offset-4 ring-blue-500"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Account Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Full Name
                </label>
                <p className="mt-1 text-gray-900">{user.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <p className="mt-1 text-gray-900">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="pt-6 border-t">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Account Actions
            </h2>
            <Button
              onClick={handleSignOut}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
