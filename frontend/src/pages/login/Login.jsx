import { useState } from "react";
import axios from "axios";

export const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [alerts, setAlerts] = useState([]);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // Signup form state
  const [signupForm, setSignupForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  // Alert handler
  const addAlert = (message, type = "error") => {
    const id = Date.now();
    setAlerts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    }, 3000);
  };

  // Validators
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) => password.length >= 6;

  // Login change handler
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(loginForm.email)) {
      addAlert("Please enter a valid email");
      return;
    }

    if (!validatePassword(loginForm.password)) {
      addAlert("Password must be at least 6 characters");
      return;
    }

    const BACKEND_URL = import.meta.env.VITE_BACKEND;

    try {
      await axios.post(
        `${BACKEND_URL}/auth/login`,
        {
          email: loginForm.email,
          password: loginForm.password,
        },
        {
          withCredentials: true, // critical for JWT cookie
        },
      );

      addAlert("Login successful", "success");
      // setLoginForm({ email: "", password: "" });

      // decisive move
      window.location.href = "/home";
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid email or password";
      addAlert(msg);
    }
  };

  // Signup change handler
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({ ...prev, [name]: value }));
  };

  // Send OTP
  const handleSendOTP = () => {
    if (!validateEmail(signupForm.email)) {
      addAlert("Enter a valid email before requesting OTP");
      return;
    }

    addAlert("OTP sent to your email!", "success");
    setOtpSent(true);
    setOtpVerified(false);
  };

  // Verify OTP
  const handleVerifyOTP = () => {
    if (!signupForm.otp.trim()) {
      addAlert("Please enter the OTP");
      return;
    }

    // Simulate success
    addAlert("OTP Verified!", "success");
    setOtpVerified(true);
  };

  // Signup submit handler
  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(signupForm.email)) {
      addAlert("Please enter a valid email");
      return;
    }
    if (!signupForm.firstName.trim()) {
      addAlert("Please enter your first name");
      return;
    }
    if (!signupForm.lastName.trim()) {
      addAlert("Please enter your last name");
      return;
    }
    if (!validatePassword(signupForm.password)) {
      addAlert("Password must be at least 6 characters");
      return;
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      addAlert("Passwords do not match");
      return;
    }
    if (!otpSent) {
      addAlert("Send OTP first");
      return;
    }
    if (!otpVerified) {
      addAlert("Verify OTP before signing up");
      return;
    }

    addAlert("Signup successful!", "success");

    setSignupForm({
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      otp: "",
    });

    setOtpSent(false);
    setOtpVerified(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 flex items-center justify-center p-4">
      {/* Alerts */}
      <div className="fixed top-6 right-6 z-50 space-y-3">
        {alerts.map((a) => (
          <div
            key={a.id}
            className={`p-4 rounded-lg text-white text-sm font-medium backdrop-blur-sm transition-all duration-300 ${
              a.type === "success" ? "bg-green-500/80" : "bg-red-500/80"
            }`}
          >
            {a.message}
          </div>
        ))}
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">
            <span className="text-white">Intelli</span>
            <span style={{ color: "#FF6B35" }}>CART</span>
          </h1>
          <p className="text-gray-400 text-sm">Smart Shopping Optimization</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 bg-slate-800/50 p-1 rounded-lg backdrop-blur-sm">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-3 rounded-md font-medium transition ${
              activeTab === "login"
                ? "bg-slate-900 text-white shadow-lg"
                : "text-gray-400"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-3 rounded-md font-medium transition ${
              activeTab === "signup"
                ? "bg-slate-900 text-white shadow-lg"
                : "text-gray-400"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* LOGIN */}
        {activeTab === "login" && (
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-gray-300 text-sm mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                placeholder="you@example.com"
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-300 text-sm mb-2 block">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                placeholder="••••••••"
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white font-semibold"
              style={{ backgroundColor: "#FF6B35" }}
            >
              Login
            </button>
          </form>
        )}

        {/* SIGNUP */}
        {activeTab === "signup" && (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            {/* Email + Send OTP */}
            <div>
              <label className="text-gray-300 text-sm mb-2 block">
                Email Address
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  value={signupForm.email}
                  onChange={handleSignupChange}
                  className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white"
                  placeholder="you@example.com"
                />
                <button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={otpSent}
                  className={`px-4 py-3 rounded-lg font-medium ${
                    otpSent ? "bg-green-600/40 text-green-300" : "text-white"
                  }`}
                  style={!otpSent ? { backgroundColor: "#FF6B35" } : {}}
                >
                  {otpSent ? "Sent" : "Get OTP"}
                </button>
              </div>
            </div>

            {/* First + Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-300 text-sm block">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={signupForm.firstName}
                  onChange={handleSignupChange}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="text-gray-300 text-sm block">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={signupForm.lastName}
                  onChange={handleSignupChange}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Password fields */}
            <div>
              <label className="text-gray-300 text-sm">Password</label>
              <input
                type="password"
                name="password"
                value={signupForm.password}
                onChange={handleSignupChange}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={signupForm.confirmPassword}
                onChange={handleSignupChange}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white"
                placeholder="••••••••"
              />
            </div>

            {/* OTP + Verify button */}
            <div>
              <label className="text-gray-300 text-sm">OTP</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="otp"
                  value={signupForm.otp}
                  onChange={handleSignupChange}
                  className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white"
                  placeholder="6-digit OTP"
                />

                <button
                  type="button"
                  onClick={handleVerifyOTP}
                  disabled={!otpSent}
                  className={`px-4 py-3 rounded-lg font-medium ${
                    otpVerified
                      ? "bg-green-600/30 text-green-300"
                      : "bg-slate-700 text-gray-300"
                  }`}
                  style={
                    otpSent && !otpVerified
                      ? { backgroundColor: "#FF6B35", color: "white" }
                      : {}
                  }
                >
                  {otpVerified ? "Verified" : "Verify"}
                </button>
              </div>
            </div>

            {/* Signup button – enabled only after OTP Verified */}
            <button
              type="submit"
              disabled={!otpVerified}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                otpVerified
                  ? "text-white cursor-pointer"
                  : "bg-slate-700 text-gray-400 cursor-not-allowed"
              }`}
              style={otpVerified ? { backgroundColor: "#FF6B35" } : {}}
            >
              Sign Up
            </button>
          </form>
        )}

        {/* Footer Switch */}
        <p className="text-center text-gray-400 text-sm mt-6">
          {activeTab === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setActiveTab("signup")}
                className="font-semibold"
                style={{ color: "#FF6B35" }}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setActiveTab("login")}
                className="font-semibold"
                style={{ color: "#FF6B35" }}
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};
