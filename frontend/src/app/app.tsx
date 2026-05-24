import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import HomePage from './components/HomePage';
import AnalyticsPage from './components/AnalyticsPage';
import AlertsPage from './components/AlertsPage';
import AIAssistantPage from './components/AIAssistantPage';
import BottomNav from './components/BottomNav';
import { useMetricsSocket } from './hooks/useMetricsSocket';
 
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const { connected, metrics } = useMetricsSocket({ url: 'http://localhost:3000' });
 
  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage metrics={metrics} connected={connected} />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'alerts':
        return <AlertsPage />;
      case 'assistant':
        return <AIAssistantPage />;
      default:
        return <HomePage metrics={metrics} connected={connected} />;
    }
  };
 
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white">
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
 
      <div className="relative w-full max-w-full md:max-w-4xl lg:max-w-6xl mx-auto overflow-y-auto pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>
 
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}