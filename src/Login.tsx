import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, MessageSquare } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="flex h-screen w-screen bg-[#111b21]">
      {/* Left side - WhatsApp-like background */}
      <div className="hidden md:flex md:w-3/5 bg-[#00a884] relative">
        <div className="absolute inset-0 bg-[url('https://web.whatsapp.com/img/bg-chat-tile-light_a4be512e7195b6b733d9110b408f075d.png')] opacity-10"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="flex items-center justify-center mb-8">
              <MessageSquare className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4">SupApp Web</h2>
            <p className="text-xl opacity-90 max-w-md">
              Send and receive messages without keeping your phone online.
              <br />
              Use SupApp on up to 4 linked devices and 1 phone at the same time.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full md:w-2/5 flex items-center justify-center p-8 bg-[#111b21]">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#e9edef]">Welcome to SupApp</h1>
            <p className="text-[#8696a0] mt-2">
              {isSignUp ? 'Create your account' : 'Sign in to continue'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[#8696a0]" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-3 bg-[#2a3942] text-[#e9edef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a884]"
                  required
                />
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-[#8696a0]" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 bg-[#2a3942] text-[#e9edef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a884]"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[#8696a0]" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-10 pr-10 py-3 bg-[#2a3942] text-[#e9edef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a884]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-[#8696a0]" />
                ) : (
                  <Eye className="h-5 w-5 text-[#8696a0]" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#00a884] text-white py-3 rounded-lg font-semibold hover:bg-[#008069] transition-colors duration-200"
            >
              {isSignUp ? 'Sign Up' : 'Login'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[#00a884] hover:text-[#008069] transition-colors duration-200"
              >
                {isSignUp
                  ? 'Already have an account? Login'
                  : "Don't have an account? Sign Up"}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-[#8696a0] text-sm">
            <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 