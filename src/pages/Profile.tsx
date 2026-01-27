import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import { useNavigate, Link } from 'react-router-dom';

interface ProfileType {
  id: string;
  full_name: string;
  location: string;
  avatar_url: string;
  updated_at: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('id, full_name, location, avatar_url')
          .eq('id', user.id)
          .single();
        if (profile) {
          setProfile(profile);
          setFullName(profile.full_name || '');
          setLocation(profile.location || '');
          setAvatarUrl(profile.avatar_url || null);
        } else if (error) {
          console.error('Error fetching profile:', error);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const uploadAvatar = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;

    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      if (publicUrlData) {
        setAvatarUrl(publicUrlData.publicUrl);
        const { error: updateError } = await supabase
          .from('profiles')
          .upsert({ id: user.id, avatar_url: publicUrlData.publicUrl, updated_at: new Date() });

        if (updateError) {
          throw updateError;
        }
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }, [user]);

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
          <div className="mt-6 flex flex-col items-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4.002 4.002 0 11-8.004 0 4.002 4.002 0 018.004 0zM12.004 5.999a7.002 7.002 0 100 14.004 7.002 7.002 0 000-14.004z" />
                </svg>
              )}
            </div>
            <label htmlFor="avatar-upload" className="mt-3 cursor-pointer bg-maroon-800 text-white py-1.5 px-4 rounded-md text-sm font-medium hover:bg-maroon-700 transition-colors duration-200">
              {uploading ? 'Uploading...' : 'Upload Avatar'}
              <input
                type="file"
                id="avatar-upload"
                className="sr-only"
                accept="image/*"
                onChange={uploadAvatar}
                disabled={uploading}
              />
            </label>
          </div>
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
        <div className="border-t border-gray-200 pt-4 sm:pt-6">
            <h2 className="text-base sm:text-lg font-medium text-gray-900">Admission Tracking</h2>
            <div className="mt-3 sm:mt-4">
                <Link to="/tracked-requirements" className="w-full flex justify-center py-1.5 px-3 text-sm border border-transparent rounded-md shadow-sm font-medium text-white bg-maroon-800 hover:bg-maroon-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-maroon-500">
                    View Tracked Requirements
                </Link>
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

