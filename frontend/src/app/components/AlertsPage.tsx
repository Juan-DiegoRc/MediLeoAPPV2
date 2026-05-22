import { AlertTriangle, TrendingUp, Thermometer, Zap, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface Alert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  resolved: boolean;
}

const alerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    icon: <Thermometer size={20} />,
    title: 'Sobrecalentamiento Detectado',
    description: 'La temperatura alcanzó 68°C en el panel principal',
    time: 'Hace 5 min',
    resolved: false,
  },
  {
    id: '2',
    type: 'warning',
    icon: <TrendingUp size={20} />,
    title: 'Consumo Alto',
    description: 'El consumo superó el promedio en un 42%',
    time: 'Hace 1 hora',
    resolved: false,
  },
  {
    id: '3',
    type: 'info',
    icon: <CheckCircle size={20} />,
    title: 'Sistema Actualizado',
    description: 'Se instaló la versión 2.3.1 del firmware',
    time: 'Hace 30 min',
    resolved: false,
  },
];

const getAlertColor = (type: Alert['type'], resolved: boolean) => {
  if (resolved) return 'gray';
  switch (type) {
    case 'critical':
      return 'red';
    case 'warning':
      return 'amber';
    case 'info':
      return 'blue';
  }
};

function AlertCard({ alert, index }: { alert: Alert; index: number }) {
  const color = getAlertColor(alert.type, alert.resolved);

  const bgColors = {
    red: 'from-red-50 to-rose-50 border-red-200',
    amber: 'from-amber-50 to-yellow-50 border-amber-200',
    blue: 'from-blue-50 to-cyan-50 border-blue-200',
    gray: 'from-gray-50 to-slate-50 border-gray-200',
  };

  const iconColors = {
    red: 'bg-red-500 text-white',
    amber: 'bg-amber-500 text-white',
    blue: 'bg-blue-500 text-white',
    gray: 'bg-gray-400 text-white',
  };

  const textColors = {
    red: 'text-red-900',
    amber: 'text-amber-900',
    blue: 'text-blue-900',
    gray: 'text-gray-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-gradient-to-br ${bgColors[color]} border rounded-2xl p-4 shadow-sm ${
        alert.resolved ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2.5 rounded-xl ${iconColors[color]} flex-shrink-0`}>
          {alert.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className={`font-display text-sm ${textColors[color]}`}>
              {alert.title}
            </h4>
            {alert.resolved ? (
              <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
            ) : (
              <XCircle size={16} className={`${textColors[color]} flex-shrink-0`} />
            )}
          </div>
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
            {alert.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{alert.time}</span>
            {alert.resolved && (
              <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                Resuelto
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AlertsPage() {
  const activeAlerts = alerts.filter(a => !a.resolved);
  const resolvedAlerts = alerts.filter(a => a.resolved);

  return (
    <div className="pb-24 px-4 pt-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-display mb-1 bg-gradient-to-r from-[var(--energy-blue-dark)] to-[var(--energy-cyan)] bg-clip-text text-transparent">
          Alertas
        </h1>
        <p className="text-sm text-gray-500">Monitoreo de eventos y anomalías</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-3 mb-6"
      >
        <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-xl p-4 text-white shadow-lg">
          <div className="text-2xl font-display mb-1">
            {alerts.filter(a => !a.resolved && a.type === 'critical').length}
          </div>
          <div className="text-xs opacity-90">Críticas</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl p-4 text-white shadow-lg">
          <div className="text-2xl font-display mb-1">
            {alerts.filter(a => !a.resolved && a.type === 'warning').length}
          </div>
          <div className="text-xs opacity-90">Alertas</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-4 text-white shadow-lg">
          <div className="text-2xl font-display mb-1">
            {alerts.filter(a => !a.resolved && a.type === 'info').length}
          </div>
          <div className="text-xs opacity-90">Info</div>
        </div>
      </motion.div>

      <div className="mb-6">
        <h3 className="font-display text-sm mb-3 text-gray-700 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          Alertas Activas ({activeAlerts.length})
        </h3>
        <div className="space-y-3">
          {activeAlerts.map((alert, idx) => (
            <AlertCard key={alert.id} alert={alert} index={idx} />
          ))}
          {activeAlerts.length === 0 && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 text-center">
              <CheckCircle className="mx-auto mb-2 text-green-500" size={32} />
              <p className="text-sm text-green-700 font-display">No hay alertas activas</p>
              <p className="text-xs text-green-600 mt-1">Todo funcionando normalmente</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-display text-sm mb-3 text-gray-500 flex items-center gap-2">
          <CheckCircle size={14} />
          Resueltas ({resolvedAlerts.length})
        </h3>
        <div className="space-y-3">
          {resolvedAlerts.map((alert, idx) => (
            <AlertCard key={alert.id} alert={alert} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}