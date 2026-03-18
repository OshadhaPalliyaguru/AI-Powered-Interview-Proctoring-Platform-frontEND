
export const sendToAI = async (message: string) => {
  try {
    
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
     
      body: JSON.stringify({ message }), 
    });

    const data = await response.json();
    return data.reply; 
    
  } catch (error) {
    console.error("AI ekata call karaddi awulak:", error);
    return "Sorry machan, connection error ekak.";
  }
};