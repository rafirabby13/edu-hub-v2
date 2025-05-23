import React, { useState } from "react";
import { Check, X, Star, Zap, Crown, Shield } from "lucide-react";

export default function PricingPlans() {
  const [hoveredPlan, setHoveredPlan] = useState("");
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      id: "basic",
      name: "Basic",
      icon: Shield,
      description: "Perfect for individuals getting started",
      monthlyPrice: 9,
      annualPrice: 7,
      color: "slate",
      popular: false,
    },
    {
      id: "pro",
      name: "Pro",
      icon: Zap,
      description: "Best for growing businesses",
      monthlyPrice: 29,
      annualPrice: 24,
      color: "emerald",
      popular: true,
    },
    {
      id: "elite",
      name: "Elite",
      icon: Crown,
      description: "For enterprises and large teams",
      monthlyPrice: 99,
      annualPrice: 79,
      color: "purple",
      popular: false,
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

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-sm font-medium mb-6 backdrop-blur-sm">
              <Star className="w-4 h-4 fill-current" />
              <span>Choose Your Perfect Plan</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Simple, Transparent
              <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>

            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className=" min-w-full ">
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden">
                <div className="grid grid-cols-3 gap-0 border-b border-slate-700/50">
                  {plans.map((plan) => {
                    const IconComponent = plan.icon;
                    return (
                      <div
                        key={plan.id}
                        className={`p-8 relative ${
                          plan.popular
                            ? "bg-gradient-to-b from-emerald-500/10 to-transparent"
                            : ""
                        }`}
                        onMouseEnter={() => setHoveredPlan(plan.id)}
                        onMouseLeave={() => setHoveredPlan("")}
                      >
                        <div className="text-center">
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
                                $
                                {isAnnual
                                  ? plan.annualPrice
                                  : plan.monthlyPrice}
                              </span>
                              <span className="text-slate-400">/month</span>
                            </div>
                            {isAnnual && (
                              <div className="text-sm text-slate-500 line-through">
                                ${plan.monthlyPrice}/month
                              </div>
                            )}
                          </div>

                          <button
                            className={`w-full py-3 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                              plan.popular
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
                            {plan.popular ? "Start Free Trial" : "Get Started"}
                          </button>
                        </div>
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
                Contact our sales team
              </span>
            </p>
            <p className="text-sm text-slate-500">
              All plans include 14-day free trial • No credit card required •
              Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
