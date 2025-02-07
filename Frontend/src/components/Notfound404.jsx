import { useState, useEffect } from 'react';
import { Home } from 'lucide-react';

export default function NotFound404() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
    
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}`}>
          <h1 className="text-9xl font-bold text-white mb-4">
            4
            <span className="inline-block animate-bounce mx-2">0</span>
            4
          </h1>
        </div>
        
        <div className={`text-center transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Oops! Page not found
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-md">
            The page you're looking for doesn't exist or has been moved to another location.
          </p>
          
          <button
            onClick={() => window.location.href='/'}
            className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-blue-600/30 rounded-lg overflow-hidden transition-all duration-300 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 hover:cursor-pointer"
          >
            <span className="absolute inset-0 w-full h-full transition-all duration-300 transform translate-x-full group-hover:translate-x-0 bg-blue-500 opacity-30"></span>
            <Home className="w-5 h-5 mr-2" />
            Go Home Page
          </button>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-500 rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}