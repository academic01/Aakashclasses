import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit, Trash } from 'lucide-react';

const AdminCourses = () => {
  const [courses, setCourses] = useState([
    { id: 1, title: 'NEET Complete Crash Course', category: 'neet', price: 4999, enrollments: 843, status: 'active', thumbnail: '' },
    { id: 2, title: 'JEE Main Target 2025', category: 'jee', price: 9999, enrollments: 1205, status: 'active', thumbnail: '' },
    { id: 3, title: 'Class 12th Board Booster', category: 'school', price: 2499, enrollments: 432, status: 'coming_soon', thumbnail: '' },
    { id: 4, title: 'CUET 2026 Ultimate Batch', category: 'cuet', price: 2999, enrollments: 512, status: 'active', thumbnail: '' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header and Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Manage Courses</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#F5A623] text-[#0D2240] px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-[#e09820] flex items-center justify-center gap-2 transition-colors"
        >
          <Plus size={18} /> Add New Course
        </button>
      </div>

      {/* Filters Base */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4 flex-1">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input type="text" placeholder="Search courses..." className="pl-10 w-full border rounded-lg px-3 py-2 text-sm focus:ring-[#F5A623] focus:border-[#F5A623]" />
          </div>
          <select className="border rounded-lg px-3 py-2 text-sm text-gray-600 focus:ring-[#F5A623]">
            <option value="">All Categories</option>
            <option value="neet">NEET</option>
            <option value="jee">JEE</option>
            <option value="school">School Classes</option>
            <option value="cuet">CUET</option>
          </select>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-900">Course</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Category</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Price</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Enrollments</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-900 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-10 rounded bg-gray-200 object-cover overflow-hidden">
                        {course.thumbnail && <img src={course.thumbnail} alt="" className="w-full h-full" />}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{course.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 uppercase text-xs font-bold tracking-wider text-gray-500">{course.category}</td>
                  <td className="px-6 py-4 font-medium">₹{course.price.toLocaleString()}</td>
                  <td className="px-6 py-4">{course.enrollments}</td>
                  <td className="px-6 py-4">
                    {course.status === 'active' && <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-semibold">Active</span>}
                    {course.status === 'coming_soon' && <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md text-xs font-semibold">Coming Soon</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="text-blue-600 hover:bg-blue-50 p-2 rounded"><Edit size={16}/></button>
                       <button className="text-red-600 hover:bg-red-50 p-2 rounded"><Trash size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Course Modal Stub */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative">
            <h3 className="text-xl font-bold mb-6">Create New Course</h3>
            <p className="text-gray-500 mb-4">Complete form implementation maps to backend endpoint <code>POST /api/admin/courses/create</code></p>
            <div className="flex justify-end gap-4 mt-8 border-t pt-4">
               <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg font-medium">Cancel</button>
               <button className="px-4 py-2 bg-[#0D2240] text-white rounded-lg font-medium">Save as Draft</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminCourses;
