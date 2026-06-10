export const envConfig = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  appUrl: import.meta.env.VITE_APP_URL || 'https://core-slash.vercel.app',
  social: {
    whatsappPhone: import.meta.env.VITE_WHATSAPP_PHONE || '918861220023',
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
