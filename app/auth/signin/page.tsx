'use client';

import { signIn } from 'next-auth/react';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
      <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-10 w-full max-w-sm flex flex-col items-center gap-4">
        
        {/* Logo */}
        <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-2xl font-bold text-white mb-2">
          A
        </div>
        
        <h1 className="text-2xl font-bold text-white">Welcome</h1>
        <p className="text-[#8b949e] text-sm mb-2">Sign in to your account</p>

        {/* Google */}
        <button
          onClick={() => signIn('google', { callbackUrl: '/chat' })}
          className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-all"
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Continue with Google
        </button>

        {/* GitHub */}
        <button
          onClick={() => signIn('github', { callbackUrl: '/chat' })}
          className="w-full flex items-center justify-center gap-3 bg-[#24292e] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#2f363d] transition-all border border-[#30363d]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          Continue with GitHub
        </button>

        <div className="flex items-center w-full gap-3 my-1">
          <div className="flex-1 h-px bg-[#30363d]"></div>
          <span className="text-[#8b949e] text-xs">or</span>
          <div className="flex-1 h-px bg-[#30363d]"></div>
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          className="w-full bg-[#0d1117] border border-[#30363d] text-white rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500 transition-all"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full bg-[#0d1117] border border-[#30363d] text-white rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500 transition-all"
        />

        <button className="w-full bg-orange-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-orange-600 transition-all">
          Sign In
        </button>

        <p className="text-[#8b949e] text-sm">
          Don't have an account?{' '}
          <span className="text-orange-500 cursor-pointer hover:underline">Sign up</span>
        </p>

        <p className="text-[#8b949e] text-xs text-center mt-2">
          By signing in, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
}