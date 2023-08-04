import React, { useState } from 'react';
import Header from '../../components/Header';
import { FaEye, FaEyeSlash, FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';

const ApiKeys = () => {
  const [showOpenAIApiKey, setShowOpenAIApiKey] = useState(false);
  const [showElevenLabsApiKey, setShowElevenLabsApiKey] = useState(false);
  const [showGoogleSearchApiKey, setShowGoogleSearchApiKey] = useState(false);
  const [showCseId, setShowCseId] = useState(false);

  const handleSaveKeys = async () => {
    const data = {
      openAIApiKey,
      elevenLabsApiKey,
      googleSearchApiKey,
      cseId,
    };

    try {
      const response = await fetch('/api/key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save API keys');
      }

      console.log('API Keys Saved!');
    } catch (error) {
      console.error('Error saving API keys:', error);
    }
  };


  return (
    <div className="bg-background min-h-screen flex flex-col justify-center pb-6">
      <Header />

      <div className="mx-auto max-w-xl p-8 mt-8 bg-white rounded shadow-lg">
        <h2 className="text-3xl font-semibold mb-4">Enter Your API Keys</h2>
        <p className="text-gray-700 mb-8">
          By providing your API key, you agree to be solely responsible for its security and usage. We will not disclose
          your API key to third parties without your consent.
        </p>

        <div className="mb-4">
          <Link target="_blank" href="https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key">
            <div className="flex items-center mb-2 cursor-pointer">
              <div className="text-xl font-semibold text-black">OpenAI API Key</div>
              <span className="ml-2 text-gray-500">
                <FaExternalLinkAlt />
              </span>
            </div>
          </Link>
          <div className="relative border-2 border-primary-300 rounded min-w-20">
            <input
              type={showOpenAIApiKey ? 'text' : 'password'}
              placeholder="Enter OpenAI API Key"
              className="w-full border rounded px-4 py-2 text-gray-700 bg-white"
            />
            <span
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowOpenAIApiKey(!showOpenAIApiKey)}
            >
              {showOpenAIApiKey ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <Link target="_blank" href="https://docs.elevenlabs.io/api-reference/quick-start/authentication">
            <div className="flex items-center mb-2 cursor-pointer">
              <div className="text-xl font-semibold text-black">ElevenLabs API Key</div>
              <span className="ml-2 text-gray-500">
                <FaExternalLinkAlt />
              </span>
            </div>
          </Link>
          <div className="relative border-2 border-primary-300 rounded min-w-20">
            <input
              type={showElevenLabsApiKey ? 'text' : 'password'}
              placeholder="Enter ElevenLabs API Key"
              className="w-full border rounded px-4 py-2 text-gray-700 bg-white"
            />
            <span
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowElevenLabsApiKey(!showElevenLabsApiKey)}
            >
              {showElevenLabsApiKey ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <Link target="_blank" href="https://developers.google.com/custom-search/v1/introduction">
            <div className="flex items-center mb-2 cursor-pointer">
              <div className="text-xl font-semibold text-black">Google Search API Key</div>
              <span className="ml-2 text-gray-500">
                <FaExternalLinkAlt />
              </span>
            </div>
          </Link>
          <div className="relative border-2 border-primary-300 rounded min-w-20">
            <input
              type={showGoogleSearchApiKey ? 'text' : 'password'}
              placeholder="Enter Google Search API Key"
              className="w-full border rounded px-4 py-2 text-gray-700 bg-white"
            />
            <span
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowGoogleSearchApiKey(!showGoogleSearchApiKey)}
            >
              {showGoogleSearchApiKey ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <Link target="_blank" href="https://developers.google.com/custom-search/v1/introduction">
            <div className="flex items-center mb-2 cursor-pointer">
              <div className="text-xl font-semibold text-black">CSE ID</div>
              <span className="ml-2 text-gray-500">
                <FaExternalLinkAlt />
              </span>
            </div>
          </Link>
          <div className="relative border-2 border-primary-300 rounded min-w-20">
            <input
              type={showCseId ? 'text' : 'password'}
              placeholder="Enter CSE ID"
              className="w-full border rounded px-4 py-2 text-gray-700 bg-white"
            />
            <span
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowCseId(!showCseId)}
            >
              {showCseId ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
            </span>
          </div>
              </div>
              <div className="flex justify-center">
                  <button
                      type="button"
                      onClick={handleSaveKeys}
                      className="cursor-pointer transition-all text-white bg-gradient-to-br from-secondaryAccent to-accent hover:shadow-xl hover:shadow-primary hover:scale-105 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 disabled:opacity-50"
                  >
                      Save Keys
                  </button>
              </div>
          </div>
    </div>
  );
};

export default ApiKeys;
