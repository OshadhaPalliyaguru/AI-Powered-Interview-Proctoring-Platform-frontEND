import React from 'react';

interface LobbyScreenProps {
  state: any;
  signIn: () => void;
  signOut: () => void;
  candidateName: string;
  setCandidateName: (name: string) => void;
  targetRole: string;
  setTargetRole: (role: string) => void;
  cvSummary: string;
  setCvSummary: (cv: string) => void;
  setIsInterviewStarted: (started: boolean) => void;
}

export default function LobbyScreen({
  state,
  signIn,
  signOut,
  candidateName,
  setCandidateName,
  targetRole,
  setTargetRole,
  cvSummary,
  setCvSummary,
  setIsInterviewStarted
}: LobbyScreenProps) {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-2xl max-w-xl w-full">
        
        {/* System eka load wena welaawa */}
        {state.isLoading && (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-cyan-400">Checking Authentication...</p>
          </div>
        )}

        {/* Login Wela Naththam (Login Button Eka) */}
        {!state.isLoading && !state.isAuthenticated && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-cyan-900/50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-cyan-500/30">
              <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">AI Interviewer</h1>
            <p className="text-gray-400 mb-8">Enterprise-grade technical screening.</p>
            <button 
              onClick={() => signIn()}
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-[0_0_15px_rgba(8,145,178,0.5)]"
            >
              Login with WSO2 Asgardeo
            </button>
          </div>
        )}

      
        {!state.isLoading && state.isAuthenticated && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
               <div>
                  <h1 className="text-2xl font-bold text-cyan-400">Setup Interview</h1>
                
                  <p className="text-gray-400 text-sm">Logged in as {state.username}</p>
               </div>
               <button 
                 onClick={() => signOut()} 
                 className="text-red-400 hover:text-red-300 text-sm font-medium px-3 py-1 bg-red-400/10 rounded-md transition-all"
               >
                 Logout
               </button>
            </div>
            
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Your Name</label>
              <input 
                type="text" 
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 focus:border-cyan-400 focus:outline-none"
                placeholder="e.g. KD Oshadha"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Target Role</label>
              <input 
                type="text" 
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 focus:border-cyan-400 focus:outline-none"
                placeholder="e.g. Frontend Developer"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-1 block">Paste CV / Skills Summary</label>
              <textarea 
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 h-32 focus:border-cyan-400 focus:outline-none"
                placeholder="e.g. I have 2 years of experience..."
                value={cvSummary}
                onChange={(e) => setCvSummary(e.target.value)}
              />
            </div>

            <button 
              onClick={() => setIsInterviewStarted(true)}
              disabled={!candidateName || !cvSummary}
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg mt-6 transition-all disabled:opacity-50"
            >
              Enter Interview Room
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
