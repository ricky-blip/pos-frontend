import { useEffect, useState } from "react";
import { activityService } from "../services/activity.service";
import useToastStore from "../../../stores/useToastStore";

export default function ActivityLogsPage() {
  const showToast = useToastStore((s) => s.showToast);
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchUser, setSearchUser] = useState("");

  const fetchLogs = async (query = {}) => {
    setIsLoading(true);
    try {
      const response = await activityService.getLogs(query);
      setLogs(response.rows || []);
    } catch (error) {
      showToast(error.message || "Gagal memuat log aktivitas", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleSearch = async () => {
    const userId = searchUser.trim() ? searchUser.trim() : undefined;
    await fetchLogs({ userId });
  };

  return (
    <div className="flex flex-1 flex-col pb-10">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Log Aktivitas</h1>
          <p className="text-sm text-gray-500 mt-1">Riwayat event login, manajemen staf, dan aktivitas audit lainnya.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            id="activity-log-search"
            type="text"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Cari berdasarkan ID user"
          />
          <button
            onClick={handleSearch}
            className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Cari
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-gray-100 bg-white shadow-sm">
        {isLoading ? (
          <div className="p-12 text-center text-gray-400">Memuat log aktivitas...</div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center text-gray-500">Belum ada log aktivitas atau tidak ada hasil pencarian.</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-5 py-4">Waktu</th>
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Aksi</th>
                <th className="px-5 py-4">Deskripsi</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white text-gray-700">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 whitespace-nowrap">{new Date(log.createdAt).toLocaleString('id-ID')}</td>
                  <td className="px-5 py-4 whitespace-nowrap">{log.user?.username || 'System'} (ID {log.userId || '-'})</td>
                  <td className="px-5 py-4 whitespace-nowrap font-semibold">{log.action}</td>
                  <td className="px-5 py-4">{log.description}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${log.status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
