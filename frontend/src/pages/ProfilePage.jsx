import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Save, Download } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ExportImportModal from '../components/ExportImportModal';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [loading, setLoading] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return toast.error('Name and email are required');

    setLoading(true);
    try {
      await updateUser(form);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Profile</h1>

      {/* User Info */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center text-white text-xl font-bold shadow-sm">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-lg font-bold text-card-foreground">{user?.name}</h2>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '—'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="profile-name" className="block text-xs font-semibold text-card-foreground mb-1.5">Name</label>
            <input
              id="profile-name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="profile-email" className="block text-xs font-semibold text-card-foreground mb-1.5">Email</label>
            <input
              id="profile-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input-field"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary !h-10 text-sm font-semibold rounded-lg">
            <Save className="w-4 h-4 mr-1.5" />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </motion.div>

      {/* Data Management */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6"
      >
        <h3 className="text-sm font-bold text-card-foreground mb-1">Data Management</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Export your bookmarks as JSON or CSV, or import bookmarks from a JSON file.
        </p>
        <button onClick={() => setShowExport(true)} className="btn-outline !h-10 text-sm font-semibold rounded-lg">
          <Download className="w-4 h-4 mr-1.5" /> Export / Import
        </button>
      </motion.div>

      <ExportImportModal isOpen={showExport} onClose={() => setShowExport(false)} />
    </div>
  );
};

export default ProfilePage;
