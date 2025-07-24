import React, { useState } from 'react';
import { EyeIcon, ArrowDownTrayIcon, MagnifyingGlassIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Modal from '../UI/Modal';

interface Transaction {
  id: string;
  type: 'payment' | 'refund' | 'commission';
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  from: string;
  to: string;
  userId?: string;
  userName?: string;
  psychologistId?: string;
  psychologistName?: string;
  sessionId?: string;
  receiptUrl?: string;
}

const Wallet: React.FC = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const [transactions] = useState<Transaction[]>([
    {
      id: 'TXN001',
      type: 'payment',
      amount: 120.00,
      date: '2024-01-20T10:00:00Z',
      status: 'completed',
      from: 'John Doe',
      to: 'Dr. Sarah Johnson',
      userId: 'U001',
      userName: 'John Doe',
      psychologistId: 'P001',
      psychologistName: 'Dr. Sarah Johnson',
      sessionId: 'S001',
      receiptUrl: '#'
    },
    {
      id: 'TXN002',
      type: 'commission',
      amount: 24.00,
      date: '2024-01-20T10:05:00Z',
      status: 'completed',
      from: 'Dr. Sarah Johnson',
      to: 'CalmConnect Platform',
      sessionId: 'S001',
      receiptUrl: '#'
    },
    {
      id: 'TXN003',
      type: 'payment',
      amount: 100.00,
      date: '2024-01-19T14:30:00Z',
      status: 'completed',
      from: 'Jane Smith',
      to: 'Dr. Michael Chen',
      userId: 'U002',
      userName: 'Jane Smith',
      psychologistId: 'P002',
      psychologistName: 'Dr. Michael Chen',
      sessionId: 'S002',
      receiptUrl: '#'
    },
    {
      id: 'TXN004',
      type: 'refund',
      amount: 120.00,
      date: '2024-01-18T16:00:00Z',
      status: 'completed',
      from: 'CalmConnect Platform',
      to: 'Robert Wilson',
      userId: 'U003',
      userName: 'Robert Wilson',
      sessionId: 'S003',
      receiptUrl: '#'
    },
    {
      id: 'TXN005',
      type: 'payment',
      amount: 150.00,
      date: '2024-01-17T11:00:00Z',
      status: 'pending',
      from: 'Lisa Johnson',
      to: 'Dr. Sarah Johnson',
      userId: 'U004',
      userName: 'Lisa Johnson',
      psychologistId: 'P001',
      psychologistName: 'Dr. Sarah Johnson',
      sessionId: 'S004',
      receiptUrl: '#'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'payment': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'refund': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'commission': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownloadReceipt = (transaction: Transaction) => {
    // Simulate receipt download
    console.log('Downloading receipt for transaction:', transaction.id);
    // In a real app, this would trigger a file download
    alert(`Receipt for transaction ${transaction.id} downloaded successfully!`);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (transaction.userName && transaction.userName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (transaction.psychologistName && transaction.psychologistName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalRevenue = transactions
    .filter(t => t.status === 'completed' && (t.type === 'payment' || t.type === 'commission'))
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingAmount = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalRefunds = transactions
    .filter(t => t.status === 'completed' && t.type === 'refund')
    .reduce((sum, t) => sum + t.amount, 0);

  const getTransactionDescription = (transaction: Transaction) => {
    switch (transaction.type) {
      case 'payment':
        return `Payment from ${transaction.userName} to ${transaction.psychologistName} for therapy session ${transaction.sessionId}`;
      case 'commission':
        return `Platform commission (20%) collected from ${transaction.psychologistName} for session ${transaction.sessionId}`;
      case 'refund':
        return `Refund issued to ${transaction.userName} for cancelled session ${transaction.sessionId}`;
      default:
        return `Transaction between ${transaction.from} and ${transaction.to}`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Wallet & Transactions</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {transactions.filter(t => t.status === 'pending').length} pending transactions
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                ${totalRevenue.toFixed(2)}
              </p>
            </div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending Amount</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                ${pendingAmount.toFixed(2)}
              </p>
            </div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Refunds</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                ${totalRefunds.toFixed(2)}
              </p>
            </div>
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg glass-card border border-white/20 dark:border-gray-600/20 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 rounded-lg glass-card border border-white/20 dark:border-gray-600/20 text-sm text-gray-800 dark:text-white"
          >
            <option value="all">All Types</option>
            <option value="payment">Payments</option>
            <option value="refund">Refunds</option>
            <option value="commission">Commission</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-lg glass-card border border-white/20 dark:border-gray-600/20 text-sm text-gray-800 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Transaction ID</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Type</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Amount</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Date</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr 
                  key={transaction.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                >
                  <td className="p-4">
                    <button 
                      onClick={() => setSelectedTransaction(transaction)}
                      className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {transaction.id}
                    </button>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(transaction.type)}`}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`font-medium ${
                      transaction.type === 'refund' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                    }`}>
                      {transaction.type === 'refund' ? '-' : '+'}${transaction.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="p-4 text-gray-800 dark:text-white">
                    {formatDateTime(transaction.date)}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedTransaction(transaction)}
                      >
                        <EyeIcon className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      {transaction.status === 'completed' && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleDownloadReceipt(transaction)}
                        >
                          <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                          Receipt
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        title="Transaction Details"
      >
        {selectedTransaction && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CreditCardIcon className="w-8 h-8 text-gray-500" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Transaction {selectedTransaction.id}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedTransaction.type)}`}>
                    {selectedTransaction.type.charAt(0).toUpperCase() + selectedTransaction.type.slice(1)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${
                  selectedTransaction.type === 'refund' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                }`}>
                  {selectedTransaction.type === 'refund' ? '-' : '+'}${selectedTransaction.amount.toFixed(2)}
                </p>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTransaction.status)}`}>
                  {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-3">Description</h4>
              <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                {getTransactionDescription(selectedTransaction)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-3">Transaction Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Date & Time</label>
                    <p className="text-gray-800 dark:text-white">{formatDateTime(selectedTransaction.date)}</p>
                  </div>
                  {selectedTransaction.sessionId && (
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400">Related Session</label>
                      <p className="text-gray-800 dark:text-white">{selectedTransaction.sessionId}</p>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-3">Participants</h4>
                <div className="space-y-3">
                  {selectedTransaction.userName && (
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400">User</label>
                      <p className="text-gray-800 dark:text-white">{selectedTransaction.userName}</p>
                    </div>
                  )}
                  {selectedTransaction.psychologistName && (
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400">Psychologist</label>
                      <p className="text-gray-800 dark:text-white">{selectedTransaction.psychologistName}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              {selectedTransaction.status === 'completed' && (
                <Button
                  variant="primary"
                  onClick={() => handleDownloadReceipt(selectedTransaction)}
                >
                  <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                  Download Receipt
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Wallet;