"use client";
import { motion } from 'framer-motion';

interface AudioVisualizerProps {
    isListening: boolean;
}

export default function AudioVisualizer({ isListening }: AudioVisualizerProps) {
    return(
        <div className="flex flex-col items-center justify-center z-10 w-full h-full">
            <motion.div
            animate={{
                scale: isListening ? [1, 1.3, 1] : 1,
                opacity: isListening ? [0.6, 1, 0.6] : 0.3,
            }}
            transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
            }}
            className={`absolute w-40 h-40 rounded-full blur-2xl transition-colors duration-500 ${isListening ? 'bg-cyan-500' : 'bg-gray-600'}`}

            />

            <motion.div
            animate={{
                scale: isListening ? [1, 1.05, 1] : 1,

            }}
            transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
            }}
            className={`w-32 h-32 rounded-full z-10 flex items-center justify-center shadow-2xl transition-colors duration-500 ${isListening ? 'bg-gradient-to-br from-cyan-400 to-blue-600' : 'bg-gray-700'}`}
           >
            <div className="w-16 h-16 bg-white/20 rounded-full blur-md" />
           </motion.div>


        <p className="mt-12 text-gray-400 font-medium text-lg tracking-wide z-10 transition-all">
        {isListening ? "AI Interviewer is listening..." : "AI Interviewer is ready"}
      </p>


        </div>
    )

}