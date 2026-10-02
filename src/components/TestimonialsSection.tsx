import React from 'react';
import { Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote:
        'X Marketing transformed our $45M Miami penthouse launch from an ordinary portal listing into an international cultural event. Their targeted geo-fencing in Aspen and Zurich brought two competing cash buyers within 60 days.',
      author: 'Marcus Vance',
      role: 'Managing Director of Luxury Developments',
      organization: "Sotheby's International Realty",
      location: 'Miami & Palm Beach',
    },
    {
      quote:
        'Most agencies deliver pretty renders and zero verified buyers. X Marketing delivered 184 fully vetted off-market inquiries for our London Mayfair conversion and pre-sold £72M before scaffolding was even dismantled.',
      author: 'Helena Sterling',
      role: 'Head of Global Capital Acquisitions',
      organization: 'Mayfair Heritage Fund',
      location: 'London, UK',
    },
    {
      quote:
        'In the New York ultra-prime tier, speed to contract is everything. X Marketing engineered a bespoke buyer verification pipeline that reduced our days on market by 42% on Billionaires Row.',
      author: 'David Chen',
      role: 'Senior Vice President of Development',
      organization: 'Horizon Properties Group',
      location: 'New York, NY',
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#050507] border-t border-neutral-900 relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#FF0000] mb-3">
            <span>Client Perspectives</span>
            <span aria-hidden="true">·</span>
            <span className="text-neutral-400">Institutional Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight font-heading">
            Trusted by Premier Real Estate Leaders.
          </h2>
          <p className="mt-4 text-neutral-400 text-sm md:text-base leading-relaxed">
            Direct feedback from asset managers, development sponsors, and premier brokerage directors worldwide.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0b0b0e] border border-neutral-800 rounded-xl p-8 flex flex-col justify-between hover:border-[#FF0000]/40 transition-colors relative group"
            >
              <div>
                <Quote className="w-8 h-8 text-[#FF0000]/60 mb-6 group-hover:text-[#FF0000] transition-colors" />
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-800/80">
                <div className="font-bold text-white font-heading text-base">
                  {item.author}
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  {item.role}
                </div>
                <div className="text-xs text-[#FF0000] font-medium mt-1">
                  {item.organization} · {item.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
