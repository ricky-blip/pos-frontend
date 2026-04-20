import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import PropTypes from 'prop-types';

/**
 * DashboardChart - Komponen grafik batang untuk tren penjualan
 * @param {Array} data - [{ date, Foods, Beverages, Desserts }]
 * @param {boolean} isLoading - Loading state
 */
export default function DashboardChart({ data, isLoading }) {
  if (isLoading) {
    return (
      <div className="h-80 w-full flex items-center justify-center bg-gray-50 rounded-xl animate-pulse">
        <span className="text-gray-400 font-medium">Memuat grafik...</span>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-80 w-full flex items-center justify-center bg-gray-50 rounded-xl">
        <span className="text-gray-400 font-medium italic">Tidak ada data untuk periode ini</span>
      </div>
    );
  }

  // Format tanggal untuk sumbu X (misal: 2026-04-20 -> 20 Apr)
  const formatXAxis = (tickItem) => {
    try {
      const date = new Date(tickItem);
      return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    } catch (e) {
      return tickItem;
    }
  };

  // Format angka untuk sumbu Y (misal: 1000000 -> 1jt)
  const formatYAxis = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}jt`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}rb`;
    return value;
  };

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barGap={4}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatXAxis} 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            tickFormatter={formatYAxis} 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
          />
          <Tooltip 
            cursor={{ fill: '#F3F4F6' }}
            contentStyle={{ 
              borderRadius: '12px', 
              border: 'none', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              fontSize: '12px',
              padding: '12px'
            }}
            formatter={(value) => [`Rp ${value?.toLocaleString('id-ID')}`, 'Omzet']}
            labelFormatter={formatXAxis}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}
          />
          <Bar dataKey="Foods" name="Foods" fill="#1E40AF" radius={[4, 4, 0, 0]} barSize={16} />
          <Bar dataKey="Beverages" name="Beverages" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={16} />
          <Bar dataKey="Desserts" name="Desserts" fill="#93C5FD" radius={[4, 4, 0, 0]} barSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

DashboardChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool
};
