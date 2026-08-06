import React from 'react';

/**
 * FaqCard
 * Reusable card for a single FAQ item.
 */
export const FaqCard = ({ question, answer }: { question: string; answer: string }) => {
  return (
    <div className="flex flex-col items-start gap-3 p-6 bg-white dark:bg-slate-900 border border-border/60 rounded-2xl shadow-md hover:shadow-xl hover:border-blue-500/40 transition-all duration-300 w-80 sm:w-96 flex-shrink-0 faq-card">
      <h3 className="text-base sm:text-lg font-semibold text-foreground faq-title leading-snug">{question}</h3>
      <p className="text-xs sm:text-sm text-muted-foreground faq-answer leading-relaxed">{answer}</p>
    </div>
  );
};

/**
 * HorizontalScroller
 * Wraps children and creates a seamless horizontal looping animation.
 */
export const HorizontalScroller = ({
  children,
  speed = '40s',
  direction = 'left'
}: {
  children: React.ReactNode;
  speed?: string;
  direction?: 'left' | 'right';
}) => {
  const animationClass =
    direction === 'right' ? 'animate-scroll-horizontal-reverse' : 'animate-scroll-horizontal';

  // Inline style to set the CSS custom property for scroll duration.
  const style = { '--scroll-duration': speed } as React.CSSProperties;

  return (
    <div className="w-full overflow-hidden group relative scroller-mask py-2">
      <div className={`flex ${animationClass} group-hover:[animation-play-state:paused]`} style={style}>
        <div className="flex items-stretch justify-center flex-shrink-0 gap-6 sm:gap-8 px-4">
          {children}
        </div>
        {/* duplicate for seamless loop */}
        <div className="flex items-stretch justify-center flex-shrink-0 gap-6 sm:gap-8 px-4" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqRow {
  id: string;
  speed?: string;
  direction?: 'left' | 'right';
  faqItems: FaqItem[];
}

export interface FaqData {
  mainTitle?: string;
  mainSubtitle?: string;
  rows: FaqRow[];
}

/**
 * FaqSection
 * Assembles title, subtitle, and multiple horizontal rows.
 */
const FaqSection = ({ data }: { data: FaqData }) => {
  return (
    <div className="relative flex flex-col items-center gap-8 sm:gap-10 py-12 w-full max-w-7xl mx-auto overflow-hidden">
      {data.mainTitle && (
        <div className="flex flex-col items-center gap-3 text-center z-10 max-w-3xl px-4">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-md bg-blue-600/10 border-l-4 border-blue-600 text-blue-600 text-xs font-semibold tracking-wider uppercase select-none">
            FAQs
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight animate-fade-in-up"
          >
            {data.mainTitle}
          </h2>
          {data.mainSubtitle && (
            <p
              className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl"
            >
              {data.mainSubtitle}
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-6 sm:gap-8 z-10 w-full">
        {data.rows.map((row) => (
          <HorizontalScroller key={row.id} speed={row.speed} direction={row.direction}>
            {row.faqItems.map((item) => (
              <FaqCard key={item.id} question={item.question} answer={item.answer} />
            ))}
          </HorizontalScroller>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
