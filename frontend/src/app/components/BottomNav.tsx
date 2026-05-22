import { Home, BarChart3, Bell, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'home', icon: Home, label: 'Inicio' },
  { id: 'analytics', icon: BarChart3, label: 'Análisis' },
  { id: 'alerts', icon: Bell, label: 'Alertas' },
  { id: 'assistant', icon: Sparkles, label: 'Asistente' },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200 px-2 pb-safe"
    >
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onTabChange(item.id)}
              className="flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all relative"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className="relative z-10">
                <Icon
                  size={22}
                  className={`transition-colors ${
                    isActive
                      ? 'text-[var(--energy-blue-medium)]'
                      : 'text-gray-400'
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              <span
                className={`text-xs relative z-10 transition-colors ${
                  isActive
                    ? 'text-[var(--energy-blue-dark)] font-display'
                    : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
              {item.id === 'alerts' && (
                <div className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}