import React from "react";
import { Clock, Phone, Settings, ShieldAlert, Sparkles } from "lucide-react";

export default function BookACall() {
  return (
    <section className="bg-white border border-gray-200/60 p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-gray-250/10">
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Explanation Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15">
            <Sparkles className="w-3.5 h-3.5 text-secondary-indigo" />
            <span className="text-[10px] font-bold text-secondary-indigo uppercase tracking-wider">Direct Access</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight leading-tight">
            Select a Time to Meet Our Engineers
          </h3>
          <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-semibold">
            Skip sales reps. Book a direct synchronization call with our engineering partners to talk code stacks, NDAs, and developer sprint capacity.
          </p>

          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold text-xs shrink-0">1</div>
              <div>
                <h5 className="font-bold text-gray-900 text-xs">15-Minute Intro Call</h5>
                <p className="text-[10px] text-gray-500 font-semibold leading-relaxed">Align on agency workflow, monthly project frequency, and active developer requirements.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center font-bold text-xs shrink-0">2</div>
              <div>
                <h5 className="font-bold text-gray-900 text-xs">Project Scope Discussion</h5>
                <p className="text-[10px] text-gray-500 font-semibold leading-relaxed">Review Figma wireframes, database layouts, or custom API brief folders.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center font-bold text-xs shrink-0">3</div>
              <div>
                <h5 className="font-bold text-gray-900 text-xs">Engineering Consultation</h5>
                <p className="text-[10px] text-gray-500 font-semibold leading-relaxed">Formulate technical architectures, deploy staging servers, and sign standard NDAs.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center font-bold text-xs shrink-0">4</div>
              <div>
                <h5 className="font-bold text-gray-900 text-xs">Agency Partnership Kickoff</h5>
                <p className="text-[10px] text-gray-500 font-semibold leading-relaxed">Review SLA contracts, assign dedicated developer squads, and launch the first white-label sprint.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Right Scheduler Widget Column */}
        <div className="lg:col-span-7 bg-[#F9FAFB] border border-gray-200/80 rounded-2xl overflow-hidden p-6 md:p-8 flex flex-col justify-between min-h-[380px]">
          <div className="flex items-center justify-between border-b border-gray-150 pb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
              <Clock className="w-4 h-4 text-secondary-indigo" />
              <span>Calendly Sync Protocol</span>
            </div>
            <span className="text-[9px] font-bold bg-green-500/10 text-green-700 border border-green-200 px-2 py-0.5 rounded uppercase">Online</span>
          </div>

          {/* Calendly Interactive Placeholder UI Mockup */}
          <div className="flex-1 flex flex-col items-center justify-center text-center py-8 space-y-4">
            <div className="p-3 bg-white border border-gray-200 rounded-full shadow-sm">
              <Phone className="w-6 h-6 text-[#737CFD] animate-pulse" />
            </div>
            <h4 className="font-bold text-gray-900 text-base">Select Date & Time Range</h4>
            <p className="text-xs text-gray-400 font-semibold max-w-xs">
              Calendly scheduling frame is configured. Click below to select hours and reserve your briefing.
            </p>
            <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
              <button className="bg-white border border-gray-200 py-2.5 rounded-lg text-xs font-bold text-gray-700 hover:border-secondary-indigo hover:text-secondary-indigo transition-all">Thu, 10:00 AM</button>
              <button className="bg-white border border-gray-200 py-2.5 rounded-lg text-xs font-bold text-gray-700 hover:border-secondary-indigo hover:text-secondary-indigo transition-all">Fri, 02:30 PM</button>
              <button className="bg-white border border-gray-200 py-2.5 rounded-lg text-xs font-bold text-gray-700 hover:border-secondary-indigo hover:text-secondary-indigo transition-all">Mon, 11:15 AM</button>
            </div>
          </div>

          <a 
            href="https://calendly.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full btn-pill btn-primary-glow text-white text-center py-2.5 text-xs shadow-md font-bold"
          >
            Launch Calendly Integration
          </a>
        </div>

      </div>
    </section>
  );
}
