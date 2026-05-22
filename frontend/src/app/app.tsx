import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import HomePage from './components/HomePage';
import AnalyticsPage from './components/AnalyticsPage';
import AlertsPage from './components/AlertsPage';
import AIAssistantPage from './components/AIAssistantPage';
import BottomNav from './components/BottomNav';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'alerts':
        return <AlertsPage />;
      case 'assistant':
        return <AIAssistantPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="size-full bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />

      <div className="relative size-full max-w-md mx-auto overflow-y-auto">
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