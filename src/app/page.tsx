// app/page.tsx
"use client"; 
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import AudioVisualizer from '../components/AudioVisualizer';


import { useSpeechToText } from '../hooks/useSpeachToText';
import { sendToAI } from '../services/aiService';
import { useProctoring } from '../hooks/useProctoring';
import { useAuthContext } from "@asgardeo/auth-react";

import LobbyScreen from '../components/screens/LobbyScreen';
import ActiveInterviewScreen from '../components/screens/ActiveInterviewScreen';


export default function InterviewRoom() {

  const WebcamFeed = dynamic(() => import('../components/WebcamFeed'), {
  ssr: false, 
});

const LobbyScreen = dynamic(() => import('../components/screens/LobbyScreen'), {
  ssr: false, 
});

const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [targetRole, setTargetRole] = useState('Full-Stack Engineer');
  const [cvSummary, setCvSummary] = useState('');
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

  const sendToAI = async (text: string) => {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // CV details tikath API ekata yawanawa
        body: JSON.stringify({ 
          message: text,
          candidateName: candidateName,
          role: targetRole,
          cvContext: cvSummary 
        }) 
      });
      const data = await res.json();
      return data.reply;
    } catch (error) {
      console.error(error);
      return "Connection error.";
    }
  };

  const { state, signIn, signOut } = useAuthContext();

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


  if (!isInterviewStarted) {
    return (
      <LobbyScreen 
        state={state}
        signIn={signIn}
        signOut={signOut}
        candidateName={candidateName}
        setCandidateName={setCandidateName}
        targetRole={targetRole}
        setTargetRole={setTargetRole}
        cvSummary={cvSummary}
        setCvSummary={setCvSummary}
        setIsInterviewStarted={setIsInterviewStarted}
      />
    );
  }

  return (
    <ActiveInterviewScreen 
      isProcessing={isProcessing}
      warningCount={warningCount}
      transcript={transcript}
      aiResponse={aiResponse}
      candidateName={candidateName}
      isListening={isListening}
      startListening={startListening}
      stopListening={stopListening}
    />
  );
}