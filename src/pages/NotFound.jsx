import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        {/* Large 404 */}
        <h1 className="text-white text-9xl font-bold mb-4 tracking-tight">
          404
        </h1>
        
        {/* Subtitle */}
        <h2 className="text-white text-3xl font-semibold mb-4">
          Page Not Found
        </h2>
        
        {/* Description */}
        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
          
          <button 
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-black transition-colors"
          >
            <Home size={20} />
            Home Page
          </button>
        </div>
        
        {/* Decorative Element */}
        <div className="mt-12 flex justify-center">
          <div className="w-24 h-1 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;