import React, { useState } from "react";
import Header from "../../components/Header";
import { FaEye, FaEyeSlash, FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

const ApiKeys = () => {
  const [showOpenAIApiKey, setShowOpenAIApiKey] = useState(false);
  const [showElevenLabsApiKey, setShowElevenLabsApiKey] = useState(false);
  const [showGoogleSearchApiKey, setShowGoogleSearchApiKey] = useState(false);
  const [showCseId, setShowCseId] = useState(false);
  const [openAIApiKey, setOpenAIApiKey] = useState(undefined);
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState(undefined);
  const [googleSearchApiKey, setGoogleSearchApiKey] = useState(undefined);
  const [cseId, setCseId] = useState(undefined);

  const getKeys = async () => {
    return axios.get("/api/key");
  };

  const apiKeysQuery = useQuery(["apiKeys"], {
    queryFn: getKeys,
    onSuccess: (data) => {
      const {
        OPENAI_API_KEY: storedOpenaiApiKey,
        CSE_ID: storedCseId,
        ELEVEN_LABS_API_KEY: storedElevenLabsApiKey,
        GOOGLE_SEARCH_API_KEY: storedGoogleSearchApiKey,
      } = data?.data || {
        OPENAI_API_KEY: undefined,
        CSE_ID: undefined,
        ELEVEN_LABS_API_KEY: undefined,
        GOOGLE_SEARCH_API_KEY: undefined,
      };
      setOpenAIApiKey(storedOpenaiApiKey);
      setCseId(storedCseId);
      setElevenLabsApiKey(storedElevenLabsApiKey);
      setGoogleSearchApiKey(storedGoogleSearchApiKey);
    },
  });

  const {
    OPENAI_API_KEY: storedOpenaiApiKey,
    CSE_ID: storedCseId,
    ELEVEN_LABS_API_KEY: storedElevenLabsApiKey,
    GOOGLE_SEARCH_API_KEY: storedGoogleSearchApiKey,
  } = apiKeysQuery?.data?.data || {
    OPENAI_API_KEY: undefined,
    CSE_ID: undefined,
    ELEVEN_LABS_API_KEY: undefined,
    GOOGLE_SEARCH_API_KEY: undefined,
  };

  const handleSaveKeys = async () => {
    const data = {
      openAIApiKey,
      elevenLabsApiKey,
      googleSearchApiKey,
      cseId,
    };
    return fetch("/api/key", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  const saveKeysMutation = useMutation({
    mutationFn: handleSaveKeys,
  });

  return (
    <div className="bg-background min-h-screen flex flex-col justify-center pb-6">
      <Header />

      <div className="mx-auto max-w-xl p-8 mt-8 bg-white rounded shadow-lg">
        <h2 className="text-3xl font-semibold mb-4">Enter Your API Keys</h2>
        <p className="text-gray-700 mb-8">
          By providing your API key, you agree to be solely responsible for its security and usage. We will not disclose
          your API key to third parties without your consent.
        </p>
        {apiKeysQuery.isLoading ? (
          <p>Loading</p>
        ) : (
          <>
            <div className="mb-4">
              <Link
                target="_blank"
                href="https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key"
              >
                <div className="flex items-center mb-2 cursor-pointer">
                  <div className="text-xl font-semibold text-black">OpenAI API Key</div>
                  <span className="ml-2 text-gray-500">
                    <FaExternalLinkAlt />
                  </span>
                </div>
              </Link>
              <div className="relative border-2 border-primary-300 rounded min-w-20 pr-6">
                <input
                  type={showOpenAIApiKey ? "text" : "password"}
                  placeholder="Enter OpenAI API Key"
                  className="w-full focus:outline-none rounded px-4 py-2 text-gray-700 bg-white"
                  defaultValue={storedOpenaiApiKey}
                  value={openAIApiKey}
                  onChange={(e) => setOpenAIApiKey(e.target.value)}
                />
                <span
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowOpenAIApiKey(!showOpenAIApiKey)}
                >
                  {showOpenAIApiKey ? (
                    <FaEyeSlash className="text-gray-500 bg-white h-full" />
                  ) : (
                    <FaEye className="text-gray-500 bg-white h-full" />
                  )}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <Link target="_blank" href="https://docs.elevenlabs.io/api-reference/quick-start/authentication">
                <div className="flex items-center mb-2 cursor-pointer">
                  <div className="text-xl font-semibold text-black">ElevenLabs API Key (Optional)</div>
                  <span className="ml-2 text-gray-500">
                    <FaExternalLinkAlt />
                  </span>
                </div>
              </Link>
              <div className="relative border-2 border-primary-300 rounded min-w-20 pr-6">
                <input
                  type={showElevenLabsApiKey ? "text" : "password"}
                  placeholder="Enter ElevenLabs API Key"
                  className="w-full focus:outline-none rounded px-4 py-2 text-gray-700 bg-white"
                  defaultValue={storedElevenLabsApiKey}
                  value={elevenLabsApiKey}
                  onChange={(e) => setElevenLabsApiKey(e.target.value)}
                />
                <span
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowElevenLabsApiKey(!showElevenLabsApiKey)}
                >
                  {showElevenLabsApiKey ? (
                    <FaEyeSlash className="text-gray-500 bg-white h-full" />
                  ) : (
                    <FaEye className="text-gray-500 bg-white h-full" />
                  )}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <Link target="_blank" href="https://developers.google.com/custom-search/v1/introduction">
                <div className="flex items-center mb-2 cursor-pointer">
                  <div className="text-xl font-semibold text-black">Google Search API Key (Optional)</div>
                  <span className="ml-2 text-gray-500">
                    <FaExternalLinkAlt />
                  </span>
                </div>
              </Link>
              <div className="relative border-2 border-primary-300 rounded min-w-20 pr-6">
                <input
                  type={showGoogleSearchApiKey ? "text" : "password"}
                  placeholder="Enter Google Search API Key"
                  className="w-full focus:outline-none rounded px-4 py-2 text-gray-700 bg-white"
                  defaultValue={storedGoogleSearchApiKey}
                  value={googleSearchApiKey}
                  onChange={(e) => setGoogleSearchApiKey(e.target.value)}
                />
                <span
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowGoogleSearchApiKey(!showGoogleSearchApiKey)}
                >
                  {showGoogleSearchApiKey ? (
                    <FaEyeSlash className="text-gray-500 bg-white h-full" />
                  ) : (
                    <FaEye className="text-gray-500 bg-white h-full" />
                  )}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <Link target="_blank" href="https://developers.google.com/custom-search/v1/introduction">
                <div className="flex items-center mb-2 cursor-pointer">
                  <div className="text-xl font-semibold text-black">CSE ID (Optional)</div>
                  <span className="ml-2 text-gray-500">
                    <FaExternalLinkAlt />
                  </span>
                </div>
              </Link>
              <div className="relative border-2 border-primary-300 rounded min-w-20 pr-6">
                <input
                  type={showCseId ? "text" : "password"}
                  placeholder="Enter CSE ID"
                  className="w-full focus:outline-none rounded px-4 py-2 text-gray-700 bg-white"
                  defaultValue={storedCseId}
                  value={cseId}
                  onChange={(e) => setCseId(e.target.value)}
                />
                <span
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowCseId(!showCseId)}
                >
                  {showCseId ? (
                    <FaEyeSlash className="text-gray-500 bg-white h-full" />
                  ) : (
                    <FaEye className="text-gray-500 bg-white h-full" />
                  )}
                </span>
              </div>
            </div>
          </>
        )}
        <div className="flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={() => saveKeysMutation.mutate()}
            disabled={saveKeysMutation.isLoading}
            className="cursor-pointer transition-all text-white bg-gradient-to-br from-secondaryAccent to-accent hover:shadow-xl hover:shadow-primary hover:scale-105 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 disabled:opacity-50"
          >
            Save Keys
          </button>
          {saveKeysMutation.isSuccess && <p className="text-green-500">Successfully Saved Keys!</p>}
          {saveKeysMutation.isError && <p className="text-red-500">There was an error saving keys</p>}
          {saveKeysMutation.isLoading && <p className="text-gray-500">Saving...</p>}
        </div>
      </div>
    </div>
  );
};

export default ApiKeys;
