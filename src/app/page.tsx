// app/page.tsx
"use client"; 
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import AudioVisualizer from '../components/AudioVisualizer';
import { Mic, MicOff } from 'lucide-react';

import { useSpeechToText } from '../hooks/useSpeachToText';
import { sendToAI } from '../services/aiService';
import { useProctoring } from '../hooks/useProctoring';

export default function InterviewRoom() {

  const WebcamFeed = dynamic(() => import('../components/WebcamFeed'), {
  ssr: false, 
});
  const { transcript, isListening, startListening, stopListening } = useSpeechToText();
  

  const [aiResponse, setAiResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false); 

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      setAiResponse(''); 
      startListening();
    }
  };

  const { warningCount, isTabHidden } = useProctoring();


 useEffect(() => {
    const fetchAIResponse = async () => {
      
      if (!isListening && transcript.trim() !== '') {
        setIsProcessing(true); 
        
       
        const reply = await sendToAI(transcript); 
        setAiResponse(reply); 
        
        
        try {
          const audioRes = await fetch('/api/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: reply })
          });

          if (audioRes.ok) {
          
            const audioBlob = await audioRes.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            
           
            const audio = new Audio(audioUrl);
            audio.play();
          }
        } catch (error) {
          console.error("Voice generation failed:", error);
        }
        
        setIsProcessing(false); 
      }
    };

    fetchAIResponse();
  }, [isListening, transcript]);

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden flex items-center justify-center flex-col">

    {/* Proctoring Warning UI */}
      {warningCount > 0 && (
        <div className="absolute top-4 left-4 z-30 bg-red-900/80 border border-red-500 text-red-200 px-4 py-2 rounded-lg shadow-lg">
          ⚠️ Warnings: {warningCount} (Do not switch tabs)
        </div>
      )}

      {isTabHidden && (
        <div className="absolute inset-0 bg-red-950/90 z-50 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold text-center">
            Interview Paused! <br/> Please return to this tab immediately.
          </h1>
        </div>
      )}

      <WebcamFeed />
      <AudioVisualizer isListening={isListening} />

     
      <div className="absolute top-10 text-center z-20 w-1/2">
        <p className="text-gray-300 text-lg bg-gray-900/50 p-4 rounded-xl shadow-lg border border-gray-700 min-h-[60px]">
          {transcript || "Say something..."}
        </p>
      </div>


      <div className="absolute top-32 text-center z-20 w-3/4">
        {isProcessing ? (
          <p className="text-cyan-400 animate-pulse">AI is thinking...</p>
        ) : (
          aiResponse && (
            <p className="text-cyan-300 text-xl font-semibold bg-gray-800/80 p-6 rounded-2xl shadow-2xl border border-cyan-900/50">
              {aiResponse}
            </p>
          )
        )}
      </div>

      <div className="absolute bottom-10 z-20">
        <button
          onClick={toggleListening} 
          disabled={isProcessing} 
          className={`p-5 rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-105 ${
            isListening ? 'bg-red-500 hover:bg-red-600' : 
            isProcessing ? 'bg-gray-600 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-700'
          }`}
        >
          {isListening ? <MicOff className="text-white w-7 h-7" /> : <Mic className="text-white w-7 h-7" />}
        </button>
      </div>
    </div>
  );
}