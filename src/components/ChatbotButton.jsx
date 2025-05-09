import React, { useState } from 'react';
import { Bot } from 'lucide-react';

function ChatbotButton({ isPurchased, courseId, courseTitle }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    if (isPurchased) {
      setIsOpen(!isOpen);
    } else {
      alert("AI assistance is only available after purchasing the course.");
    }
  };

  return (
    <>
      <button
        onClick={toggleChatbot}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-10 transition-colors ${isPurchased ? 'bg-white hover:bg-gray-100' : 'bg-gray-200'}`}
        disabled={!isPurchased}
        title={isPurchased ? "Open AI Assistant" : "Purchase course to access AI assistance"}
      >
        <Bot size={24} className={isPurchased ? 'text-red-400' : 'text-gray-400'} />
      </button>

      {isOpen && isPurchased && (
        <ChatbotDialog
          onClose={() => setIsOpen(false)}
          courseId={courseId}
          courseTitle={courseTitle}
        />
      )}
    </>
  );
}

function ChatbotDialog({ onClose, courseId, courseTitle }) {
  const [messages, setMessages] = useState([
    { role: 'bot', content: `Hi! Welcome to BotPenguin. I'll be assisting you here today.` },
    { role: 'bot', content: `How can I help you today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Send the message to the backend (AI)
      const response = await fetch('http://localhost:5000/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [
          ...prev,
          { role: 'bot', content: data.answer }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          { role: 'bot', content: 'Sorry, something went wrong. Please try again later.' }
        ]);
      }
    } catch (error) {
      console.error('Error communicating with AI backend:', error);
      setMessages(prev => [
        ...prev,
        { role: 'bot', content: 'An error occurred while processing your request.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 w-80 md:w-96 h-140 bg-white rounded-lg shadow-xl z-20 flex flex-col overflow-hidden">
      <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-white rounded-full p-1 mr-2">
            <Bot size={20} className="text-blue-500" />
          </div>
          <h3 className="font-medium">BotPenguin</h3>
        </div>
        <div className="flex items-center">
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.role === 'bot' && (
              <div className="bg-gray-200 rounded-full p-2 mr-2">
                <Bot size={16} />
              </div>
            )}
            <div className={`rounded-lg px-4 py-2 max-w-3/4 ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-200 rounded-full p-2 mr-2">
              <Bot size={16} />
            </div>
            <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-2 border-t border-gray-200 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600" disabled={!input.trim() || isLoading}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
}

export default ChatbotButton;
