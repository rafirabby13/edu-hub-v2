/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { Send, Trash2, Sparkles, MessageCircle, Bot, User, BarChart2, Mic, Plus } from 'lucide-react';
import { createWorker } from "tesseract.js";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Chat = () => {
    const { register, handleSubmit, reset } = useForm();
    // const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [image, setImage] = useState(null);
    const [extractedText, setExtractedText] = useState('');
    const fileInputRef = useRef(null);
    const messagesEndRef = useRef(null);
    // const textareaRef = useRef(null);
    // const axiosSecure = useAxiosSecure()

    const messagesContainerRef = useRef(null);

    const axiosSecure = useAxiosSecure()


    // Remove selected image
    const removeImage = () => {
        setImage(null);
        setExtractedText('');

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
        setError("");

        let ocrText = "";
        const hasText = data.text?.trim();
        const hasImage = data.image && data.image.length > 0;
        // console.log(data)
        try {
            if (!hasText && !hasImage) {
                setError(
                    "⚠️ Please provide at least one input: either a question or an image"
                );
                setLoading(false);
                return;
            }
            if (hasImage) {
                const worker = await createWorker("eng");

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
            let combinedPrompt = '';

            if (hasText) {
                combinedPrompt += hasText;
            }

            if (ocrText) {
                if (hasText) {
                    combinedPrompt += '\n\n--- Text extracted from image ---\n';
                }
                combinedPrompt += ocrText;
            }
            const userMessage = {
                role: 'user',
                content: combinedPrompt,
                timestamp: new Date(),
                hasImage: !!image,
                imageName: image?.name,
                extractedText: ocrText
            };

            setMessages(prev => [...prev, userMessage]);
            const currentInput = userMessage.content;
            // console.log(currentInput)
            // setInput('');
            setLoading(true);
            setError('');
            // Clear image after sending
            removeImage();

            try {
                // Simulated API call - replace with your actual endpoint
                // const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/prompt-message`, { input: currentInput }, {withCredentials: true});
                const res = await axiosSecure.post("/prompt-message",{ input: currentInput })

                if (!res) throw new Error('Failed to send message');


                const aiMessage = {
                    role: 'assistant',
                    content: res?.data?.data?.response || 'Sorry, I couldn\'t process that request.',
                    timestamp: new Date()
                };

                setMessages(prev => [...prev, aiMessage]);
                reset()
            } catch (err) {
                setError('Failed to send message. Please try again.');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }

        } catch (err) {
            console.error(err);
            setError("❌ Failed to get response. Check API key or connection.");
        } finally {
            setLoading(false);
            //   setResponseCount(responseCount + 1);

        }
    }


    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            // sendMessage();
        }
    };




    const formatTime = (timestamp) => {
        return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className=" bg-gradient-to-br from-indigo-50 via-white to-purple-50 ">
            <div className=" mx-auto  flex flex-col ">


                {/* Messages Area */}
                <div className="absolute top-20 bottom-0 left-0 right-0 xl:left-96 xl:right-96 bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl  overflow-hidden flex flex-col">
                    <div
                        ref={messagesContainerRef}
                        className="flex-1 overflow-y-auto p-6 space-y-4"
                    >
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <div className="w-20 h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
                                    <Bot className="w-10 h-10 text-indigo-500" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Welcome t AI Chat</h3>
                                <p className="text-gray-500 max-w-md">
                                    Start a conversation by typing a message below. I can respond in both English and বাংলা.
                                </p>
                            </div>
                        ) : (
                            <>
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-start space-x-3 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                                            }`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user'
                                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600'
                                            : 'bg-gradient-to-r from-gray-400 to-gray-600'
                                            }`}>
                                            {message.role === 'user' ? (
                                                <User className="w-4 h-4 text-white" />
                                            ) : (
                                                <Bot className="w-4 h-4 text-white" />
                                            )}
                                        </div>

                                        <div className={`flex flex-col max-w-2xl ${message.role === 'user' ? 'items-end' : 'items-start'
                                            }`}>
                                            <div className={`px-4 py-3 rounded-2xl shadow-lg ${message.role === 'user'
                                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                                                : 'bg-white border border-gray-200 text-gray-800'
                                                }`}>
                                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                            </div>
                                            <span className="text-xs text-gray-400 mt-1 px-2">
                                                {formatTime(message.timestamp)}
                                            </span>
                                        </div>
                                    </div>
                                ))}

                                {loading && (
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center">
                                            <Bot className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-lg">
                                            <div className="flex space-x-2">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </>
                        )}
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="mx-6 mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-red-700 text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {/* Input Area */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="border-t border-gray-200 p-1">
                            <div className=" space-x-4 items-end">
                                <div className="flex-1 relative">

                                    <textarea
                                        {...register("text")}




                                        onKeyPress={handleKeyPress}
                                        placeholder="Type your message here... "
                                        className="w-full p-4 pr-12 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                                        rows="3"
                                        disabled={loading}
                                        style={{ minHeight: '60px', maxHeight: '120px' }}
                                    />


                                    <div className='flex items-center justify-between absolute bottom-2 right-0 left-0 rounded-2xl bg-amber-100/10'>
                                        <input
                                            {...register("image")}
                                            type="file"
                                            className="file-input file-input-ghost rounded-2xl  file-input-accent"

                                        />

                                        <button
                                            type='submit'

                                            disabled={loading}
                                            className="group relative flex-shrink-0 px-4 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-800 disabled:from-gray-300 disabled:via-gray-400 disabled:to-gray-300 disabled:cursor-not-allowed text-white rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-xl hover:shadow-2xl flex items-centerjustify-center overflow-hidden"
                                        >




                                            <div className="relative flex items-center  ">
                                                {loading ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        <span className="font-semibold text-sm">Sending</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />

                                                        {/* <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
                                                    </>
                                                )}
                                            </div>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>

    );
};

export default Chat;