import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Send,
  Globe,
  Shield,
  FileText,
  HelpCircle,
  ArrowRight,
  Heart
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'হোম', href: '#' },
    { name: 'সেবা সমূহ', href: '#' },
    { name: 'প্যাকেজ', href: '#' },
    { name: 'ব্লগ', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'যোগাযোগ', href: '#' }
  ];

  const services = [
    { name: 'ইংরেজি সলভ', href: '#' },
    { name: 'গণিত সলভ', href: '#' },
    { name: 'বিজ্ঞান সলভ', href: '#' },
    { name: 'অনুবাদ সেবা', href: '#' },
    { name: 'টিউটোরিং', href: '#' },
    { name: 'পরীক্ষা প্রস্তুতি', href: '#' }
  ];

  const legalLinks = [
    { name: 'গোপনীয়তা নীতি', href: '#', icon: Shield },
    { name: 'ব্যবহারের শর্তাবলী', href: '#', icon: FileText },
    { name: 'রিফান্ড নীতি', href: '#', icon: ArrowRight },
    { name: 'সাহায্য কেন্দ্র', href: '#', icon: HelpCircle }
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook, color: 'hover:text-blue-500' },
    { name: 'Twitter', href: '#', icon: Twitter, color: 'hover:text-sky-400' },
    { name: 'Instagram', href: '#', icon: Instagram, color: 'hover:text-pink-500' },
    { name: 'YouTube', href: '#', icon: Youtube, color: 'hover:text-red-500' }
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              আপডেট পেতে 
              <span className="text-emerald-400"> সাবস্ক্রাইব</span> করুন
            </h3>
            <p className="text-gray-300 max-w-md mx-auto">
              নতুন ফিচার, টিপস এবং অফার সম্পর্কে সবার আগে জানুন
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="আপনার ইমেইল ঠিকানা"
                className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 inline-flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-emerald-500/25">
              <Send className="w-5 h-5" />
              <span>সাবস্ক্রাইব</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Banglay<span className="text-emerald-400">Solve</span>
              </h2>
              <p className="text-gray-300 leading-relaxed">
                AI চালিত প্রযুক্তির মাধ্যমে শিক্ষার্থীদের পড়াশোনায় সাহায্য করার জন্য আমরা প্রতিশ্রুতিবদ্ধ।
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>+৮৮০ ১৭XX XXX XXX</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>support@banglaysolve.com</span>
              </div>
              <div className="flex items-start space-x-3 text-gray-300">
                <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                <span>ঢাকা, বাংলাদেশ</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-4">আমাদের অনুসরণ করুন</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className={`w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-gray-400 transition-all duration-200 hover:bg-slate-700 ${social.color} hover:transform hover:scale-110`}
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6 flex items-center">
              <Globe className="w-5 h-5 text-emerald-400 mr-2" />
              দ্রুত লিংক
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6 flex items-center">
              <HelpCircle className="w-5 h-5 text-emerald-400 mr-2" />
              আমাদের সেবা
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {service.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6 flex items-center">
              <Shield className="w-5 h-5 text-emerald-400 mr-2" />
              সহায়তা ও নীতি
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 flex items-center group"
                    >
                      <IconComponent className="w-4 h-4 mr-3 text-emerald-400" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Quick Contact */}
            <div className="mt-8 p-4 bg-slate-800 rounded-lg border border-slate-700">
              <h5 className="text-white font-medium mb-2">দ্রুত সহায়তা</h5>
              <p className="text-gray-400 text-sm mb-3">
                কোনো সমস্যা? আমাদের সাথে যোগাযোগ করুন
              </p>
              <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
                সাপোর্ট টিকেট
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© {currentYear} BanglaySolve.</span>
              <span>সর্বস্বত্ব সংরক্ষিত।</span>
            </div>
            
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>in Bangladesh</span>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                Terms & Conditions
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;