"use client"

import WebcamFeed from "@/components/WebcamFeed";
import React from "react";
import AudioVisualizer from "@/components/AudioVisualizer";
import { Mic, MicOff } from 'lucide-react'; 

export default function InterviewRoom() {


  const[isListening, setIsListening] = React.useState(false);


  return(
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      <WebcamFeed />

      <AudioVisualizer isListening={isListening} />

      <div className="absolute bottom-10 z-20">
        <button
        onClick={() =>setIsListening(!isListening)}
        className={`p-5 rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-105 ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-cyan-600 hover:bg-cyan-700'}`}
        >
        {isListening ? <MicOff className="text-white w-7 h-7" /> : <Mic className="text-white w-7 h-7" />}
        </button>
      </div>
    </div>
  )
}