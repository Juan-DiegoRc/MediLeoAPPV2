import { DollarSign, TrendingUp, Calendar, Zap } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from 'motion/react';

const monthlyData = [
  { month: 'Ene', consumption: 425, cost: 850 },
  { month: 'Feb', consumption: 398, cost: 796 },
  { month: 'Mar', consumption: 456, cost: 912 },
  { month: 'Abr', consumption: 489, cost: 978 },
  { month: 'May', consumption: 512, cost: 1024 },
  { month: 'Jun', consumption: 478, cost: 956 },
];

const hourlyTrend = [
  { hour: '00', current: 180, previous: 165 },
  { hour: '03', current: 145, previous: 140 },
  { hour: '06', current: 210, previous: 195 },
  { hour: '09', current: 385, previous: 360 },
  { hour: '12', current: 520, previous: 485 },
  { hour: '15', current: 480, previous: 510 },
  { hour: '18', current: 560, previous: 540 },
  { hour: '21', current: 425, previous: 450 },
];

const weekComparison = [
  { week: 'Sem 1', thisMonth: 112, lastMonth: 98 },
  { week: 'Sem 2', thisMonth: 125, lastMonth: 118 },
  { week: 'Sem 3', thisMonth: 118, lastMonth: 122 },
  { week: 'Sem 4', thisMonth: 134, lastMonth: 128 },
];

export default function AnalyticsPage() {
  return (
    <div className="pb-24 px-4 pt-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-display mb-1 bg-gradient-to-r from-[var(--energy-blue-dark)] to-[var(--energy-cyan)] bg-clip-text text-transparent">
          Análisis Detallado
        </h1>
        <p className="text-sm text-gray-500">Consumo, costos y tendencias</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-5 text-white shadow-lg"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <DollarSign size={20} />
            </div>
            <span className="text-sm opacity-90">Costo del Mes</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-display">$978</span>
            <span className="text-sm opacity-80">COP</span>
          </div>
          <div className="mt-2 text-xs opacity-80">+7.2% vs mes anterior</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl p-5 text-white shadow-lg"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Zap size={20} />
            </div>
            <span className="text-sm opacity-90">Promedio Diario</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-display">16.3</span>
            <span className="text-sm opacity-80">kWh</span>
          </div>
          <div className="mt-2 text-xs opacity-80">Últimos 30 días</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-5 shadow-lg border border-[var(--border)] mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-[var(--energy-blue-dark)]">Consumo Mensual</h3>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar size={14} />
            <span>Últimos 6 meses</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--energy-blue-light)" stopOpacity={0.6} />
                <stop offset="100%" stopColor="var(--energy-cyan)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
            <XAxis
              dataKey="month"
              stroke="#94a3b8"
              style={{ fontSize: '11px', fontFamily: 'var(--font-body)' }}
            />
            <YAxis
              stroke="#94a3b8"
              style={{ fontSize: '11px', fontFamily: 'var(--font-body)' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                fontSize: '12px',
              }}
            />
            <Area
              type="monotone"
              dataKey="consumption"
              stroke="var(--energy-blue-light)"
              strokeWidth={3}
              fill="url(#consumptionGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-5 shadow-lg border border-[var(--border)] mb-6"
      >
        <h3 className="font-display mb-4 text-[var(--energy-blue-dark)]">Tendencia Horaria</h3>
        <div className="flex gap-3 mb-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[var(--energy-blue-light)]" />
            <span className="text-gray-600">Esta semana</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-gray-300" />
            <span className="text-gray-600">Semana anterior</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={hourlyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
            <XAxis
              dataKey="hour"
              stroke="#94a3b8"
              style={{ fontSize: '11px', fontFamily: 'var(--font-body)' }}
            />
            <YAxis
              stroke="#94a3b8"
              style={{ fontSize: '11px', fontFamily: 'var(--font-body)' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                fontSize: '12px',
              }}
            />
            <Line
              type="monotone"
              dataKey="current"
              stroke="var(--energy-blue-light)"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="previous"
              stroke="#cbd5e1"
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-5 shadow-lg border border-[var(--border)]"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-[var(--energy-blue-medium)]" size={20} />
          <h3 className="font-display text-[var(--energy-blue-dark)]">Comparación Semanal</h3>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weekComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
            <XAxis
              dataKey="week"
              stroke="#94a3b8"
              style={{ fontSize: '11px', fontFamily: 'var(--font-body)' }}
            />
            <YAxis
              stroke="#94a3b8"
              style={{ fontSize: '11px', fontFamily: 'var(--font-body)' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="thisMonth" fill="var(--energy-blue-light)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="lastMonth" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex gap-3 mt-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-[var(--energy-blue-light)]" />
            <span className="text-gray-600">Este mes</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-gray-300" />
            <span className="text-gray-600">Mes anterior</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}