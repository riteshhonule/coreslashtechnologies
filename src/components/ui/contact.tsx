import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { FaLinkedinIn, FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";

interface ContactSectionProps {
  /**
   * The title for the contact section.
   */
  title?: string;
  /**
   * The subtitle or main message for the introductory part.
   */
  mainMessage?: string;
  /**
   * The contact email to display.
   */
  contactEmail?: string;
  /**
   * Placeholder image for the background.
   */
  backgroundImageSrc?: string;
  /**
   * Callback function when the form is submitted.
   * @param data The form data.
   */
  onSubmit?: (data: any) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  title = "We can turn your dream project into reality",
  mainMessage = "Let's talk! 👋",
  contactEmail = "contact@coreslashtechnologies.com",
  backgroundImageSrc = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&fit=crop&q=80",
  onSubmit,
}) => {
  const [formData, setFormData] = React.useState<{
    name: string;
    email: string;
    message: string;
    projectType: string[];
  }>({
    name: '',
    email: '',
    message: '',
    projectType: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (type: string, checked: boolean) => {
    setFormData((prev) => {
      const currentTypes = prev.projectType;
      if (checked) {
        return { ...prev, projectType: [...currentTypes, type] };
      } else {
        return { ...prev, projectType: currentTypes.filter((t) => t !== type) };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    console.log("Form submitted:", formData);
  };

  const projectTypeOptions = [
    'Website', 'Mobile App', 'Web App', 'E-Commerce',
    'Brand Identity', '3D & Animation', 'Social Media Marketing',
    'Brand Strategy & Consulting', 'Other'
  ];

  return (
    <section className="relative w-full h-[calc(100vh-80px)] min-h-[580px] max-h-[900px] overflow-hidden bg-background flex items-center justify-center">
      {/* Background Image and Animated Bubbles */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out"
        style={{ backgroundImage: `url(${backgroundImageSrc})` }}
      >
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />
        
        {/* Animated Bubbles */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/15 rounded-full animate-bubble opacity-0"
              style={{
                width: `${Math.random() * 18 + 8}px`,
                height: `${Math.random() * 18 + 8}px`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${Math.random() * 16 + 8}s`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content Container - Single Screen Compact Layout */}
      <div className="relative z-10 flex flex-col justify-center items-center w-full h-full p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        
        {/* Main Section - Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 w-full items-center">
          
          {/* Left Side: Title */}
          <div className="lg:col-span-6 flex flex-col justify-center p-2 lg:p-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-bold text-white leading-[1.15] drop-shadow-md max-w-lg">
              {title}
            </h1>
          </div>

          {/* Right Side: Contact Form Card */}
          <div className="lg:col-span-6 bg-background/95 dark:bg-slate-900/95 backdrop-blur-md p-5 sm:p-6 rounded-2xl shadow-2xl border border-border/60">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">{mainMessage}</h2>

            {/* Email & Crisp React Icons */}
            <div className="mb-3.5">
              <p className="text-xs text-muted-foreground mb-1 font-medium">Mail us at</p>
              <a href={`mailto:${contactEmail}`} className="text-primary hover:underline text-sm font-bold">
                {contactEmail}
              </a>
              <div className="flex items-center space-x-2.5 mt-2.5">
                <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">OR</span>
                <Button variant="outline" size="icon" asChild className="h-8 w-8 rounded-lg border-border/60 hover:bg-accent">
                  <a href="https://x.com/CoreSlashTech" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                    <FaTwitter className="h-3.5 w-3.5 text-blue-400" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild className="h-8 w-8 rounded-lg border-border/60 hover:bg-accent">
                  <a href="https://www.instagram.com/coreslashtechnologies?igsh=MWRmaTN2am1wNG1kdw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FaInstagram className="h-3.5 w-3.5 text-pink-500" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild className="h-8 w-8 rounded-lg border-border/60 hover:bg-accent">
                  <a href="https://www.facebook.com/profile.php?id=61591466563226" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <FaFacebookF className="h-3.5 w-3.5 text-blue-600" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild className="h-8 w-8 rounded-lg border-border/60 hover:bg-accent">
                  <a href="https://www.linkedin.com/company/coreslash-technologies/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <FaLinkedinIn className="h-3.5 w-3.5 text-blue-600" />
                  </a>
                </Button>
              </div>
            </div>

            <hr className="my-3.5 border-border/60" />

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <p className="text-muted-foreground text-xs font-semibold">Leave us a brief message</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-xs font-medium">Your name</Label>
                  <Input id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required className="h-9 text-xs" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-xs font-medium">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="h-9 text-xs" />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="message" className="text-xs font-medium">Briefly describe your project idea...</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Briefly describe your project idea..."
                  className="min-h-[60px] h-[60px] text-xs resize-none"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-semibold">I'm looking for...</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {projectTypeOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-1.5">
                      <Checkbox
                        id={option.replace(/\s/g, '-').toLowerCase()}
                        checked={formData.projectType.includes(option)}
                        onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean)}
                        className="h-3.5 w-3.5"
                      />
                      <Label htmlFor={option.replace(/\s/g, '-').toLowerCase()} className="text-[11.5px] font-normal cursor-pointer select-none truncate">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full h-10 text-sm font-semibold bg-[#3b82f6] hover:bg-blue-600 text-white rounded-xl shadow-md transition-all">
                Send a message
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* CSS for bubble animation */}
      <style>{`
        @keyframes bubble {
          0% {
            transform: translateY(0) translateX(0) scale(0.5);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(calc(var(--rand-x-offset) * 10vw)) scale(1.2);
            opacity: 0;
          }
        }
        .animate-bubble {
          animation: bubble var(--animation-duration, 15s) ease-in-out infinite;
          animation-fill-mode: forwards;
          --rand-x-offset: 1;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
