import React, { useState } from 'react';
import { Save, Plus, Trash } from 'lucide-react';

const SiteSettings = () => {
  const [heroForm, setHeroForm] = useState({
    heading1: 'Aakash Academics',
    heading2: 'The Path to Success',
    accentHeading: 'NEET & JEE',
    subheading: 'Join thousands of students learning offline and online.',
    cta1Text: 'Start Learning',
    cta1Link: '/courses',
    cta2Text: 'Book Counseling',
    cta2Link: '/contact',
    stats: [
      { number: '10,000+', label: 'Selections' },
      { number: '50+', label: 'Faculty' },
      { number: '5+', label: 'Centers' }
    ]
  });

  const [announcement, setAnnouncement] = useState({
    isVisible: true,
    text: 'Admissions Open for 2025-26!',
    backgroundColor: '#0D2240',
    textColor: '#ffffff',
    link: '/courses'
  });

  const handleSaveHero = () => {
    // API call to POST /api/admin/settings/hero
    alert('Hero Settings Saved (Backend simulated)');
  };

  const handleSaveAnnouncement = () => {
    // API call to PUT /api/admin/settings/announcement
    alert('Announcement settings updated!');
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Site Settings</h2>
        <button className="bg-[#0D2240] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 flex items-center gap-2">
          <Save size={18} /> Save All
        </button>
      </div>

      {/* Hero Section Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-4 mb-6">Hero Section</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading Line 1</label>
              <input type="text" className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-[#F5A623] focus:border-[#F5A623]" value={heroForm.heading1} onChange={e => setHeroForm({...heroForm, heading1: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading Line 2</label>
              <input type="text" className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-[#F5A623] focus:border-[#F5A623]" value={heroForm.heading2} onChange={e => setHeroForm({...heroForm, heading2: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Accent Heading (Yellow Text)</label>
              <input type="text" className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-[#F5A623] focus:border-[#F5A623]" value={heroForm.accentHeading} onChange={e => setHeroForm({...heroForm, accentHeading: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subheading / Description</label>
              <textarea className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-[#F5A623] focus:border-[#F5A623] h-24" value={heroForm.subheading} onChange={e => setHeroForm({...heroForm, subheading: e.target.value})} />
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-700">Call to Action Buttons</h4>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">CTA 1 Text</label>
                <input type="text" className="w-full border rounded-lg px-3 py-2 text-sm" value={heroForm.cta1Text} onChange={e => setHeroForm({...heroForm, cta1Text: e.target.value})}/>
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">CTA 1 Link</label>
                <input type="text" className="w-full border rounded-lg px-3 py-2 text-sm" value={heroForm.cta1Link} onChange={e => setHeroForm({...heroForm, cta1Link: e.target.value})}/>
              </div>
            </div>
            <div className="flex gap-4 border-b pb-4">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">CTA 2 Text</label>
                <input type="text" className="w-full border rounded-lg px-3 py-2 text-sm" value={heroForm.cta2Text} onChange={e => setHeroForm({...heroForm, cta2Text: e.target.value})}/>
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">CTA 2 Link</label>
                <input type="text" className="w-full border rounded-lg px-3 py-2 text-sm" value={heroForm.cta2Link} onChange={e => setHeroForm({...heroForm, cta2Link: e.target.value})}/>
              </div>
            </div>

            <h4 className="font-semibold text-gray-700 pt-2">Hero Stats (3 items)</h4>
            {heroForm.stats.map((stat, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-1/3">
                  <input type="text" placeholder="Number (e.g. 10k+)" className="w-full border rounded-lg px-3 py-2 text-sm" value={stat.number} onChange={e => {
                    const numStats = [...heroForm.stats];
                    numStats[idx].number = e.target.value;
                    setHeroForm({...heroForm, stats: numStats});
                  }}/>
                </div>
                <div className="flex-1">
                   <input type="text" placeholder="Label (e.g. Selections)" className="w-full border rounded-lg px-3 py-2 text-sm" value={stat.label} onChange={e => {
                    const numStats = [...heroForm.stats];
                    numStats[idx].label = e.target.value;
                    setHeroForm({...heroForm, stats: numStats});
                  }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={handleSaveHero} className="bg-[#0D2240] text-white px-5 py-2 rounded-lg text-sm hover:bg-opacity-90">Save Hero Options</button>
        </div>
      </div>

      {/* Announcement Bar Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h3 className="text-lg font-bold text-gray-800">Announcement Bar</h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={announcement.isVisible} onChange={e => setAnnouncement({...announcement, isVisible: e.target.checked})} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0D2240]"></div>
            <span className="ml-3 text-sm font-medium text-gray-700">Show Bar</span>
          </label>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Announcement Text</label>
             <input type="text" className="w-full border rounded-lg px-3 py-2 text-sm" value={announcement.text} onChange={e => setAnnouncement({...announcement, text: e.target.value})} />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Click Link</label>
             <input type="text" className="w-full border rounded-lg px-3 py-2 text-sm" value={announcement.link} onChange={e => setAnnouncement({...announcement, link: e.target.value})} />
           </div>
           <div className="flex gap-4">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
               <input type="color" className="w-12 h-10 border rounded px-1 cursor-pointer" value={announcement.backgroundColor} onChange={e => setAnnouncement({...announcement, backgroundColor: e.target.value})} />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
               <input type="color" className="w-12 h-10 border rounded px-1 cursor-pointer" value={announcement.textColor} onChange={e => setAnnouncement({...announcement, textColor: e.target.value})} />
             </div>
           </div>
           <div className="flex justify-end">
             <button onClick={handleSaveAnnouncement} className="bg-[#0D2240] text-white px-5 py-2 rounded-lg text-sm hover:bg-opacity-90">Save Announcement</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SiteSettings;
