import { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';

export default function Terminal() {
  const typedRef = useRef(null);
  const [solPrice, setSolPrice] = useState('...');

  // Fetch Solana price (using a placeholder API, replace with a real one like CoinGecko)
  useEffect(() => {
    const fetchSolPrice = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
        const data = await res.json();
        setSolPrice(data.solana.usd);
      } catch (err) {
        setSolPrice('N/A');
      }
    };
    fetchSolPrice();
    const interval = setInterval(fetchSolPrice, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const options = {
      strings: [
        'Welcome to Tkay’s World.',
        'I build systems, break boundaries, and bend code to my will.',
        'Tokoni Orukaria - Final Year Comp Sci Student.',
        'Skills: .NET, Rust, Solana, React, and more.',
        'Scroll down to explore... ^1000'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      loop: false,
    };

    const typed = new Typed(typedRef.current, options);
    return () => typed.destroy();
  }, []);

  return (
    <div className="w-full max-w-2xl p-6 bg-black bg-opacity-80 border-2 border-green-500 rounded-lg shadow-lg relative">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
      <div className="text-green-400 font-mono text-lg">
        <span className="text-green-600">tkay@portfolio:~$</span> <span ref={typedRef}></span>
      </div>
      <div className="absolute top-2 right-4 text-sm text-purple-400">
        SOL: ${solPrice}
      </div>
    </div>
  );
}