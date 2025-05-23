import React, { useState } from 'react';
import { ArrowRight, Upload, Zap, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router';

export default function Hero() {
  const [isHovered, setIsHovered] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 relative overflow-hidden">
      {/* Background Pattern */}

      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          
         
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight">
            Transform Your
            <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Digital Experience
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-slate-300 mb-4 max-w-4xl mx-auto leading-relaxed">
            The most powerful platform to create, manage, and scale your projects
          </p>
          
          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
            Join thousands of creators who trust our platform to bring their ideas to life. 
            Start your journey today with our intuitive tools and advanced features.
          </p>

          {/* Features List */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-slate-300">
            {['AI-Powered', 'Lightning Fast', 'Secure & Reliable', 'Free to Start'].map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            
            {/* Primary CTA - Try Free */}
            <Link to='/upload'
              onMouseEnter={() => setIsHovered('primary')}
              onMouseLeave={() => setIsHovered('')}
              className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:scale-105 transition-all duration-300 min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center gap-3">
                <Zap className="w-6 h-6" />
                <span>Try Free Now</span>
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isHovered === 'primary' ? 'translate-x-1' : ''}`} />
              </div>
            </Link>

            {/* Secondary CTA - Upload Now */}
            <button
              onMouseEnter={() => setIsHovered('secondary')}
              onMouseLeave={() => setIsHovered('')}
              className="group relative px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 border-2 border-slate-600 hover:border-slate-500 text-white font-bold text-lg rounded-2xl backdrop-blur-sm transform hover:scale-105 transition-all duration-300 min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-slate-600/20 to-slate-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center gap-3">
                <Upload className="w-6 h-6" />
                <span>Upload Now</span>
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isHovered === 'secondary' ? 'translate-x-1' : ''}`} />
              </div>
            </button>
          </div>

      

        </div>
      </div>

  
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </div>
  );
}