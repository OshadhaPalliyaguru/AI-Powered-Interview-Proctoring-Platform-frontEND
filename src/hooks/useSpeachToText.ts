// hooks/useSpeechToText.ts
import { useState, useEffect, useRef } from 'react';

export const useSpeechToText = () => {
  
  const [transcript, setTranscript] = useState('');
 
  const [isListening, setIsListening] = useState(false);
  
  const recognitionRef = useRef<any>(null);

  
  useEffect(() => {
   
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true; 

     
      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript); 
      };

      recognitionRef.current = recognition;
    }
  }, []);

  
  const startListening = () => {
    setTranscript(''); 
    setIsListening(true);
    recognitionRef.current?.start();
  };

  
  const stopListening = () => {
    setIsListening(false);
    recognitionRef.current?.stop();
  };

  
  return { transcript, isListening, startListening, stopListening };
};