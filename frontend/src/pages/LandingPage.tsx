import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';
import { Sparkles, Link as LinkIcon, FileText, CreditCard, Trophy, CheckCircle, School, Loader2, LogOut, Sun, Moon } from 'lucide-react';
import LoadingTips from '../components/LoadingTips';
import SkeletonLoader from '../components/SkeletonLoader';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import ConfirmModal from '../components/ConfirmModal';

const LandingPage: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await client.post('/notes/', { youtube_url: url });
      console.log("Note created with ID:", response.data.id);
      navigate(`/notes/${response.data.id}`);
    } catch (error) {
      console.error("Error creating note", error);
      alert("Failed to generate notes. Please check the URL.");
      setLoading(false);
    }
  };

  // Show loading state with skeleton and tips
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 transition-colors duration-300">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 transition-all duration-300">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="backdrop-blur-md bg-white/65 dark:bg-gray-900/65 border border-white/50 dark:border-gray-700/50 shadow-sm mx-auto mt-4 flex h-16 items-center justify-between rounded-full px-6">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center">
                  <img src="/logo.png" alt="VidIntel AI" className="w-full h-full object-contain" />
                </div>
                <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">VidIntel AI</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Loading Content */}
        <main className="pt-32 pb-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Loading Tips */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                Creating Your Study Notes...
              </h2>
              <LoadingTips isLoading={loading} />
            </div>

            {/* Preview Text */}
            <div className="text-center mb-8">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Your notes will look like this ↓
              </p>
            </div>

            {/* Skeleton Preview */}
            <SkeletonLoader />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 transition-colors duration-300">
      {/* Animated Background Layer */}
      <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-300 dark:bg-purple-900/40 top-0 -left-20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute w-96 h-96 bg-yellow-200 dark:bg-yellow-900/30 top-0 -right-20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute w-96 h-96 bg-pink-200 dark:bg-pink-900/40 -bottom-32 left-20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        <div className="absolute w-80 h-80 bg-blue-200 dark:bg-blue-900/30 bottom-40 right-10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-md bg-white/65 dark:bg-gray-900/65 border border-white/50 dark:border-gray-700/50 shadow-sm mx-auto mt-4 flex h-16 items-center justify-between rounded-full px-6 transition-colors duration-300">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center">
                <img src="/logo.png" alt="VidIntel AI" className="w-full h-full object-contain" />
              </div>
              <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">VidIntel AI</span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              <a className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">Features</a>
              <a className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">Pricing</a>
              <a className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">Resources</a>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>

              {/* Auth-dependent buttons */}
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="hidden sm:block text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="flex items-center gap-2 justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors h-10 px-5 text-gray-700 dark:text-gray-200 text-sm font-bold"
                  >
                    <LogOut size={16} />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="hidden sm:block text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className="flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors h-10 px-5 text-white text-sm font-bold shadow-lg shadow-indigo-600/25"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center w-full pt-32 pb-20 px-4 sm:px-6">
        {/* Hero Section */}
        <div className="w-full max-w-4xl flex flex-col items-center text-center gap-8 mb-20 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 dark:bg-gray-800/60 border border-white/50 dark:border-gray-700/50 backdrop-blur-sm shadow-sm mb-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">New: GPT-4o Integration</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.1]">
            Transform <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-500">YouTube</span> Videos into Smart Study Notes
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl font-medium leading-relaxed">
            Paste a link, get a summary, flashcards, and quizzes in seconds. Master any subject effortlessly with AI-powered learning.
          </p>

          {/* Glass Input Module */}
          <form onSubmit={handleSubmit} className="w-full max-w-2xl mt-4 group">
            <div className="backdrop-blur-md bg-white/50 dark:bg-gray-800/50 border border-white/80 dark:border-gray-700/80 shadow-lg p-2 rounded-full flex flex-col sm:flex-row items-center gap-2 transition-transform duration-300 hover:scale-[1.01] focus-within:scale-[1.01] focus-within:ring-4 focus-within:ring-indigo-600/10">
              <div className="flex-1 flex items-center w-full pl-4 pr-2 h-12 sm:h-14">
                <LinkIcon className="text-gray-400 dark:text-gray-500 mr-3" size={20} />
                <input
                  className="w-full bg-transparent border-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-0 text-base sm:text-lg p-0 outline-none"
                  placeholder="Paste YouTube URL here..."
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto h-12 sm:h-14 px-8 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold text-base transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>AI is reading...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    <span>Generate Notes</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 flex items-center justify-center gap-1">
              <CheckCircle size={14} />
              No credit card required for first 3 videos
            </p>
          </form>
        </div>

        {/* Features Grid */}
        <div className="w-full max-w-6xl px-4 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {/* Feature 1 */}
          <div className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 border border-white/60 dark:border-gray-700/60 shadow-lg rounded-3xl p-8 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
            <div className="h-14 w-14 rounded-2xl bg-white/80 dark:bg-gray-700/80 flex items-center justify-center shadow-sm text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
              <FileText size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Smart Summaries</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Concise bullet points extracted from hours of video. Get to the core of the content without watching the whole thing.
              </p>
            </div>
            <div className="mt-auto pt-4 flex items-center text-indigo-600 dark:text-indigo-400 font-semibold text-sm cursor-pointer hover:underline">
              Learn more <span className="ml-1">→</span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 border border-white/60 dark:border-gray-700/60 shadow-lg rounded-3xl p-8 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
            <div className="h-14 w-14 rounded-2xl bg-white/80 dark:bg-gray-700/80 flex items-center justify-center shadow-sm text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
              <CreditCard size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Study Flashcards</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                AI-generated cards to help you memorize key concepts. Export directly to Anki or Quizlet for spaced repetition.
              </p>
            </div>
            <div className="mt-auto pt-4 flex items-center text-indigo-600 dark:text-indigo-400 font-semibold text-sm cursor-pointer hover:underline">
              View example <span className="ml-1">→</span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 border border-white/60 dark:border-gray-700/60 shadow-lg rounded-3xl p-8 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
            <div className="h-14 w-14 rounded-2xl bg-white/80 dark:bg-gray-700/80 flex items-center justify-center shadow-sm text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
              <Trophy size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Auto Quizzes</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Test your knowledge immediately after watching. Identify gaps in your understanding with instant feedback.
              </p>
            </div>
            <div className="mt-auto pt-4 flex items-center text-indigo-600 dark:text-indigo-400 font-semibold text-sm cursor-pointer hover:underline">
              Try a quiz <span className="ml-1">→</span>
            </div>
          </div>
        </div>

        {/* Social Proof / Decorative Section */}
        <div className="mt-24 w-full max-w-4xl text-center relative z-10">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-8">Trusted by students from</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-gray-200">
              <School size={24} /> BIT Sindri
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full relative z-10 border-t border-white/40 dark:border-gray-700/40 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:mt-0 md:order-1 flex gap-6 flex-wrap justify-center md:justify-start">
            <p className="text-center text-base text-gray-500 dark:text-gray-400">
              © 2026 AI Notes Generator. All rights reserved.
            </p>
            <a className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer">Privacy Policy</a>
            <a className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer">Terms of Service</a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 10s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          logout();
          navigate('/');
        }}
        title="Logout Confirmation"
        message="Are you sure you want to logout? You'll need to sign in again to access your notes."
        confirmText="Logout"
        cancelText="Cancel"
        variant="warning"
      />
    </div>
  );
};

export default LandingPage;
