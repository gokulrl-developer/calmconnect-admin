import React, { useState } from 'react';
import { EyeIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Modal from '../UI/Modal';

interface UsersProps {
  onViewDetails?: (id: string) => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'suspended';
  sessionsCount: number;
  lastLogin: string;
  avatar?: string;
}

const Users: React.FC<UsersProps> = ({ onViewDetails }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [users, setUsers] = useState<User[]>([
    {
      id: 'U001',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      joinDate: '2023-10-15',
      status: 'active',
      sessionsCount: 12,
      lastLogin: '2024-01-20T10:30:00Z'
    },
    {
      id: 'U002',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+1 (555) 234-5678',
      joinDate: '2023-11-02',
      status: 'active',
      sessionsCount: 8,
      lastLogin: '2024-01-19T14:15:00Z'
    },
    {
      id: 'U003',
      name: 'Robert Wilson',
      email: 'robert.wilson@email.com',
      phone: '+1 (555) 345-6789',
      joinDate: '2023-12-10',
      status: 'inactive',
      sessionsCount: 3,
      lastLogin: '2024-01-10T09:00:00Z'
    },
    {
      id: 'U004',
      name: 'Lisa Johnson',
      email: 'lisa.johnson@email.com',
      phone: '+1 (555) 456-7890',
      joinDate: '2024-01-05',
      status: 'suspended',
      sessionsCount: 0,
      lastLogin: '2024-01-15T16:45:00Z'
    }
  ]);

  const handleStatusToggle = (userId: string) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
          : user
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'suspended': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">User Management</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {users.filter(u => u.status === 'active').length} active users
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['active', 'inactive', 'suspended'].map((status) => (
          <Card key={status} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{status}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  {users.filter(u => u.status === status).length}
                </p>
              </div>
              <div className={`w-3 h-3 rounded-full ${getStatusColor(status).split(' ')[0]}`}></div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg glass-card border border-white/20 dark:border-gray-600/20 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-lg glass-card border border-white/20 dark:border-gray-600/20 text-sm text-gray-800 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">User</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Contact</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Join Date</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Sessions</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Last Login</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr 
                  key={user.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">{user.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-gray-800 dark:text-white">{user.email}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{user.phone}</p>
                  </td>
                  <td className="p-4 text-gray-800 dark:text-white">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-gray-800 dark:text-white">{user.sessionsCount}</td>
                  <td className="p-4 text-gray-800 dark:text-white">
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onViewDetails?.(user.id)}
                      >
                        <EyeIcon className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant={user.status === 'active' ? 'warning' : 'success'}
                        size="sm"
                        onClick={() => handleStatusToggle(user.id)}
                      >
                        {user.status === 'active' ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  );
};

export default Users;