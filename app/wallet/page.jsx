'use client'
import React, { useState } from 'react'
import { 
  Wallet, 
  CreditCard, 
  TrendingUp,
  TrendingDown,
  Plus,
  Minus,
  History,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign
} from 'lucide-react'
import UserSidebar from '../components/userSidebar'

function WalletPage() {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const balance = {
    total: 2540.50,
    available: 2340.50,
    pending: 200.00
  };

  const recentTransactions = [
    {
      id: 1,
      type: 'income',
      description: 'CS:GO Tournament - 1st Place',
      amount: 500.00,
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 2,
      type: 'expense',
      description: 'Tournament Entry Fee',
      amount: -50.00,
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: 3,
      type: 'income',
      description: 'Dota 2 Match Win',
      amount: 150.00,
      date: '2024-01-13',
      status: 'pending'
    },
    {
      id: 4,
      type: 'expense',
      description: 'Withdrawal to Bank',
      amount: -300.00,
      date: '2024-01-12',
      status: 'completed'
    },
    {
      id: 5,
      type: 'income',
      description: 'Weekly Bonus',
      amount: 75.00,
      date: '2024-01-11',
      status: 'completed'
    }
  ];

  const paymentMethods = [
    { id: 1, name: 'UzCard', logo: '/logo/uzcard.png', type: 'card' },
    { id: 2, name: 'Humo', logo: '/logo/humo.png', type: 'card' },
    { id: 3, name: 'Visa', logo: '/logo/visa.png', type: 'card' },
    { id: 4, name: 'Bitcoin', logo: '/logo/bitcoin.png', type: 'crypto' },
    { id: 5, name: 'TonCoin', logo: '/logo/toncoin.png', type: 'crypto' }
  ];

  const stats = [
    {
      title: 'Umumiy daromad',
      value: '$3,245',
      change: '+12%',
      icon: TrendingUp,
      color: 'text-green-400'
    },
    {
      title: 'Bu oyda',
      value: '$850',
      change: '+8%',
      icon: TrendingUp,
      color: 'text-blue-400'
    },
    {
      title: 'Turnir g\'alabalari',
      value: '24',
      change: '+4',
      icon: TrendingUp,
      color: 'text-purple-400'
    },
    {
      title: 'Chiqarilgan',
      value: '$1,200',
      change: '-5%',
      icon: TrendingDown,
      color: 'text-orange-400'
    }
  ];

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <UserSidebar activeTab="wallet" />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 pt-8">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">💰 Hamyon</h1>
          <p className="text-gray-400 text-xl">
            Moliyaviy hisobotlaringizni boshqaring va daromadlaringizni kuzating
          </p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Main Balance */}
          <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Wallet size={32} />
                <h2 className="text-2xl font-bold">Asosiy hisob</h2>
              </div>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              >
                {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-blue-100 mb-2">Umumiy balans</p>
              <h3 className="text-4xl font-bold">
                {showBalance ? `$${balance.total.toFixed(2)}` : '••••••'}
              </h3>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Mavjud</p>
                <p className="text-xl font-semibold">
                  {showBalance ? `$${balance.available.toFixed(2)}` : '••••••'}
                </p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Kutilayotgan</p>
                <p className="text-xl font-semibold">
                  {showBalance ? `$${balance.pending.toFixed(2)}` : '••••••'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-white font-bold text-lg mb-6">Tezkor amallar</h3>
            <div className="space-y-4">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <Plus size={18} />
                <span>To'ldirish</span>
              </button>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <Minus size={18} />
                <span>Chiqarish</span>
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <History size={18} />
                <span>Tarix</span>
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <Icon className={stat.color} size={24} />
                  <span className={`text-sm font-medium ${stat.color}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-gray-400 text-sm">{stat.title}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
            {['overview', 'transactions', 'payments'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'overview' ? 'Umumiy ko\'rinish' :
                 tab === 'transactions' ? 'Tranzaksiyalar' : 'To\'lov usullari'}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Transactions */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">So'nggi tranzaksiyalar</h3>
              <div className="space-y-4">
                {recentTransactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-700 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        transaction.type === 'income' ? 'bg-green-900/20' : 'bg-red-900/20'
                      }`}>
                        {transaction.type === 'income' ? (
                          <ArrowDownLeft className="text-green-400" size={20} />
                        ) : (
                          <ArrowUpRight className="text-red-400" size={20} />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{transaction.description}</h4>
                        <p className="text-sm text-gray-400">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <p className={`text-xs ${
                        transaction.status === 'completed' ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        {transaction.status === 'completed' ? 'Tugallandi' : 'Kutilmoqda'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Chart Placeholder */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Daromad grafigi</h3>
              <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Grafik tez orada qo'shiladi</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Barcha tranzaksiyalar</h3>
              <div className="flex space-x-2">
                <select className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600">
                  <option>Barcha turlar</option>
                  <option>Kirim</option>
                  <option>Chiqim</option>
                </select>
                <select className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600">
                  <option>Oxirgi 30 kun</option>
                  <option>Oxirgi 7 kun</option>
                  <option>Bu oy</option>
                </select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left text-gray-400 py-3">Tavsif</th>
                    <th className="text-left text-gray-400 py-3">Sana</th>
                    <th className="text-left text-gray-400 py-3">Miqdor</th>
                    <th className="text-left text-gray-400 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            transaction.type === 'income' ? 'bg-green-900/20' : 'bg-red-900/20'
                          }`}>
                            {transaction.type === 'income' ? (
                              <ArrowDownLeft className="text-green-400" size={16} />
                            ) : (
                              <ArrowUpRight className="text-red-400" size={16} />
                            )}
                          </div>
                          <span className="text-white">{transaction.description}</span>
                        </div>
                      </td>
                      <td className="py-4 text-gray-400">{transaction.date}</td>
                      <td className="py-4">
                        <span className={`font-bold ${
                          transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transaction.status === 'completed' 
                            ? 'bg-green-900/20 text-green-400' 
                            : 'bg-yellow-900/20 text-yellow-400'
                        }`}>
                          {transaction.status === 'completed' ? 'Tugallandi' : 'Kutilmoqda'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Methods */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">To'lov usullari</h3>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-600 hover:border-blue-500 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <img src={method.logo} alt={method.name} className="w-8 h-8 object-contain" />
                      <div>
                        <h4 className="font-medium text-white">{method.name}</h4>
                        <p className="text-sm text-gray-400">
                          {method.type === 'card' ? 'Bank kartasi' : 'Kripto valyuta'}
                        </p>
                      </div>
                    </div>
                    <button className="text-blue-400 hover:text-blue-300">
                      Ulash
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Withdrawal */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Pul chiqarish</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Miqdor
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Mavjud: ${balance.available.toFixed(2)}
                  </p>
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    To'lov usuli
                  </label>
                  <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
                    <option>UzCard</option>
                    <option>Humo</option>
                    <option>Visa</option>
                  </select>
                </div>
                
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-colors">
                  Pul chiqarish
                </button>
                
                <div className="text-sm text-gray-400 space-y-1">
                  <p>• Minimum chiqarish: $10</p>
                  <p>• Komissiya: 2%</p>
                  <p>• Jarayon vaqti: 1-3 ish kuni</p>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default WalletPage
