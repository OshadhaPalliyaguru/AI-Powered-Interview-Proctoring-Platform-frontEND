// components/WebcamFeed.tsx
"use client";
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from '@vladmandic/face-api';

export default function WebcamFeed() {
  const webcamRef = useRef<Webcam>(null);
  

  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [proctorWarning, setProctorWarning] = useState<string | null>(null);


  useEffect(() => {
    const loadModels = async () => {
      try {
        
        const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/';
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        setIsModelLoaded(true);
        console.log("Face Tracking AI loaded!");
      } catch (error) {
        console.error("AI Models load wenna fail una:", error);
      }
    };
    loadModels();
  }, []);

  
  useEffect(() => {
    let interval: any;

    if (isModelLoaded) {
      interval = setInterval(async () => {
      
        if (webcamRef.current && webcamRef.current.video && webcamRef.current.video.readyState === 4) {
          const video = webcamRef.current.video;
          
    
          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());

      
          if (detections.length === 0) {
            setProctorWarning("⚠️ No Face Detected!");
          } else if (detections.length > 1) {
            setProctorWarning("⚠️ Multiple Faces Detected!");
          } else {
            setProctorWarning(null); 
          }
        }
      }, 2000); 
    }

    return () => clearInterval(interval);
  }, [isModelLoaded]);

  return (
    <div className="absolute top-6 right-6 z-20 flex flex-col items-end">
      
      {/* Warning Message Box Eka */}
      {proctorWarning && (
        <div className="bg-red-600/90 border border-red-400 text-white px-4 py-2 rounded-lg mb-3 animate-pulse font-bold text-sm shadow-2xl">
          {proctorWarning}
        </div>
      )}

      {/* Camera Feed Eka */}
      <div className="w-48 h-36 bg-gray-900 rounded-xl overflow-hidden border-2 border-gray-700 shadow-lg relative">
        <Webcam 
          ref={webcamRef}
          audio={false} 
          className="w-full h-full object-cover"
          mirrored={true}
        />
        
        {/* Loading text eka pennanawa AI eka load wela iwara wenakan */}
        {!isModelLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm text-xs font-medium text-cyan-400 animate-pulse">
            Loading Proctor AI...
          </div>
        )}
      </div>
    </div>
  );
}