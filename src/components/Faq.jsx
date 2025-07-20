import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Faq = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = [
    {
      question: "BanglaySolve কীভাবে কাজ করে?",
      answer: "আপনি ইংরেজি প্রশ্নের ছবি আপলোড করবেন, এবং আমাদের AI সেই প্রশ্ন বিশ্লেষণ করে উত্তর ও বাংলা ব্যাখ্যা প্রদান করবে।"
    },
    {
      question: "কোন ধরণের প্রশ্ন সলভ করা যায়?",
      answer: "Fill in the blanks, multiple choice, right form of verbs, short questions, এবং paragraph টাইপ প্রশ্ন সলভ করা যায়।"
    },
    {
      question: "একটি ছবিতে একাধিক প্রশ্ন থাকলে কী হবে?",
      answer: "Banglay Solve পুরো ছবিটি স্ক্যান করে প্রতিটি প্রশ্ন আলাদা করে সলভ করবে এবং বাংলা ব্যাখ্যা সহ দেখাবে।"
    },
    {
      question: "স্ন্যাপ সীমা বলতে কী বোঝায়?",
      answer: "প্রতিটি ছবি আপলোডকে একটি \"Snap\" হিসেবে গণনা করা হয়। আপনার প্যাকেজে কয়টি স্ন্যাপ আছে, ততবার আপনি ছবি দিয়ে প্রশ্ন সলভ করতে পারবেন।"
    },
    {
      question: "কীভাবে পেমেন্ট করব এবং কত সময় লাগে অ্যাক্সেস পেতে?",
      answer: "আপনি বিকাশ, নগদ অথবা কার্ডের মাধ্যমে পেমেন্ট করতে পারবেন। পেমেন্ট সফল হওয়ার পর ১–৫ মিনিটের মধ্যে আপনার অ্যাক্সেস চালু হয়ে যাবে।"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            সাধারণ প্রশ্নাবলী
            <span className="text-emerald-400"> (FAQ)</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            আমাদের সেবা সম্পর্কে আপনার সকল প্রশ্নের উত্তর এখানে পাবেন
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden transition-all duration-300 hover:border-emerald-500"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-slate-750 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-emerald-400 font-bold text-lg">
                    ❓ {index + 1}.
                  </span>
                  <h3 className="text-white font-semibold text-lg">
                    {item.question}
                  </h3>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {openItems.has(index) ? (
                    <ChevronUp className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>
              
              {openItems.has(index) && (
                <div className="px-6 pb-5">
                  <div className="pl-8 border-l-2 border-emerald-400">
                    <div className="flex items-start space-x-3">
                      <span className="text-emerald-400 font-bold mt-1">✔</span>
                      <p className="text-gray-300 leading-relaxed text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-6">
            আরো কোনো প্রশ্ন আছে? আমাদের সাথে যোগাযোগ করুন
          </p>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 inline-flex items-center space-x-2">
            <span>যোগাযোগ করুন</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Faq;