import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Ban, Mail, Download } from 'lucide-react';

const AdminStudents = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Rahul Kumar', email: 'rahul@example.com', phone: '+91 9876543210', class: '12th', courses: 2, joinedAt: '2025-04-01', status: 'active' },
    { id: 2, name: 'Priya Singh', email: 'priya@example.com', phone: '+91 8765432109', class: '11th', courses: 1, joinedAt: '2025-04-05', status: 'active' },
    { id: 3, name: 'Amit Sharma', email: 'amit@example.com', phone: '+91 7654321098', class: 'Dropper', courses: 3, joinedAt: '2025-03-20', status: 'blocked' }
  ]);

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col flex-wrap md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Manage Students</h2>
        <button className="bg-white border text-gray-700 px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
          <Download size={18} /> Export CSV
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4 flex-1">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input type="text" placeholder="Search by name, email, phone..." className="pl-10 w-full border rounded-lg px-3 py-2 text-sm focus:ring-[#F5A623] focus:border-[#F5A623]" />
          </div>
          <select className="border rounded-lg px-3 py-2 text-sm text-gray-600 focus:ring-[#F5A623]">
            <option value="">All Classes</option>
            <option value="11th">Class 11</option>
            <option value="12th">Class 12</option>
            <option value="Dropper">Dropper</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-900">Student Info</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Class</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Enrolled</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Joined On</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-900 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#0D2240] text-white flex items-center justify-center font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{student.name}</div>
                        <div className="text-xs text-gray-500">{student.email}</div>
                        <div className="text-xs text-gray-500">{student.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{student.class}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold">{student.courses} Courses</span></td>
                  <td className="px-6 py-4">{student.joinedAt}</td>
                  <td className="px-6 py-4">
                    {student.status === 'active' && <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-semibold">Active</span>}
                    {student.status === 'blocked' && <span className="px-2 py-1 bg-red-100 text-red-700 rounded-md text-xs font-semibold">Blocked</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="text-blue-600 hover:bg-blue-50 p-2 rounded" title="Send Notification"><Mail size={16}/></button>
                       <button className="text-red-600 hover:bg-red-50 p-2 rounded" title="Block User"><Ban size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminStudents;
