import React, { useState } from "react";
import axios from "axios"; 
import "./chat.css"


const Chatbot = () => {
  const [messages, setMessages] = useState([]); 
  const [input, setInput] = useState("");

  
  const sendMessage = async () => {
    if (!input.trim()) return; 

    const userMessage = { sender: "user", text: input };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
     
      const res = await axios.post("https://chatbot-server-bs83.onrender.com/chat", { message: input });

      const botMessage = { sender: "bot", text: res.data.reply }; 

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
     
      const errorMessage = { sender: "bot", text: "Oops! Something went wrong." };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

   
    setInput("");
  };

  return (
    <div className="chatbot-container">
     
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

    
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="submit-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
