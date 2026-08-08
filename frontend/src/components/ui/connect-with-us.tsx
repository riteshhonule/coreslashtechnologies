import React from 'react';

const SocialConnect: React.FC = () => {

  return (
    <div className="w-full py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-black flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden border-t border-border/40">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-3xl mx-auto text-center mb-16 relative z-10">
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-400 mb-6 tracking-tight">
          Connect <span className="text-white">With Us</span>
        </h2>
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
          Join our community and stay updated with the latest engineering insights, product releases, and tech trends.
        </p>
      </div>

      <div className="relative w-full max-w-2xl z-10">
        {/* 3D Glowing Container */}
        <div
          className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/95 to-slate-950/90 border border-slate-700/60 shadow-2xl backdrop-blur-3xl overflow-hidden p-8 sm:p-12 transition-all duration-500 hover:scale-[1.02]"
          style={{
            boxShadow: '0 0 50px rgba(59, 130, 246, 0.4), 0 0 80px rgba(99, 102, 241, 0.25)'
          }}
        >
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/coreslashtechnologies?igsh=MWRmaTN2am1wNG1kdw%3D%3D&utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon instagram"
            >
              <div className="icon-container">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-7 w-7 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  ></path>
                </svg>
              </div>
              <span className="icon-label">Instagram</span>
            </a>

            {/* Facebook */}
            <a 
              href="https://www.facebook.com/profile.php?id=61591466563226" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon facebook"
            >
              <div className="icon-container">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-7 w-7 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  ></path>
                </svg>
              </div>
              <span className="icon-label">Facebook</span>
            </a>

            {/* X / Twitter */}
            <a 
              href="https://x.com/CoreSlashTech" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon x-twitter"
            >
              <div className="icon-container">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                  ></path>
                </svg>
              </div>
              <span className="icon-label">X</span>
            </a>

            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/company/coreslash-technologies/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon linkedin"
            >
              <div className="icon-container">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-7 w-7 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  ></path>
                </svg>
              </div>
              <span className="icon-label">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .social-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }
        
        .icon-container {
          display: inline-flex;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          transition: all 0.3s ease;
          position: relative;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .social-icon:hover .icon-container {
          transform: translateY(-10px) scale(1.1);
        }
        
        .social-icon:hover .icon-label {
          opacity: 1;
          transform: translateY(5px);
        }
        
        .icon-label {
          margin-top: 12px;
          color: white;
          font-weight: 600;
          opacity: 0.75;
          transition: all 0.3s ease;
        }
        
        .social-icon.instagram:hover .icon-container {
          background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
          box-shadow: 0 0 25px rgba(225, 48, 108, 0.6);
        }
        
        .social-icon.facebook:hover .icon-container {
          background: #1877F2;
          box-shadow: 0 0 25px rgba(24, 119, 242, 0.6);
        }
        
        .social-icon.x-twitter:hover .icon-container {
          background: #000000;
          box-shadow: 0 0 25px rgba(255, 255, 255, 0.4);
          border-color: rgba(255, 255, 255, 0.3);
        }
        
        .social-icon.linkedin:hover .icon-container {
          background: #0a66c2;
          box-shadow: 0 0 25px rgba(10, 102, 194, 0.6);
        }
        
        .social-icon:hover svg {
          animation: shake 0.5s;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0); }
          20% { transform: translateX(-5px) rotate(-5deg); }
          40% { transform: translateX(5px) rotate(5deg); }
          60% { transform: translateX(-5px) rotate(-5deg); }
          80% { transform: translateX(5px) rotate(5deg); }
        }
        
        .icon-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }
        
        .social-icon:hover .icon-container::before {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export { SocialConnect };
