import { useEffect, useState } from 'react';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

const Admin = () => {
  const API_BASE = import.meta.env.VITE_API_BASE;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('adminAuth') === 'true';
    } catch (e) {
      return false;
    }
  });
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (loggedIn) fetchBookings();
  }, [loggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setLoggedIn(true);
      localStorage.setItem('adminAuth', 'true');
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('adminAuth');
  };

  const fetchBookings = async () => {
    if (!API_BASE) {
      setError('VITE_API_BASE not configured');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/bookings`);
      if (!res.ok) throw new Error(`Failed to fetch bookings: ${res.status}`);
      const data = await res.json();
      setBookings(data || []);
    } catch (err: any) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {!loggedIn ? (
          <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Username</label>
                <input className="w-full mt-1 p-2 border rounded" value={username} onChange={e => setUsername(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input type="password" className="w-full mt-1 p-2 border rounded" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div>
                <button type="submit" className="btn btn-primary w-full">Sign in</button>
              </div>
            </form>
            <p className="text-xs text-gray-500 mt-3">Note: This admin login is protected by a hardcoded username/password.</p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Admin — Bookings</h2>
              <div className="flex items-center gap-3">
                <button onClick={fetchBookings} className="btn btn-secondary">Refresh</button>
                <button onClick={handleLogout} className="btn">Logout</button>
              </div>
            </div>

            {error && <div className="text-red-600 mb-4">{error}</div>}
            {loading ? (
              <div>Loading…</div>
            ) : (
              <div className="overflow-auto bg-white rounded shadow">
                <table className="min-w-full divide-y">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Phone</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Service</th>
                      <th className="px-4 py-2 text-left">Preferred Time</th>
                      <th className="px-4 py-2 text-left">Location</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length === 0 && (
                      <tr><td colSpan={8} className="p-4">No bookings found.</td></tr>
                    )}
                    {bookings.map((b: any) => (
                      <tr key={b._id} className="border-t">
                        <td className="px-4 py-2">{b.fullName}</td>
                        <td className="px-4 py-2">{b.phoneNumber}</td>
                        <td className="px-4 py-2">{b.email || '—'}</td>
                        <td className="px-4 py-2">{b.serviceRequired}</td>
                        <td className="px-4 py-2">{b.preferredTime || '—'}</td>
                        <td className="px-4 py-2">{b.location || '—'}</td>
                        <td className="px-4 py-2">{b.status || '—'}</td>
                        <td className="px-4 py-2">{new Date(b.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
