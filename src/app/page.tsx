// app/page.tsx
"use client"; 
import React from 'react';
import WebcamFeed from '../components/WebcamFeed';
import AudioVisualizer from '../components/AudioVisualizer';
import { Mic, MicOff } from 'lucide-react';

// Api hadapu custom hook eka import karanawa
import { useSpeechToText } from '../hooks/useSpeachToText'; 

export default function InterviewRoom() {
  
  // Custom hook eken apita oni wena variables saha functions tika gannawa
  const { transcript, isListening, startListening, stopListening } = useSpeechToText();

  // Button eka click karama wena de
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden flex items-center justify-center flex-col">
      
      <WebcamFeed />
      <AudioVisualizer isListening={isListening} />

      {/* Api kiyana de screen eke pennanna podi text box ekak damma */}
      <div className="absolute top-10 text-center z-20 w-1/2">
        <p className="text-white text-xl bg-gray-900/50 p-4 rounded-xl shadow-lg border border-gray-700 min-h-[60px]">
          {transcript || "Say something..."}
        </p>
      </div>

      <div className="absolute bottom-10 z-20">
        <button
          onClick={toggleListening} 
          className={`p-5 rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-105 ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-cyan-600 hover:bg-cyan-700'}`}
        >
          {isListening ? <MicOff className="text-white w-7 h-7" /> : <Mic className="text-white w-7 h-7" />}
        </button>
      </div>
      
    </div>
  );
}