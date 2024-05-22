"use client";
import React, { useState, useEffect, useRef } from 'react';
import UilChat from '../../../public/chat.svg';
import histroy from "../../../public/history.svg";
import send from "../../../public/message.svg";
import Image from 'next/image';

export default function Widget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  // Sample question and answer dataset
  const qaDataset = [
    { question: "hello", answer: "Hi! How can I help you today?" },
    { question: "how are you", answer: "I'm an AI, so I don't have feelings, but thanks for asking!" },
    { question: "what is your name", answer: "I am Chat AI, your virtual assistant." },
    { question: "tell me a joke", answer: "Why don't scientists trust atoms? Because they make up everything!" },
    { question: "what is the weather today", answer: "I can't check the weather right now, but you can find it on a weather website or app!" },
  ];

  const suggestions = [
    "hello",
    "how are you",
    "what is your name",
    "tell me a joke",
    "what is the weather today"
  ];

  const findAnswer = (question) => {
    const result = qaDataset.find(qa => qa.question.toLowerCase() === question.toLowerCase());
    return result ? result.answer : "I'm not sure how to respond to that.";
  };

  const handleSend = () => {
    if (input.trim()) {
      const newMessages = [...messages, { type: 'user', text: input }];
      setMessages(newMessages);
      setInput("");

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = findAnswer(input);
        setMessages(prevMessages => [...prevMessages, { type: 'ai', text: aiResponse }]);
      }, 1000);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const newMessages = [...messages, { type: 'user', text: suggestion }];
    setMessages(newMessages);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = findAnswer(suggestion);
      setMessages(prevMessages => [...prevMessages, { type: 'ai', text: aiResponse }]);
    }, 1000);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-blue-300 text-black min-h-screen flex flex-col">
      <style jsx global>{`
        .underline-hover {
          position: relative;
          overflow: hidden;
        }

        .underline-hover::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: currentColor;
          transform: scaleX(0);
          transform-origin: bottom right;
          transition: transform 0.25s ease-out;
        }

        .underline-hover:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
      `}</style>
      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold">Chat AI</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-around my-4">
          <button className="flex flex-col w-20 items-center mb-2 md:mb-0 hover:text-white cursor-pointer underline-hover">
            <Image src={UilChat} alt="Chat Icon" className='pt-[.7rem]' />
            <span>Chat</span>
          </button>
          <button className="flex flex-col items-center mb-2 h-20 w-20 md:mb-0 hover:text-white cursor-pointer underline-hover">
            <Image src={histroy} alt="History Icon" className='pt-[.7rem]' />
            <span>History</span>
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 max-h-[calc(100vh-320px)]">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Suggestions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-4 border-2 border-black rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white transition-colors"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 my-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${message.type === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'}`}
            >
              {message.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 bg-blue-300 fixed bottom-0 inset-x-0">
        <div className="flex items-center mt-4">
          <input
            type="text"
            placeholder="Ask AI chat anything"
            className="flex-1 p-4 placeholder:text-black rounded-l-lg"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button className="bg-blue-600 p-2 h-14 w-14 rounded-r-lg" onClick={handleSend}>
            <Image src={send} alt="Send Icon" className='pl-2 h-8 w-8' />
          </button>
        </div>
      </div>
    </div>
  );
}
