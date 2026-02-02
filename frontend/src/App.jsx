import { useState, useRef, useEffect } from 'react';
import './App.css';

export default function App() {
  const [conversation, setConversation] = useState([{
    role: "system",
    content: "Welcome to your AI Career Advisor! How can I help?"
  }]);
  const inputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    const userInput = inputRef.current.value.trim();
    if (!userInput || isLoading) return;

    // Update UI immediately
    setConversation(prev => [...prev, { role: "user", content: userInput }]);
    inputRef.current.value = "";
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput })
      });
      
      const data = await response.json();
      setConversation(prev => [...prev, { role: "assistant", content: data.response }]);
    } catch (error) {
      setConversation(prev => [...prev, { 
        role: "assistant", 
        content: "⚠️ Failed to get response. Please try again later." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Career bud</h1>
        <p className="subtitle">Built by Auta Jesse</p>
      </header>

      <div className="chat-window">
        {conversation.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <div className="message-header">
              {msg.role === "user" ? "You" : "Career Advisor"}
            </div>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
        {isLoading && <div className="message assistant">Thinking...</div>}
      </div>

      <div className="input-area">
        <input
          ref={inputRef}
          type="text"
          placeholder="Ask about career paths..."
          disabled={isLoading}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button 
          onClick={sendMessage}
          disabled={isLoading}
        >
          {isLoading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}