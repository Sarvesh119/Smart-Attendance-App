// frontend/src/components/ChartCard.jsx
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export function LineChartCard({ title, data }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4">
      <h3 className="mb-2 font-medium">{title}</h3>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="attendance" stroke="#6366F1" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BarChartCard({ title, data }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4">
      <h3 className="mb-2 font-medium">{title}</h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="className" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="attendance" fill="#10B981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
