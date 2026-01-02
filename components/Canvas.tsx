
import React, { useState } from 'react';
import { WebsiteData, SectionType } from '../types';

interface CanvasProps {
  website: WebsiteData;
}

const Canvas: React.FC<CanvasProps> = ({ website }) => {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const containerClasses = {
    desktop: 'w-full',
    tablet: 'w-[768px] mx-auto',
    mobile: 'w-[375px] mx-auto'
  };

  return (
    <div className="flex-1 bg-slate-100 flex flex-col h-full overflow-hidden">
      {/* Viewport Toggles */}
      <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
           <span className="text-sm font-medium text-slate-500 truncate max-w-[200px]">{website.name}</span>
           <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md">
             {(['desktop', 'tablet', 'mobile'] as const).map(mode => (
               <button
                 key={mode}
                 onClick={() => setViewport(mode)}
                 className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                   viewport === mode ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                 }`}
               >
                 <i className={`fa-solid fa-${mode === 'mobile' ? 'mobile-screen' : mode}`}></i>
               </button>
             ))}
           </div>
        </div>
        <div className="flex items-center gap-2">
            <div className="px-2 py-1 rounded bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider">Live Preview</div>
        </div>
      </div>

      {/* Website Frame */}
      <div className="flex-1 overflow-y-auto p-8 flex justify-center scroll-smooth">
        <div className={`${containerClasses[viewport]} bg-white shadow-2xl rounded-xl overflow-hidden transition-all duration-300 min-h-full`}>
           <WebsiteRenderer website={website} />
        </div>
      </div>
    </div>
  );
};

const WebsiteRenderer: React.FC<{ website: WebsiteData }> = ({ website }) => {
  const theme = website.theme;

  return (
    <div className="w-full">
      {website.sections.map((section) => {
        switch (section.type) {
          case SectionType.HERO:
            return (
              <section key={section.id} className="relative py-20 px-6 overflow-hidden min-h-[600px] flex items-center">
                <div 
                  className="absolute inset-0 z-0 opacity-10" 
                  style={{ backgroundColor: theme.primaryColor }}
                ></div>
                {section.imageUrl && (
                    <img src={section.imageUrl} className="absolute inset-0 w-full h-full object-cover -z-10 brightness-[0.4]" alt="hero" />
                )}
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg leading-tight">
                    {section.title}
                  </h1>
                  <p className="text-xl text-slate-100 mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
                    {section.subtitle}
                  </p>
                  {section.ctaText && (
                    <button 
                      className="px-10 py-4 rounded-full font-bold text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      {section.ctaText}
                    </button>
                  )}
                </div>
              </section>
            );

          case SectionType.FEATURES:
            return (
              <section key={section.id} className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">{section.title}</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">{section.subtitle}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {section.items?.map((item, i) => (
                      <div key={i} className="p-10 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:-translate-y-1 transition-all group">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-colors shadow-sm" style={{ backgroundColor: `${theme.primaryColor}15`, color: theme.primaryColor }}>
                          <i className={`fa-solid fa-${item.icon || 'star'} text-2xl`}></i>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                        <p className="text-slate-600 leading-relaxed text-base">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case SectionType.TESTIMONIALS:
            return (
              <section key={section.id} className="py-24 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                   <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">{section.title}</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">{section.subtitle}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {section.items?.map((item, i) => (
                      <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
                        <div className="mb-6">
                           <div className="flex gap-1 mb-4">
                              {[1,2,3,4,5].map(s => <i key={s} className="fa-solid fa-star text-amber-400 text-xs"></i>)}
                           </div>
                           <p className="text-slate-600 italic leading-relaxed">"{item.content || item.description || 'Amazing service, highly recommended!'}"</p>
                        </div>
                        <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                             <img src={`https://i.pravatar.cc/150?u=${item.title}`} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{item.title}</div>
                            <div className="text-sm text-slate-400">{item.role || 'Customer'}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case SectionType.ABOUT:
            return (
              <section key={section.id} className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                  <div className={section.id.length % 2 === 0 ? 'md:order-2' : ''}>
                    <h2 className="text-4xl font-bold text-slate-900 mb-8 leading-tight">{section.title}</h2>
                    <p className="text-slate-600 leading-relaxed text-lg mb-10">{section.content}</p>
                    <button className="px-8 py-3 rounded-full font-bold text-white shadow-lg transition-transform hover:scale-105" style={{ backgroundColor: theme.primaryColor }}>
                      Explore More
                    </button>
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-2xl aspect-square bg-slate-200 relative group">
                    <img 
                      src={section.imageUrl || `https://picsum.photos/seed/${section.id}/800/800`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      alt="about"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
              </section>
            );

          case SectionType.PRICING:
            return (
                <section key={section.id} className="py-24 px-6 bg-slate-900 text-white">
                    <div className="max-w-6xl mx-auto text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">{section.title}</h2>
                        <p className="text-slate-400 text-lg">{section.subtitle}</p>
                    </div>
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                        {section.items?.map((plan, i) => (
                            <div key={i} className={`p-10 rounded-3xl border ${i === 1 ? 'border-indigo-500 bg-slate-800' : 'border-slate-800 bg-slate-900'} relative flex flex-col`}>
                                {i === 1 && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Most Popular</span>}
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                                    <div className="text-5xl font-black" style={{ color: i === 1 ? 'white' : theme.primaryColor }}>{plan.price || '$99'}<span className="text-base font-normal text-slate-500">/mo</span></div>
                                </div>
                                <ul className="space-y-5 mb-10 flex-1">
                                    {(plan.features || ['Unlimited access', 'Custom integrations', '24/7 Support', 'Advanced analytics']).map((f: string, j: number) => (
                                        <li key={j} className="flex items-center gap-3 text-slate-300 text-sm">
                                            <i className="fa-solid fa-circle-check text-indigo-400"></i> {f}
                                        </li>
                                    ))}
                                </ul>
                                <button 
                                    className="w-full py-4 rounded-2xl font-bold text-white transition-all hover:brightness-110 active:scale-95 shadow-lg"
                                    style={{ backgroundColor: i === 1 ? theme.primaryColor : '#334155' }}
                                >
                                    Get Started
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            );

          case SectionType.GALLERY:
            return (
              <section key={section.id} className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                   <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">{section.title}</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">{section.subtitle}</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {[1,2,3,4,5,6,7,8].map(i => (
                       <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-slate-100 group relative cursor-pointer">
                         <img src={`https://picsum.photos/seed/${section.id + i}/600/600`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="gallery" />
                         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <i className="fa-solid fa-magnifying-glass-plus text-white text-2xl"></i>
                         </div>
                       </div>
                     ))}
                  </div>
                </div>
              </section>
            );

          case SectionType.CONTACT:
            return (
              <section key={section.id} className="py-24 px-6 bg-slate-50">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                   <div className="p-12 md:w-1/2 bg-slate-900 text-white">
                      <h2 className="text-3xl font-bold mb-6">{section.title || 'Get in Touch'}</h2>
                      <p className="text-slate-400 mb-10">{section.subtitle || 'We would love to hear from you. Drop us a message!'}</p>
                      <div className="space-y-6">
                         <div className="flex items-center gap-4">
                            <i className="fa-solid fa-envelope text-indigo-400"></i>
                            <span className="text-sm">hello@nuttyinc.web.ai</span>
                         </div>
                         <div className="flex items-center gap-4">
                            <i className="fa-solid fa-phone text-indigo-400"></i>
                            <span className="text-sm">+1 (555) 000-0000</span>
                         </div>
                         <div className="flex items-center gap-4">
                            <i className="fa-solid fa-location-dot text-indigo-400"></i>
                            <span className="text-sm">123 AI Boulevard, Silicon Valley</span>
                         </div>
                      </div>
                   </div>
                   <div className="p-12 md:w-1/2">
                      <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                         <div>
                            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Name</label>
                            <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="John Doe" />
                         </div>
                         <div>
                            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Email</label>
                            <input type="email" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="john@example.com" />
                         </div>
                         <div>
                            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Message</label>
                            <textarea className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none h-32" placeholder="How can we help?"></textarea>
                         </div>
                         <button className="w-full py-4 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02]" style={{ backgroundColor: theme.primaryColor }}>
                            Send Message
                         </button>
                      </form>
                   </div>
                </div>
              </section>
            );

          case SectionType.FOOTER:
            return (
                <footer key={section.id} className="py-20 px-6 border-t border-slate-100 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                           <div className="md:col-span-2">
                              <div className="font-outfit font-black text-3xl mb-6" style={{ color: theme.primaryColor }}>{website.name}</div>
                              <p className="text-slate-500 max-w-sm mb-8">{website.description}</p>
                              <div className="flex gap-4">
                                  <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-indigo-600 cursor-pointer transition-all"><i className="fa-brands fa-twitter"></i></div>
                                  <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-indigo-600 cursor-pointer transition-all"><i className="fa-brands fa-facebook"></i></div>
                                  <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-indigo-600 cursor-pointer transition-all"><i className="fa-brands fa-instagram"></i></div>
                                  <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-indigo-600 cursor-pointer transition-all"><i className="fa-brands fa-linkedin"></i></div>
                              </div>
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-900 mb-6">Product</h4>
                              <ul className="space-y-4 text-slate-500 text-sm">
                                 <li className="hover:text-indigo-600 cursor-pointer transition-colors">Features</li>
                                 <li className="hover:text-indigo-600 cursor-pointer transition-colors">Pricing</li>
                                 <li className="hover:text-indigo-600 cursor-pointer transition-colors">Case Studies</li>
                                 <li className="hover:text-indigo-600 cursor-pointer transition-colors">Reviews</li>
                              </ul>
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-900 mb-6">Company</h4>
                              <ul className="space-y-4 text-slate-500 text-sm">
                                 <li className="hover:text-indigo-600 cursor-pointer transition-colors">About Us</li>
                                 <li className="hover:text-indigo-600 cursor-pointer transition-colors">Contact</li>
                                 <li className="hover:text-indigo-600 cursor-pointer transition-colors">Careers</li>
                                 <li className="hover:text-indigo-600 cursor-pointer transition-colors">Legal</li>
                              </ul>
                           </div>
                        </div>
                        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-slate-400 text-sm">© 2024 {website.name}. All rights reserved.</p>
                            <div className="flex gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                               <span className="cursor-pointer hover:text-slate-900">Privacy</span>
                               <span className="cursor-pointer hover:text-slate-900">Terms</span>
                               <span className="cursor-pointer hover:text-slate-900">Cookies</span>
                            </div>
                        </div>
                    </div>
                </footer>
            );

          default:
            return <div key={section.id} className="p-10 border-b border-slate-100 text-center text-slate-400 italic">Section: {section.type} content placeholder</div>;
        }
      })}
    </div>
  );
};

export default Canvas;
