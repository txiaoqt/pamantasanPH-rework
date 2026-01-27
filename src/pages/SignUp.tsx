import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { AtSign, Lock, User, LogIn, Chrome, Github, MailCheck } from 'lucide-react';

export default function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setFullName('');
      setEmail('');
      setPassword('');
    }
    setLoading(false);
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
    });
    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 sm:p-8 space-y-6 sm:space-y-8 bg-white rounded-lg shadow-md">
        {success ? (
          <div className="text-center">
            <MailCheck className="mx-auto h-10 w-10 text-green-500" />
            <h1 className="mt-4 text-xl sm:text-2xl font-bold text-gray-900">Please check your email</h1>
            <p className="mt-2 text-sm text-gray-600">A confirmation link has been sent to your email address. Please click the link to activate your account.</p>
            <div className="mt-6">
                <Link to="/login" className="font-medium text-maroon-600 hover:text-maroon-500">
                    Back to Login
                </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Create an Account</h1>
              <p className="mt-2 text-sm text-gray-600">Join UniCentral to save and compare universities</p>
            </div>
            <form className="mt-6 space-y-4 sm:space-y-6" onSubmit={handleSignUp}>
              <div className="relative">
                <label className="sr-only" htmlFor="fullName">Full Name</label>
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-maroon-500 focus:border-maroon-500"
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="relative">
                <label className="sr-only" htmlFor="email">Email</label>
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-maroon-500 focus:border-maroon-500"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <label className="sr-only" htmlFor="password">Password</label>
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-maroon-500 focus:border-maroon-500"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-maroon-800 hover:bg-maroon-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-maroon-500 disabled:bg-gray-400"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LogIn className="h-5 w-5 text-maroon-500 group-hover:text-maroon-400" />
                  </span>
                  {loading ? 'Signing up...' : 'Sign up'}
                </button>
              </div>
            </form>
            <div className="relative my-4 sm:my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <button onClick={() => handleSocialLogin('google')} className="flex items-center justify-center w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Chrome className="w-4 h-4 mr-2" />
                    Google
                </button>
                <button onClick={() => handleSocialLogin('github')} className="flex items-center justify-center w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                </button>
            </div>
            <div className="text-sm text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-maroon-600 hover:text-maroon-500">
                  Sign in
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
