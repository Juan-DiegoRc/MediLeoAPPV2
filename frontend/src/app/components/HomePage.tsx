import { Zap, TrendingUp, TrendingDown, Activity, Thermometer, Gauge } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from 'motion/react';

const realTimeData = [
  { time: '00:00', power: 245 },
  { time: '04:00', power: 189 },
  { time: '08:00', power: 412 },
  { time: '12:00', power: 523 },
  { time: '16:00', power: 487 },
  { time: '20:00', power: 356 },
  { time: '24:00', power: 298 },
];

const comparisonData = [
  { day: 'Lun', consumption: 45 },
  { day: 'Mar', consumption: 52 },
  { day: 'Mié', consumption: 38 },
  { day: 'Jue', consumption: 61 },
  { day: 'Vie', consumption: 48 },
  { day: 'Sáb', consumption: 42 },
  { day: 'Dom', consumption: 35 },
];

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  trend: 'up' | 'down';
  trendValue: string;
  featured?: boolean;
}

function MetricCard({ icon, label, value, unit, trend, trendValue, featured }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${
        featured
          ? 'from-[var(--energy-blue-light)] to-[var(--energy-cyan)] text-white col-span-2 p-6'
          : 'from-white to-gray-50 border border-[var(--border)] p-5'
      } shadow-lg`}
    >
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-xl ${featured ? 'bg-white/20' : 'bg-gradient-to-br from-blue-50 to-cyan-50'}`}>
          <div className={featured ? 'text-white' : 'text-[var(--energy-blue-medium)]'}>
            {icon}
          </div>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
          trend === 'up'
            ? featured ? 'bg-white/20' : 'bg-emerald-50 text-emerald-600'
            : featured ? 'bg-white/20' : 'bg-red-50 text-red-600'
        }`}>
          {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span className="text-xs">{trendValue}</span>
        </div>
      </div>
      <div className="mt-4">
        <p className={`text-sm ${featured ? 'text-white/80' : 'text-gray-500'} mb-1`}>{label}</p>
        <div className="flex items-baseline gap-2">
          <span className={`${featured ? 'text-4xl' : 'text-3xl'} font-display tracking-tight`}>
            {value}
          </span>
          <span className={`text-lg ${featured ? 'text-white/70' : 'text-gray-400'}`}>{unit}</span>
        </div>
      </div>
      {featured && (
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      )}
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <div className="pb-24 px-4 pt-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-display mb-2 bg-gradient-to-r from-[var(--energy-blue-dark)] to-[var(--energy-cyan)] bg-clip-text text-transparent">
          Panel de Energía
        </h1>
        <div className="flex gap-2 mt-4">
          {['Hoy', 'Semana', 'Mes'].map((filter, idx) => (
            <motion.button
              key={filter}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                idx === 0
                  ? 'bg-gradient-to-r from-[var(--energy-blue-light)] to-[var(--energy-cyan)] text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white border border-[var(--border)] text-gray-600 hover:border-blue-300'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <MetricCard
          icon={<Zap size={24} />}
          label="Voltaje"
          value="220"
          unit="V"
          trend="up"
          trendValue="2.1%"
        />
        <MetricCard
          icon={<Activity size={24} />}
          label="Corriente"
          value="12.5"
          unit="A"
          trend="down"
          trendValue="1.3%"
        />
        <MetricCard
          icon={<Gauge size={24} />}
          label="Potencia"
          value="2.75"
          unit="kW"
          trend="up"
          trendValue="5.2%"
          featured
        />
        <MetricCard
          icon={<Zap size={24} />}
          label="Energía"
          value="156"
          unit="kWh"
          trend="up"
          trendValue="3.8%"
        />
        <MetricCard
          icon={<Thermometer size={24} />}
          label="Temperatura"
          value="42"
          unit="°C"
          trend="down"
          trendValue="0.5%"
        />
        <MetricCard
          icon={<Activity size={24} />}
          label="Factor Potencia"
          value="0.92"
          unit=""
          trend="up"
          trendValue="1.1%"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-5 shadow-lg border border-[var(--border)] mb-6"
      >
        <h3 className="font-display mb-4 text-[var(--energy-blue-dark)]">Consumo en Tiempo Real</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={realTimeData}>
            <defs>
              <linearGradient id="powerGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--energy-gradient-start)" stopOpacity={0.8} />
                <stop offset="100%" stopColor="var(--energy-gradient-end)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
            <XAxis
              dataKey="time"
              stroke="#94a3b8"
              style={{ fontSize: '12px', fontFamily: 'var(--font-body)' }}
            />
            <YAxis
              stroke="#94a3b8"
              style={{ fontSize: '12px', fontFamily: 'var(--font-body)' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Area
              type="monotone"
              dataKey="power"
              stroke="var(--energy-blue-light)"
              strokeWidth={3}
              fill="url(#powerGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-5 shadow-lg border border-[var(--border)]"
      >
        <h3 className="font-display mb-4 text-[var(--energy-blue-dark)]">Comparativa Semanal</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
            <XAxis
              dataKey="day"
              stroke="#94a3b8"
              style={{ fontSize: '12px', fontFamily: 'var(--font-body)' }}
            />
            <YAxis
              stroke="#94a3b8"
              style={{ fontSize: '12px', fontFamily: 'var(--font-body)' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Bar
              dataKey="consumption"
              fill="url(#barGradient)"
              radius={[8, 8, 0, 0]}
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--energy-blue-light)" />
                <stop offset="100%" stopColor="var(--energy-cyan)" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}