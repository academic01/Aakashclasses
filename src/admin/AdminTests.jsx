import React, { useState } from 'react';
import { Search, Plus, Filter, Edit, Trash, FileText, CheckCircle } from 'lucide-react';

const AdminTests = () => {
  const [tests, setTests] = useState([
    { id: 1, title: 'NEET Full Syllabus Mock 1', category: 'NEET', duration: 180, marks: 720, questions: 200, status: 'active' },
    { id: 2, title: 'JEE Advanced Paper 1', category: 'JEE', duration: 180, marks: 300, questions: 54, status: 'coming_soon' },
    { id: 3, title: 'Class 12 Physics Chapter 1', category: 'School', duration: 45, marks: 50, questions: 25, status: 'draft' }
  ]);

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Manage Test Series</h2>
        <button className="bg-[#0D2240] text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-opacity-90 flex items-center justify-center gap-2 transition-colors">
          <Plus size={18} /> Create New Test
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4 flex-1">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input type="text" placeholder="Search tests..." className="pl-10 w-full border rounded-lg px-3 py-2 text-sm focus:ring-[#F5A623] focus:border-[#F5A623]" />
          </div>
          <select className="border rounded-lg px-3 py-2 text-sm text-gray-600 focus:ring-[#F5A623]">
             <option value="">All Categories</option>
             <option value="NEET">NEET</option>
             <option value="JEE">JEE</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tests.map((test) => (
          <div key={test.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-gray-300 transition-all">
            <div className="flex items-start gap-4">
               <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <FileText size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-lg text-gray-900">{test.title}</h3>
                 <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-gray-600">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs font-semibold">{test.category}</span>
                    <span className="flex items-center gap-1"><CheckCircle size={14}/> {test.questions} Questions</span>
                    <span>{test.duration} mins</span>
                    <span>{test.marks} Marks</span>
                 </div>
               </div>
            </div>
            
            <div className="flex items-center gap-3 md:ml-auto">
                <div className="mr-4">
                    {test.status === 'active' && <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-semibold">Active</span>}
                    {test.status === 'coming_soon' && <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md text-xs font-semibold">Coming Soon</span>}
                    {test.status === 'draft' && <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-semibold">Draft</span>}
                </div>
                <button className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50">Manage Questions</button>
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit size={18}/></button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash size={18}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminTests;
