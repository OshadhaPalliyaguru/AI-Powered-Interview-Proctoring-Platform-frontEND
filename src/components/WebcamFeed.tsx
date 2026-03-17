"use client";
import React from "react";
import Webcam from "react-webcam";

export default function WebcamFeed() {
return(
    <div className="absolute top-6 right-6 w-48 h-36 bg-gray-800 rounded-xl overflow-hidden border-2 border-gray-700 shadow-lg z-20">

    <Webcam
    audio={false}
    className="w-full h-full object-cover"
    mirrored
    />
    </div>
);
}