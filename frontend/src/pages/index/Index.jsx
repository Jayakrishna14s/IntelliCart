import React from "react";
import { Link } from "react-router-dom";
import { ImageWithSkeleton } from "../global_components/ImageWithSkeleton";

export const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-md bg-slate-950/80 border-b border-slate-800 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold">
              <ImageWithSkeleton src="/favicon.png" className="w-full h-full" />
            </div>
            <span className="font-bold text-2xl">
              Intelli<span style={{ color: "#FF6B35" }}>Cart</span>
            </span>
          </div>
          <button
            className="px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/50 font-medium"
            style={{ backgroundColor: "#FF6B35", color: "#0F172A" }}
          >
            <Link to="/login">Get Started</Link>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* <div className="inline-block mb-6 px-4 py-2 rounded-full border border-slate-700 bg-slate-800/50">
            <span style={{ color: "#FF6B35" }} className="text-sm font-medium">
              ✨ AI-Powered Shopping Revolution
            </span>
          </div> */}

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-balance">
            Smart Cart
            <span style={{ color: "#FF6B35" }}> Optimizer</span>
          </h1>

          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto text-balance">
            Revolutionize your shopping experience with AI-powered insights. Get
            smarter recommendations, better prices, and personalized bundles
            tailored just for you.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              className="px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
              style={{ backgroundColor: "#FF6B35", color: "#0F172A" }}
            >
              <Link to="/login">Try for Free</Link>
            </button>
            <button className="px-8 py-4 rounded-lg font-semibold border-2 border-slate-700 hover:border-slate-500 transition-all duration-300">
              Watch Demo
            </button>
          </div>

          {/* Floating cards preview */}
          {/* <div className="mt-16 relative h-80">
            <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-md">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: "#FF6B35" }}
                  ></div>
                  <span className="text-sm font-medium">Smart Analysis</span>
                </div>
                <div className="text-left">
                  <p className="text-sm text-slate-400">
                    Optimizing your cart...
                  </p>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Price Match</span>
                      <span style={{ color: "#FF6B35" }}>92%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full"
                        style={{ width: "92%", backgroundColor: "#FF6B35" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful Features Built for You
            </h2>
            <p className="text-slate-400 text-lg">
              Advanced AI technology to transform your shopping
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300 group hover:shadow-xl hover:shadow-orange-500/10">
              <div
                className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-xl"
                style={{ backgroundColor: "#FF6B35", color: "#0F172A" }}
              >
                📊
              </div>
              <h3 className="text-xl font-bold mb-2">Price Forecasting</h3>
              <p className="text-slate-400">
                Predict price changes with ML algorithms. Know the best time to
                buy and save up to 40% on your purchases.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300 group hover:shadow-xl hover:shadow-orange-500/10">
              <div
                className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-xl"
                style={{ backgroundColor: "#FF6B35", color: "#0F172A" }}
              >
                🎁
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Bundling</h3>
              <p className="text-slate-400">
                Automatically discover complementary products. Get curated
                bundles with exclusive discounts and better value.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300 group hover:shadow-xl hover:shadow-orange-500/10">
              <div
                className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-xl"
                style={{ backgroundColor: "#FF6B35", color: "#0F172A" }}
              >
                👤
              </div>
              <h3 className="text-xl font-bold mb-2">Dynamic User Profiling</h3>
              <p className="text-slate-400">
                Personalized recommendations based on your behavior. Shopping
                gets smarter with every purchase you make.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300 group hover:shadow-xl hover:shadow-orange-500/10">
              <div
                className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-xl"
                style={{ backgroundColor: "#FF6B35", color: "#0F172A" }}
              >
                🛒
              </div>
              <h3 className="text-xl font-bold mb-2">Cart Optimization</h3>
              <p className="text-slate-400">
                Real-time cart analysis and suggestions. Maximize savings while
                getting exactly what you need.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300 group hover:shadow-xl hover:shadow-orange-500/10">
              <div
                className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-xl"
                style={{ backgroundColor: "#FF6B35", color: "#0F172A" }}
              >
                ⚡
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Alerts</h3>
              <p className="text-slate-400">
                Never miss a deal. Get real-time notifications for price drops
                and exclusive offers on your wishlist.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300 group hover:shadow-xl hover:shadow-orange-500/10">
              <div
                className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-xl"
                style={{ backgroundColor: "#FF6B35", color: "#0F172A" }}
              >
                🔒
              </div>
              <h3 className="text-xl font-bold mb-2">Privacy First</h3>
              <p className="text-slate-400">
                Your data stays yours. Enterprise-grade encryption and zero
                third-party tracking on all transactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color: "#FF6B35" }}
              >
                40%
              </div>
              <p className="text-slate-400">Average savings per purchase</p>
            </div>
            <div className="text-center">
              <div
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color: "#FF6B35" }}
              >
                2.3M+
              </div>
              <p className="text-slate-400">Active users globally</p>
            </div>
            <div className="text-center">
              <div
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color: "#FF6B35" }}
              >
                500M+
              </div>
              <p className="text-slate-400">Products tracked daily</p>
            </div>
            <div className="text-center">
              <div
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color: "#FF6B35" }}
              >
                4.9★
              </div>
              <p className="text-slate-400">Average app rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Save Smarter?
          </h2>
          <p className="text-xl text-slate-300 mb-10">
            Join millions of smart shoppers and start optimizing your purchases
            today.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              className="px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/50"
              style={{ backgroundColor: "#FF6B35", color: "#0F172A" }}
            >
              Start Free Trial
            </button>
            <button className="px-8 py-4 rounded-lg font-semibold border-2 border-slate-700 hover:border-slate-500 transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-bold text-lg mb-4">IntelliCart</div>
              <p className="text-slate-400 text-sm">
                Smart shopping, powered by AI
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex justify-between items-center text-sm text-slate-400">
            <p>&copy; 2025 IntelliCart. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="#" className="hover:text-white transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
