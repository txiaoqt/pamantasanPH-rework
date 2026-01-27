import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        if (profile) {
          setProfile(profile);
          setFullName(profile.full_name || '');
          setLocation(profile.location || '');
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleUpdateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;

    setLoading(true);
    const updates = {
      id: user.id,
      full_name: fullName,
      location,
      updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);
    if (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  const handleUpdatePassword = async () => {
    if (!password) {
      alert('Please enter a new password.');
      return;
    }
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      alert(error.message);
    } else {
      alert('Password updated successfully!');
      setPassword('');
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    } else {
      navigate('/');
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg p-6 sm:p-8 space-y-6 sm:space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Profile</h1>
          <p className="mt-2 text-sm text-gray-600">Manage your account settings</p>
        </div>
        <div className="text-center">
            <p className="text-base sm:text-lg font-medium text-gray-900">{profile?.full_name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <form onSubmit={handleUpdateProfile} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full mt-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-maroon-500 focus:border-maroon-500"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full mt-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-maroon-500 focus:border-maroon-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-1.5 px-3 text-sm border border-transparent rounded-md shadow-sm font-medium text-white bg-maroon-800 hover:bg-maroon-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-maroon-500"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
        <div className="border-t border-gray-200 pt-4 sm:pt-6">
            <h2 className="text-base sm:text-lg font-medium text-gray-900">Change Password</h2>
            <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
                <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                    id="newPassword"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mt-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-maroon-500 focus:border-maroon-500"
                    />
                </div>
                <button
                    onClick={handleUpdatePassword}
                    disabled={loading}
                    className="w-full flex justify-center py-1.5 px-3 text-sm border border-transparent rounded-md shadow-sm font-medium text-white bg-maroon-800 hover:bg-maroon-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-maroon-500"
                >
                    {loading ? 'Updating...' : 'Update Password'}
                </button>
            </div>
        </div>
        <div className="border-t border-gray-200 pt-4 text-center">
            <button
                onClick={handleLogout}
                disabled={loading}
                className="text-sm font-medium text-red-600 hover:text-red-500"
            >
                {loading ? 'Logging out...' : 'Log out'}
            </button>
        </div>
      </div>
    </div>
  );
}

