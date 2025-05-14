import React, { useEffect, useRef, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import Tessaract from "./Tessaract";
import { useForm } from "react-hook-form";
import { createWorker } from "tesseract.js";

const PromptGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [conversation, setConversation] = useState([]);
  const [ocrStatus, setOcrStatus] = useState("");
//   setOcrStatus("Processing image with OCR...");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
//   console.log(prompt);
  // Auto-scroll to bottom when conversation updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  // Focus input field when component loads
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    let ocrText = "";
    const hasText = data.text?.trim();
    const hasImage = data.image && data.image.length > 0;

    try {
      // 🚫 If both are filled OR both are empty
      if (!hasText && !hasImage) {
        setError(
          "⚠️ Please provide at least one input: either a question or an image"
        );
        setLoading(false);
        return;
      }

      // 🧠 Use image OCR if only image is provided
      if (hasImage) {
          const worker = await createWorker("eng");
        // const worker = await createWorker({
        //   langPath: "https://tessdata.projectnaptha.com/4.0.0",
        //   logger: (m) => {
        //     console.log(m);
        //     // if (m.status === "recognizing text") {
        //     //   setOcrStatus(`OCR progress: ${Math.round(m.progress * 100)}%`);
        //     // }
        //   },
        // });
        // await worker.loadLanguage("eng");
        // await worker.initialize("eng");
        await worker.setParameters({
          tessedit_ocr_engine_mode: 3, // Legacy + LSTM mode for better accuracy
          preserve_interword_spaces: "1",
          tessedit_pageseg_mode: "6", // Assume a single uniform block of text
          tessedit_char_whitelist:
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,;:!?@#$%^&*()-_+=[]{}|'\"\\/><~` ",
        });
        //   const ret = await worker.recognize(data.image[0]);
        const imgFile = data.image[0];
        const imgUrl = URL.createObjectURL(imgFile);

        // Recognize with image preprocessing options
        const ret = await worker.recognize(imgUrl, {
          rotateAuto: true,
          rotateOutput: true,
        });
        ocrText = ret.data.text.trim();
        URL.revokeObjectURL(imgUrl);
        await worker.terminate();

        if (!ocrText) {
          setError("⚠️ No text could be extracted from the image.");
          setLoading(false);
          return;
        }
      }

      const finalPrompt = hasText ? data.text.trim() : ocrText;

      // Add user input to chat
      setConversation((prev) => [
        ...prev,
        { role: "user", content: finalPrompt },
      ]);

      // Call Gemini
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API });
      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `${finalPrompt} , give me ans of the qeestions and explain in bangla`,
      });

      const aiText = result.text || "⚠️ No response from Gemini.";
      setConversation((prev) => [...prev, { role: "ai", content: aiText }]);

      reset();
    } catch (err) {
      console.error(err);
      setError("❌ Failed to get response. Check API key or connection.");
    } finally {
      setLoading(false);
    }
  };

  //   const handleKeyDown = (e) => {
  //     if (e.key === 'Enter' && !e.shiftKey) {
  //       e.preventDefault();
  //       sendPrompt();
  //     }
  //   };
  //  const onSubmit = async (data) => {
  //     const userPrompt = data.text?.trim();
  //     // if (!userPrompt) return;

  //     if (data.image.length > 0) {
  //          const worker = await createWorker('eng');
  //           const ret = await worker.recognize(data.image[0]);
  //           console.log(ret.data.text);
  //           if (ret.data.text) {

  //             setPrompt(ret.data.text)
  //           }
  //           await worker.terminate();
  //     }

  //     try {
  //       setLoading(true);
  //       setError("");

  //       // Add user input to chat
  //       setConversation((prev) => [...prev, { role: "user", content: prompt }]);

  //       // Call Gemini
  //       const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API });
  //       const result = await ai.models.generateContent({
  //         model: "gemini-2.0-flash",
  //         contents: prompt,
  //       });

  //       const aiText = result.text || "⚠️ No response from Gemini.";
  //       setConversation((prev) => [...prev, { role: "ai", content: aiText }]);

  //       reset(); // Clear input
  //     } catch (err) {
  //       console.error(err);
  //       setError("❌ Failed to get response. Check API key or connection.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 shadow-md">
        <h1 className="text-xl font-bold text-white flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          Gemini Chat Interface
        </h1>
      </div>

      {/* Conversation area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <p className="text-center max-w-md">
              Start a conversation with Gemini AI. Type your message below and
              press enter.
            </p>
          </div>
        ) : (
          conversation.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white shadow-md rounded-bl-none"
                }`}
              >
                {message.role === "ai" && (
                  <div className="flex text-blue-600 text-sm font-semibold mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    Gemini AI
                  </div>
                )}
                <div
                  className={`${
                    message.role === "user" ? "text-white" : "text-gray-800"
                  } whitespace-pre-wrap`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-lg p-4 shadow-md flex items-center space-x-2 text-gray-600">
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0s" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
              <span>Gemini is thinking...</span>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="flex justify-center">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex">
                <svg
                  className="h-5 w-5 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="ml-2 text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      {/* <div className="border-t border-gray-200 bg-white p-4">
        <div className="max-w-4xl mx-auto flex items-end space-x-2">
          <div className="flex-1 relative">
      
            <textarea
              ref={inputRef}
              className="w-full border border-gray-300 rounded-lg py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Type your message..."
              rows={1}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ 
                minHeight: "56px", 
                maxHeight: "150px",
                height: "auto"
              }}
            />
            <button
              onClick={sendPrompt}
              disabled={loading || !prompt.trim()}
              className={`absolute right-3 bottom-3 rounded-full p-1 ${
                loading || !prompt.trim() ? "text-gray-400" : "text-blue-600 hover:bg-blue-100"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 border-t flex flex-col gap-2"
      >
        <textarea
          {...register("text")}
          accept="image/*"
          capture="environment"
          className="border p-3 rounded w-full resize-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your question or extracted text here..."
          rows={2}
        />

        <div className="flex items-center justify-between">
          <input type="file" {...register("image")} />
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default PromptGenerator;
