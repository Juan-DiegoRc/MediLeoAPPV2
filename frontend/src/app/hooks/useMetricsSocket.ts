import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type Metric = {
  device_id: string;
  potencia: number;
  timestamp: string | number | Date;
  [key: string]: any;
};

export function useMetricsSocket({ url = 'http://localhost:3000', token }: { url?: string; token?: string }) {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    const opts: any = {};
    if (token) opts.auth = { token };

    const socket = io(url, opts);
    socketRef.current = socket;

    console.log('Intentando conectar a:', url);

    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));

    socket.on('metrics:update', (payload: Metric) => {
      setMetrics((prev) => [payload, ...prev].slice(0, 100));
    });

    socket.on('connect_error', (err: any) => console.error('Socket connect error', err));

    return () => {
      socket.removeAllListeners();
      socket.close();
    };
  }, [url, token]);

  return { socket: socketRef.current, connected, metrics } as const;
}

export default useMetricsSocket;
