
import React from 'react';
import { WebsiteData, SectionType } from '../types';

interface EditorSidebarProps {
  website: WebsiteData;
  setWebsite: (data: WebsiteData) => void;
}

const getSectionIcon = (type: SectionType) => {
  switch (type) {
    case SectionType.HERO: return 'fa-solid fa-panorama';
    case SectionType.FEATURES: return 'fa-solid fa-list-check';
    case SectionType.ABOUT: return 'fa-solid fa-circle-info';
    case SectionType.PRICING: return 'fa-solid fa-tags';
    case SectionType.TESTIMONIALS: return 'fa-solid fa-quote-left';
    case SectionType.GALLERY: return 'fa-solid fa-images';
    case SectionType.CONTACT: return 'fa-solid fa-envelope-open-text';
    case SectionType.FOOTER: return 'fa-solid fa-shoe-prints rotate-90';
    default: return 'fa-solid fa-layer-group';
  }
};

const EditorSidebar: React.FC<EditorSidebarProps> = ({ website, setWebsite }) => {
  const updateTheme = (key: string, value: string) => {
    setWebsite({
      ...website,
      theme: { ...website.theme, [key]: value }
    });
  };

  const removeSection = (id: string) => {
    setWebsite({
      ...website,
      sections: website.sections.filter(s => s.id !== id)
    });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...website.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;
    
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    setWebsite({ ...website, sections: newSections });
  };

  return (
    <div className="w-80 h-full border-r border-slate-200 bg-white flex flex-col overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-lg font-outfit font-bold text-slate-800 flex items-center gap-2">
          <i className="fa-solid fa-wand-magic-sparkles text-indigo-600"></i>
          nuttyinc AI Editor
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-8 scroll-smooth">
        {/* Global Styles */}
        <section>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Visual Identity</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Primary Accent</label>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 shrink-0">
                   <input 
                    type="color" 
                    value={website.theme.primaryColor}
                    onChange={(e) => updateTheme('primaryColor', e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full h-full rounded-lg shadow-inner border border-slate-100" style={{ backgroundColor: website.theme.primaryColor }}></div>
                </div>
                <input 
                  type="text" 
                  value={website.theme.primaryColor}
                  onChange={(e) => updateTheme('primaryColor', e.target.value)}
                  className="flex-1 text-xs border border-slate-200 rounded-lg px-3 h-10 font-mono focus:ring-1 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Secondary Color</label>
              <div className="flex items-center gap-3">
                 <div className="relative w-10 h-10 shrink-0">
                  <input 
                    type="color" 
                    value={website.theme.secondaryColor}
                    onChange={(e) => updateTheme('secondaryColor', e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full h-full rounded-lg shadow-inner border border-slate-100" style={{ backgroundColor: website.theme.secondaryColor }}></div>
                </div>
                <input 
                  type="text" 
                  value={website.theme.secondaryColor}
                  onChange={(e) => updateTheme('secondaryColor', e.target.value)}
                  className="flex-1 text-xs border border-slate-200 rounded-lg px-3 h-10 font-mono focus:ring-1 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section Management */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Page Blueprint</h3>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{website.sections.length} Units</span>
          </div>
          <div className="space-y-3">
            {website.sections.map((section, idx) => (
              <div 
                key={section.id} 
                className="group relative bg-white border border-slate-200 rounded-xl hover:border-indigo-300 transition-all shadow-sm hover:shadow-md overflow-hidden"
              >
                <div className="flex items-center p-3 gap-3">
                   {/* Mini Preview Icon */}
                   <div className="w-10 h-10 rounded-lg bg-slate-50 flex flex-col items-center justify-center shrink-0 border border-slate-100 group-hover:bg-indigo-50 transition-colors">
                      <i className={`${getSectionIcon(section.type)} text-slate-400 group-hover:text-indigo-600 transition-colors text-sm`}></i>
                      <span className="text-[8px] mt-1 font-bold text-slate-300 group-hover:text-indigo-300 uppercase">{section.type.substring(0,3)}</span>
                   </div>
                   
                   <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-black text-slate-400 uppercase tracking-tighter truncate opacity-60">Section {idx + 1}</div>
                      <div className="text-xs font-bold text-slate-700 capitalize truncate">{section.type}</div>
                   </div>

                   <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => moveSection(idx, 'up')} className="text-slate-400 hover:text-indigo-600 transition-colors p-1" disabled={idx === 0}>
                        <i className="fa-solid fa-chevron-up text-[10px]"></i>
                      </button>
                      <button onClick={() => moveSection(idx, 'down')} className="text-slate-400 hover:text-indigo-600 transition-colors p-1" disabled={idx === website.sections.length - 1}>
                        <i className="fa-solid fa-chevron-down text-[10px]"></i>
                      </button>
                   </div>
                   
                   <button 
                    onClick={() => removeSection(section.id)}
                    className="text-slate-300 hover:text-red-500 p-2 transition-colors ml-1"
                  >
                    <i className="fa-solid fa-xmark text-sm"></i>
                  </button>
                </div>
                
                {/* Visual Indicator on the left */}
                <div className="absolute left-0 top-0 bottom-0 w-1 transition-colors group-hover:bg-indigo-500"></div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 px-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-[11px] font-black uppercase tracking-widest hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
            <i className="fa-solid fa-plus text-xs"></i>
            Append Unit
          </button>
        </section>
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col gap-2">
         <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-xs hover:bg-slate-800 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest">
           <i className="fa-solid fa-globe text-sm"></i>
           Publish Project
         </button>
         <button className="w-full bg-white border border-slate-200 text-slate-600 py-2 rounded-lg font-bold text-[10px] hover:bg-slate-50 transition-colors uppercase tracking-widest">
           Save Draft
         </button>
      </div>
    </div>
  );
};

export default EditorSidebar;
