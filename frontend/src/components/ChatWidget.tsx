import React, { useState } from 'react';
import '../assets/css/ChatWidget.css'; // You will define styles here for the widget

import ChatMini from '../pages/users/ChatMini';


const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
   
        setIsOpen(!isOpen);
      
      

  };

  return (
    <div className="chat-widget-container">
      {/* Floating Button */}
      <div className="chat-widget-button" onClick={toggleChat}>
        <i className="bi bi-chat-left-dots-fill"></i> {/* Chat icon */}
     
      </div>

      {/* Chat or Options Pop-up */}
      {isOpen && (
        <div className="chat-widget-popup">
          <ChatMini />  
          
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
