import React from 'react';
import { Users, CreditCard, BookOpen, Video, Trash, Edit, Eye } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Students', value: '4,521', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Total Revenue', value: '₹14,50,000', icon: CreditCard, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Active Courses', value: '24', icon: BookOpen, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { title: 'Live Classes', value: '12', icon: Video, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center \${stat.bg} \${stat.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enrollments Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-lg">Recent Enrollments</h3>
            <button className="text-[#0D2240] text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 font-medium text-gray-900">Student</th>
                  <th className="px-6 py-3 font-medium text-gray-900">Course</th>
                  <th className="px-6 py-3 font-medium text-gray-900">Amount</th>
                  <th className="px-6 py-3 font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[1, 2, 3, 4].map((item) => (
                  <tr key={item} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">Rahul Kumar</td>
                    <td className="px-6 py-4">NEET Complete Crash Course</td>
                    <td className="px-6 py-4">₹4,999</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-semibold">Success</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Courses */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-lg">Top Courses (Enrollments)</h3>
          </div>
          <div className="p-6 space-y-4">
            {['JEE Main Target 2025', 'CUET Advanced Batch', 'Class 12th Board Booster'].map((course, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-gray-200"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{course}</h4>
                    <p className="text-xs text-gray-500">{124 * (3 - idx)} Enrollments</p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-[#0D2240]"><Eye size={18} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
