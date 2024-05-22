"use client"
import { useRouter } from 'next/navigation'; // Correct import from 'next/router'
import React from 'react';

export default function Widget() {
  const router = useRouter();
  

  const handleStartChatting = () => {
    router.push('/bot/hello');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-sm mx-auto w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="space-x-2 mt-2 md:mt-0">
          </div>
        </div>
        <img src="/img.png" alt="Welcome Illustration" className={`w-full mb-6 rounded-[2rem] image-without-background`} />
        <h1 className="text-3xl font-bold text-center mb-2">Welcome to AI Chatbot</h1>
        <p className="text-zinc-400 text-center mb-8">
          Lorem Ipsum is simply dummy text of the printing and
        </p>
        <button onClick={handleStartChatting} className={`start-chatting-button`}>
          Start Chatting
        </button>
        <button className="text-zinc-400 px-[6rem] text-center">
          View Terms & Conditions
        </button>
      </div>
    </div>
  );
}