const getApiUrl = () => {
  let url = import.meta.env.VITE_API_URL || 'https://coreslashtechnologies.onrender.com/api';
  
  // Resolve localhost to current host for local network debugging (e.g. mobile testing)
  if (typeof window !== 'undefined' && window.location) {
    const hostname = window.location.hostname;
    if (hostname && hostname !== 'localhost' && url.includes('localhost')) {
      url = url.replace('localhost', hostname);
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
    whatsappPhone: import.meta.env.VITE_WHATSAPP_PHONE || '+918861220023',
    whatsappLink: import.meta.env.VITE_WHATSAPP_LINK || 'https://wa.me/918861220023',
    whatsappLinkSecondary: import.meta.env.VITE_WHATSAPP_LINK_SECONDARY || 'https://wa.me/919513013247',
    linkedin: import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/company/coreslash-technologies/',
    instagram: import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/coreslashtechnologies/',
  },
  contact: {
    email: import.meta.env.VITE_SUPPORT_EMAIL || 'coreslashtechnologies@gmail.com',
    emailLink: import.meta.env.VITE_SUPPORT_EMAIL_LINK || 'https://mail.google.com/mail/?view=cm&fs=1&to=coreslashtechnologies@gmail.com',
    mapsLink: import.meta.env.VITE_GOOGLE_MAPS_LINK || 'https://maps.google.com',
  }
};
