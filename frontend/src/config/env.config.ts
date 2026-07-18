const getApiUrl = () => {
  let url = import.meta.env.VITE_API_URL || 'https://coreslashtechnologies.onrender.com/api';
  
  if (typeof window !== 'undefined' && window.location) {
    const hostname = window.location.hostname;
    
    // Check if the current hostname is a local address
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    const isLocalIP = /^192\.168\.\d+\.\d+$/.test(hostname) || 
                      /^10\.\d+\.\d+\.\d+$/.test(hostname) || 
                      /^172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+$/.test(hostname);
    
    const isLocal = isLocalhost || isLocalIP;

    if (!isLocal) {
      // If we are on a production/deployed hostname (e.g. coreslashtechnologies.com or *.vercel.app),
      // we must use the deployed production backend instead of localhost.
      if (url.includes('localhost') || url.includes('127.0.0.1')) {
        url = 'https://coreslashtechnologies.onrender.com/api';
      }
    } else {
      // Resolve localhost to current host for local network debugging (e.g. mobile testing)
      if (hostname && hostname !== 'localhost' && url.includes('localhost')) {
        url = url.replace('localhost', hostname);
      }
    }
  }

  let cleanUrl = url.replace(/\/+$/, '');
  if (!cleanUrl.endsWith('/api')) {
    cleanUrl = `${cleanUrl}/api`;
  }
  return cleanUrl;
};

export const envConfig = {
  apiUrl: getApiUrl(),
  appUrl: import.meta.env.VITE_APP_URL || 'https://coreslashtechnologies.com',
  social: {
    whatsappPhone: import.meta.env.VITE_WHATSAPP_PHONE || '918310711652',
    whatsappLink: import.meta.env.VITE_WHATSAPP_LINK || 'https://wa.me/918310711652',
    whatsappLinkSecondary: import.meta.env.VITE_WHATSAPP_LINK_SECONDARY || 'https://wa.me/919513013247',
    linkedin: import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/company/coreslash-technologies/',
    instagram: import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/coreslashtechnologies/',
    discord: import.meta.env.VITE_DISCORD_URL || 'https://discord.com/users/coreslash_technologies',
    facebook: import.meta.env.VITE_FACEBOOK_URL || 'https://www.facebook.com/coreslashtechnologies',
    telegram: import.meta.env.VITE_TELEGRAM_URL || 'https://t.me/coreslashtechnologies',
    twitter: import.meta.env.VITE_TWITTER_URL || 'https://x.com/CoreSlashTech',
  },
  contact: {
    email: import.meta.env.VITE_SUPPORT_EMAIL || 'contact@coreslashtechnologies.com',
    emailLink: import.meta.env.VITE_SUPPORT_EMAIL_LINK || 'https://mail.google.com/mail/?view=cm&fs=1&to=contact@coreslashtechnologies.com',
    mapsLink: import.meta.env.VITE_GOOGLE_MAPS_LINK || 'https://maps.google.com',
  }
};
