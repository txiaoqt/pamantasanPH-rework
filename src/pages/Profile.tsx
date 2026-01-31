import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { User as UserIcon, Shield, Settings, AlertTriangle, LogOut, Camera } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState('profile');
  
  // Form state
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
    const [password, setPassword] = useState('');
  
    const navigate = useNavigate();
    const [theme, setTheme] = useTheme();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data: profileData } = await supabase
          .from('profiles')
          .select('id, full_name, location, avatar_url, updated_at')
          .eq('id', user.id)
          .single();
        
        if (profileData) {
          setProfile({ ...profileData, updated_at: profileData.updated_at || new Date().toISOString() });
          setFullName(profileData.full_name || '');
          setLocation(profileData.location || '');
          setAvatarUrl(profileData.avatar_url || null);
        }
      } else {
        navigate('/login');
      }
      setLoading(false);
    };
    fetchUserData();
  }, [navigate]);

  const uploadAvatar = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage.from('avatars').upload(fileName, file);

    if (uploadError) {
      alert(uploadError.message);
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(fileName);
    if (publicUrlData) {
      setAvatarUrl(publicUrlData.publicUrl);
      await supabase.from('profiles').upsert({ id: user.id, avatar_url: publicUrlData.publicUrl, updated_at: new Date() });
    }
    setUploading(false);
  }, [user]);

  const handleUpdateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;
    setLoading(true);
    const { error } = await supabase.from('profiles').upsert({ id: user.id, full_name: fullName, location, updated_at: new Date() });
    if (error) alert(error.message);
    else alert('Profile updated successfully!');
    setLoading(false);
  };

  const handleUpdatePassword = async () => {
    if (!password) {
      alert('Please enter a new password.');
      return;
    }
    const { error } = await supabase.auth.updateUser({ password });
    if (error) alert(error.message);
    else {
      alert('Password updated successfully!');
      setPassword('');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action is irreversible.')) {
      alert('Account deletion functionality is not yet implemented.');
      // In a real app, you would call a Supabase edge function to delete user data and auth record.
    }
  };
  
  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  const navItems = [
    { id: 'profile', label: 'Edit Profile', icon: UserIcon },
    { id: 'account', label: 'Account Settings', icon: Shield },
    { id: 'settings', label: 'Website Settings', icon: Settings },
    { id: 'danger', label: 'Danger Zone', icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-center mb-8">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden group shrink-0">
            <img src={avatarUrl || `https://api.dicebear.com/8.x/initials/svg?seed=${fullName || user?.email}`} alt="Avatar" className="w-full h-full object-cover" />
            <label htmlFor="avatar-upload" className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center cursor-pointer transition-opacity">
              <Camera className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              <input type="file" id="avatar-upload" className="sr-only" accept="image/*" onChange={uploadAvatar} disabled={uploading} />
            </label>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50">{fullName || 'New User'}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="md:col-span-1">
            <nav className="space-y-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === item.id 
                      ? 'bg-maroon-100 dark:bg-maroon-900 text-maroon-800 dark:text-maroon-200' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-50'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.label}</span>
                </button>
              ))}
               <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-50"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  <span>Logout</span>
                </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">Personal Information</h2>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Full Name</label>
                    <input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-maroon-500 dark:focus:ring-maroon-400 focus:border-maroon-500 dark:text-gray-50 dark:bg-gray-700"/>
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Location</label>
                    <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-maroon-500 dark:focus:ring-maroon-400 focus:border-maroon-500 dark:text-gray-50 dark:bg-gray-700 dark:placeholder-gray-400" placeholder="e.g., Manila, Philippines"/>
                  </div>
                  <div className="text-right">
                    <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-maroon-800 dark:bg-maroon-700 rounded-lg hover:bg-maroon-700 dark:hover:bg-maroon-600 disabled:opacity-50">
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">Account Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Email Address</label>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user?.email}</p>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <input id="newPassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-maroon-500 dark:focus:ring-maroon-400 focus:border-maroon-500 dark:text-gray-50 dark:bg-gray-700 dark:placeholder-gray-400" placeholder="Enter new password"/>
                  </div>
                  <div className="text-right">
                    <button onClick={handleUpdatePassword} disabled={!password || loading} className="px-4 py-2 text-sm font-medium text-white bg-maroon-800 dark:bg-maroon-700 rounded-lg hover:bg-maroon-700 dark:hover:bg-maroon-600 disabled:opacity-50">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">Website Settings</h2>
                <div className="space-y-4">
                  {/* Theme Preference */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Theme</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input
                          id="light-theme"
                          name="theme"
                          type="radio"
                          value="light"
                          checked={theme === 'light'}
                          onChange={() => setTheme('light')}
                          className="focus:ring-maroon-500 dark:focus:ring-maroon-400 h-4 w-4 text-maroon-600 border-gray-300 dark:border-gray-600"
                        />
                        <label htmlFor="light-theme" className="ml-2 block text-sm text-gray-900 dark:text-gray-50">
                          Light
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="dark-theme"
                          name="theme"
                          type="radio"
                          value="dark"
                          checked={theme === 'dark'}
                          onChange={() => setTheme('dark')}
                          className="focus:ring-maroon-500 dark:focus:ring-maroon-400 h-4 w-4 text-maroon-600 border-gray-300 dark:border-gray-600"
                        />
                        <label htmlFor="dark-theme" className="ml-2 block text-sm text-gray-900 dark:text-gray-50">
                          Dark
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Notification Preferences Placeholder */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50 mb-2">Notifications</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Notification preferences coming soon.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'danger' && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-red-300 dark:border-red-800">
                <h2 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">Danger Zone</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">These actions are permanent and cannot be undone.</p>
                <div className="border-t border-red-200 dark:border-red-700 pt-4 text-left">
                  <button onClick={handleDeleteAccount} className="px-4 py-2 text-sm font-medium text-white bg-red-600 dark:bg-red-700 rounded-lg hover:bg-red-700 dark:hover:bg-red-600">
                    Delete My Account
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

