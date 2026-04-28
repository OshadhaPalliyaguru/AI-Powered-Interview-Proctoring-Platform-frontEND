import React from 'react';
import { Mic, MicOff, PhoneOff, Video, MessageSquare } from 'lucide-react';

interface ActiveInterviewScreenProps {
  isProcessing: boolean;
  warningCount: number;
  transcript: string;
  aiResponse: string;
  candidateName: string;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
}

export default function ActiveInterviewScreen({
  isProcessing,
  warningCount,
  transcript,
  aiResponse,
  candidateName,
  isListening,
  startListening,
  stopListening
}: ActiveInterviewScreenProps) {
  return (
    <div className="relative h-screen w-full bg-black overflow-hidden flex flex-col justify-end">
      
      {/* Background & Animated AI Core */}
      <div className="absolute inset-0 z-0 bg-gray-950 flex flex-col items-center justify-center">
        
        {/* Pulsing Orb Animation */}
        <div className={`relative flex items-center justify-center transition-all duration-500 ${isProcessing ? 'scale-110' : 'scale-100'}`}>
          {/* Outer Glow */}
          <div className="absolute w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl animate-pulse"></div>
          {/* Middle Pulse */}
          <div className="absolute w-56 h-56 bg-cyan-500/20 rounded-full blur-2xl animate-ping" style={{ animationDuration: '3s' }}></div>
         
          <div className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-700 rounded-full shadow-[0_0_60px_rgba(6,182,212,0.6)] border-4 border-cyan-300/50 flex items-center justify-center z-10">
             {/* Mic Icon or AI Icon in the center */}
             <Mic className={`w-12 h-12 ${isProcessing ? 'text-white animate-pulse' : 'text-white/80'}`} />
          </div>
        </div>

        {/* AI Status Text */}
        <div className="mt-12 text-cyan-500/80 font-medium tracking-widest uppercase text-sm">
          {isProcessing ? 'Analyzing Candidate...' : 'AI Interviewer Active'}
        </div>
      </div>

      {/* Proctoring Warnings (Top Left) */}
      <div className="absolute top-6 left-6 z-50 flex flex-col gap-2">
        {warningCount > 0 && (
          <div className="bg-red-600/90 border border-red-500 text-white px-4 py-2 rounded-lg shadow-xl font-medium animate-pulse">
            ⚠️ Proctor Warning: Tab switched ({warningCount})
          </div>
        )}
      </div>

      {/* Main Content Area (Z-index wadi, camera eka udin thiyenne) */}
      <div className="z-10 w-full max-w-4xl mx-auto px-6 pb-24 flex flex-col items-center justify-end h-full pointer-events-none">
        
        {/* User ge Text eka */}
        {transcript && (
          <div className="bg-gray-900/60 backdrop-blur-md text-gray-300 px-6 py-3 rounded-full mb-4 border border-gray-700/50 shadow-lg text-sm max-w-2xl text-center">
            "{transcript}"
          </div>
        )}

        {/* AI ge Answer eka (Lokuwata pennanawa) */}
        {aiResponse && (
          <div className="bg-cyan-900/40 backdrop-blur-lg border border-cyan-500/30 text-cyan-100 p-6 rounded-2xl shadow-2xl text-lg text-center max-w-3xl leading-relaxed mb-8">
            <span className="font-semibold text-cyan-400 mr-2">AI Interviewer:</span>
            {aiResponse}
          </div>
        )}

        {/* AI Processing Animation */}
        {isProcessing && (
          <div className="text-cyan-400 mb-8 flex items-center gap-3 bg-gray-900/80 px-6 py-3 rounded-full backdrop-blur-md">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
            <span className="font-medium text-sm">Interviewer is thinking...</span>
          </div>
        )}
      </div>

      {/* Bottom Control Bar (Google Meet Style) */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-gray-950 to-transparent pt-12 pb-6 px-8 z-50 flex items-center justify-between">
        
        <div className="text-gray-400 font-medium text-sm flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
           Recording | {candidateName}'s Interview
        </div>

        <div className="flex items-center gap-4">
          <button 
            onMouseDown={startListening}
            onMouseUp={stopListening}
            onTouchStart={startListening}
            onTouchEnd={stopListening}
            className={`p-4 rounded-full transition-all shadow-lg flex items-center justify-center ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            {isListening ? <Mic className="w-6 h-6 text-white" /> : <MicOff className="w-6 h-6" />}
          </button>

          <button className="p-4 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-all shadow-lg">
            <Video className="w-6 h-6" />
          </button>

          <button className="p-4 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-all shadow-lg">
            <MessageSquare className="w-6 h-6" />
          </button>

          <button 
            onClick={() => {
               if(confirm("Are you sure you want to end the interview?")) {
                 window.location.reload(); 
               }
            }}
            className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all shadow-lg ml-4"
          >
            <PhoneOff className="w-6 h-6" />
          </button>
        </div>

        <div className="text-gray-400 font-medium text-sm">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

    </div>
  );
}
