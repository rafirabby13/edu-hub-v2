/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Check, X, Star, Zap, Crown, Shield, Camera, Brain, BookOpen } from "lucide-react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { axiosPublic } from "../hooks/useAxiosPublic";
// import { axiosSecure } from "../hooks/useAxiosConfig";

export default function Plans() {
  const [hoveredPlan, setHoveredPlan] = useState("");
  const [isAnnual, setIsAnnual] = useState(false);
  const { user } = useContext(AuthContext);
  // console.log(user)
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()

  const plans = [
    {
      id: "basic",
      name: "SOLVER BASIC",
      icon: Shield,
      description: "Perfect for students getting started",
      monthlyPrice: 99,
      color: "slate",
      date_limit: 30,
      plan_limit: { image: 50, text: 100 },
      popular: false,
      features: [
        "50 Image",
        "100 Text",
        "30 Days",
        "ইংরেজি উত্তর + বাংলা ব্যাখ্যা"

      ]
    },
    {
      id: "pro",
      name: "SOLVER PRO",
      icon: Zap,
      description: "Best for serious learners",
      monthlyPrice: 299,
      color: "emerald",
      date_limit: 60,
      plan_limit: { image: 150, text: 320 },

      popular: true,
      features: [
        "150 Image",
        "320 Text",
        "60 Days",
        "ইংরেজি উত্তর + বাংলা ব্যাখ্যা"
      ]
    },
    {
      id: "elite",
      name: "SOLVER ELITE",
      icon: Crown,
      description: "For advanced users and professionals",
      monthlyPrice: 499,
      color: "purple",
      popular: false,
      date_limit: 90,
      plan_limit: { image: 250, text: 6500 },

      features: [
        "250 Image",
        "650 Text",
        "90 Days",
        "ইংরেজি উত্তর + বাংলা ব্যাখ্যা"
      ]
    },
  ];

  const getColorClasses = (color, type) => {
    const colors = {
      slate: {
        bg: "bg-slate-500",
        gradient: "from-slate-500 to-slate-600",
        border: "border-slate-600",
        text: "text-slate-400",
        icon: "text-slate-400",
      },
      emerald: {
        bg: "bg-emerald-500",
        gradient: "from-emerald-500 to-teal-500",
        border: "border-emerald-500",
        text: "text-emerald-400",
        icon: "text-emerald-400",
      },
      purple: {
        bg: "bg-purple-500",
        gradient: "from-purple-500 to-indigo-500",
        border: "border-purple-500",
        text: "text-purple-400",
        icon: "text-purple-400",
      },
    };
    return colors[color][type];
  };

  const handlePayment = async (plan) => {
    if (!user) {
      navigate("/login")
    }
    const userFromDB = await axiosPublic.get(`/user/?email=${user?.email}`)
    // console.log(userFromDB.data._id)
    const userId=userFromDB.data._id
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan?.date_limit); // plan.date_limit in days
    // Simulating payment process
    console.log(plan)
    const paymentInfo = {
      price: plan?.monthlyPrice,
      email: `${user?.email}`,
      userId: userId,
      plan_type: plan?.id,
      transactionId: "",
      subscription_start_date: new Date(),
      subscription_end_date: endDate,
      payment_status: "pending",
      payment_date: new Date()
    };
    console.log(paymentInfo)
    
    const response = await axiosSecure.post("/create-ss-payment", paymentInfo);
    console.log(response);
    if (response?.data?.getwayURL) {
      window.location.replace(response?.data?.getwayURL);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-sm font-medium mb-6 backdrop-blur-sm">
              <Star className="w-4 h-4 fill-current" />
              <span>আমাদের প্রাইসিং প্ল্যান (Pricing Plans)</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              SOLVER
              <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Pricing Plans
              </span>
            </h2>

            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Choose the perfect plan for your learning journey
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden">
                <div className="md:grid grid-cols-3 gap-0">
                  {plans.map((plan) => {
                    const IconComponent = plan.icon;
                    return (
                      <div
                        key={plan.id}
                        className={`p-8 relative border-r border-slate-700/50 last:border-r-0 ${plan.popular
                          ? "bg-gradient-to-b from-emerald-500/10 to-transparent relative"
                          : ""
                          }`}
                        onMouseEnter={() => setHoveredPlan(plan.id)}
                        onMouseLeave={() => setHoveredPlan("")}
                      >
                        {/* {plan.popular && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                              🚀 Most Popular
                            </div>
                          </div>
                        )} */}

                        <div className="text-center mb-6">
                          <div
                            className={`inline-flex p-3 rounded-2xl mb-4 ${getColorClasses(
                              plan.color,
                              "bg"
                            )}/20`}
                          >
                            <IconComponent
                              className={`w-8 h-8 ${getColorClasses(
                                plan.color,
                                "icon"
                              )}`}
                            />
                          </div>

                          <h3 className="text-2xl font-bold text-white mb-2">
                            {plan.name}
                          </h3>
                          <p className="text-slate-400 text-sm mb-4">
                            {plan.description}
                          </p>

                          <div className="mb-6">
                            <div className="flex items-baseline justify-center gap-1">
                              <span className="text-4xl font-bold text-white">
                                ৳{isAnnual ? plan.annualPrice : plan.monthlyPrice}
                              </span>
                              <span className="text-slate-400">/month</span>
                            </div>
                            {isAnnual && (
                              <div className="text-sm text-slate-500 line-through">
                                ৳{plan.monthlyPrice}/month
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Features List */}
                        <div className="space-y-3 mb-8">
                          {plan.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <Check className={`w-5 h-5 ${getColorClasses(plan.color, "icon")} mt-0.5 flex-shrink-0`} />
                              <span className="text-slate-300 text-sm leading-relaxed">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => handlePayment(plan)}
                          className={`w-full py-3 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${plan.popular
                            ? `bg-gradient-to-r ${getColorClasses(
                              plan.color,
                              "gradient"
                            )} text-white shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40`
                            : `border-2 ${getColorClasses(
                              plan.color,
                              "border"
                            )} ${getColorClasses(
                              plan.color,
                              "text"
                            )} hover:bg-${plan.color}-500/10`
                            }`}
                        >
                          {plan.popular
                            ? "Get Premium Access"
                            : "Choose This Plan"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <p className="text-slate-400 mb-4">
              Need a custom solution?{" "}
              <span className="text-emerald-400 hover:text-emerald-300 cursor-pointer font-medium">
                Contact our support team
              </span>
            </p>
            <p className="text-sm text-slate-500">
              All plans include free trial • Easy payment • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}