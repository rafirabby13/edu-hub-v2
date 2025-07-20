import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, User, Tag } from 'lucide-react';

const BlogSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('সকল');

  const blogPosts = [
    {
      id: 1,
      title: "ইংরেজি শেখার নতুন পদ্ধতি: AI এর সাহায্যে",
      excerpt: "কৃত্রিম বুদ্ধিমত্তা কীভাবে ইংরেজি শেখার ক্ষেত্রে বিপ্লব এনেছে এবং কীভাবে এটি আপনার পড়াশোনায় সাহায্য করতে পারে।",
      category: "শিক্ষা",
      author: "BanglaySolve টিম",
      date: "২৫ মে, ২০২৫",
      readTime: "৫ মিনিট",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Grammar এ দুর্বল? এই টিপস ফলো করুন",
      excerpt: "ইংরেজি গ্রামারে দক্ষতা বৃদ্ধির জন্য কার্যকর টিপস এবং কৌশল যা আপনার পরীক্ষার ফলাফল উন্নত করবে।",
      category: "টিপস",
      author: "শিক্ষা বিশেষজ্ঞ",
      date: "২০ মে, ২০২৫",
      readTime: "৭ মিনিট",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "পরীক্ষার আগে যা করবেন: সফলতার গোপন সূত্র",
      excerpt: "পরীক্ষার প্রস্তুতি নেওয়ার সময় কোন বিষয়গুলো মাথায় রাখতে হবে এবং কীভাবে সময় ব্যবস্থাপনা করবেন।",
      category: "পরামর্শ",
      author: "BanglaySolve টিম",
      date: "১৮ মে, ২০২৫",
      readTime: "৬ মিনিট",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "BanglaySolve এর নতুন ফিচার সমূহ",
      excerpt: "আমাদের প্ল্যাটফর্মে যোগ হওয়া নতুন সুবিধাগুলো সম্পর্কে জানুন যা আপনার পড়াশোনাকে আরো সহজ করে তুলবে।",
      category: "আপডেট",
      author: "ডেভেলপমেন্ট টিম",
      date: "১৫ মে, ২০২৫",
      readTime: "৪ মিনিট",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center"
    },
    {
      id: 5,
      title: "ছাত্রদের সফলতার গল্প: অনুপ্রেরণামূলক অভিজ্ঞতা",
      excerpt: "BanglaySolve ব্যবহার করে কীভাবে শিক্ষার্থীরা তাদের পরীক্ষায় ভালো ফলাফল অর্জন করেছে তার বাস্তব গল্প।",
      category: "সফলতার গল্প",
      author: "কমিউনিটি ম্যানেজার",
      date: "১২ মে, ২০২৫",
      readTime: "৮ মিনিট",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop&crop=center"
    },
    {
      id: 6,
      title: "শিক্ষক ও অভিভাবকদের জন্য গাইড",
      excerpt: "কীভাবে শিক্ষক ও অভিভাবকরা BanglaySolve ব্যবহার করে শিক্ষার্থীদের সাহায্য করতে পারেন।",
      category: "গাইড",
      author: "শিক্ষা পরামর্শদাতা",
      date: "১০ মে, ২০২৫",
      readTime: "১০ মিনিট",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=250&fit=crop&crop=center"
    }
  ];

  const categories = ['সকল', 'শিক্ষা', 'টিপস', 'পরামর্শ', 'আপডেট', 'সফলতার গল্প', 'গাইড'];

  const filteredPosts = selectedCategory === 'সকল' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            আমাদের 
            <span className="text-emerald-400"> ব্লগ</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            শিক্ষা, প্রযুক্তি এবং সফলতার গল্প - সবকিছু এক জায়গায়
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl border border-emerald-500/20 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    ফিচার্ড
                  </span>
                  <span className="text-emerald-400 font-medium">{blogPosts[0].category}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  {blogPosts[0].title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{blogPosts[0].author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{blogPosts[0].date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{blogPosts[0].readTime} পড়তে</span>
                  </div>
                </div>
                <button className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
                  <span>পুরো পড়ুন</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="relative">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-64 md:h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post) => (
            <div
              key={post.id}
              className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-emerald-500 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-emerald-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 hover:text-emerald-400 transition-colors cursor-pointer">
                  {post.title}
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <button className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center space-x-1 transition-colors">
                    <span>পড়ুন</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-8 py-3 rounded-lg border border-slate-700 hover:border-emerald-500 transition-all duration-200 inline-flex items-center space-x-2">
            <span>আরও পোস্ট দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl border border-emerald-500/20 p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            নিয়মিত আপডেট পেতে চান?
          </h3>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            আমাদের নিউজলেটার সাবস্ক্রাইব করুন এবং নতুন ব্লগ পোস্ট ও টিপস সরাসরি ইমেইলে পান
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="আপনার ইমেইল ঠিকানা"
              className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
            />
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
              সাবস্ক্রাইব করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;