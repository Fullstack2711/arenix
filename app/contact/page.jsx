'use client'
import React, { useState } from 'react'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import UserSidebar from '../components/userSidebar'

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'support@arenix.uz',
      description: '24/7 yordam xizmati'
    },
    {
      icon: Phone,
      title: 'Telefon',
      value: '+998 99 123 45 67',
      description: 'Ish kunlari 9:00-18:00'
    },
    {
      icon: MapPin,
      title: 'Manzil',
      value: 'Toshkent, O\'zbekiston',
      description: 'Chilonzor tumani'
    },
    {
      icon: Clock,
      title: 'Ish vaqti',
      value: 'Har kuni',
      description: '24/7 onlayn yordam'
    }
  ];

  const faqs = [
    {
      question: 'Turnirga qanday ro\'yxatdan o\'taman?',
      answer: 'Turnirlar sahifasiga o\'ting va kerakli turnirni tanlang. "Qatnashish" tugmasini bosing va ko\'rsatmalarga amal qiling.'
    },
    {
      question: 'Mukofotlarni qanday olaman?',
      answer: 'G\'olib bo\'lganingizdan keyin mukofot avtomatik ravishda hisobingizga o\'tkaziladi. Bu jarayon 24 soat ichida amalga oshiriladi.'
    },
    {
      question: 'Hisobimni qanday to\'ldirishim mumkin?',
      answer: 'Hamyon bo\'limiga o\'ting va turli to\'lov usullari orqali hisobingizni to\'ldirishingiz mumkin.'
    },
    {
      question: 'Texnik yordam qanday olaman?',
      answer: 'Ushbu sahifada forma to\'ldirib yoki to\'g\'ridan-to\'g\'ri email/telefon orqali murojaat qilishingiz mumkin.'
    }
  ];

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <UserSidebar activeTab="contact" />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 pt-8">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">📞 Biz bilan bog'lanish</h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Savollaringiz bormi? Biz yordam berishga tayyormiz. Bizga murojaat qiling!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <div className="flex items-center mb-6">
              <MessageSquare className="text-blue-400 mr-3" size={24} />
              <h2 className="text-2xl font-bold text-white">Xabar yuborish</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Ismingiz *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Ismingizni kiriting"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Mavzu *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="Xabar mavzusi"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Xabar *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                  placeholder="Xabaringizni yozing..."
                />
              </div>

              {/* Submit Status */}
              {submitStatus === 'success' && (
                <div className="flex items-center text-green-400 bg-green-900/20 p-3 rounded-lg">
                  <CheckCircle size={20} className="mr-2" />
                  <span>Xabaringiz muvaffaqiyatli yuborildi!</span>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Yuborilmoqda...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Xabarni yuborish</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Aloqa ma'lumotlari</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-blue-900/20 p-3 rounded-lg">
                        <Icon className="text-blue-400" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{info.title}</h3>
                        <p className="text-blue-400 font-medium">{info.value}</p>
                        <p className="text-gray-400 text-sm">{info.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Tezkor havolalar</h2>
              <div className="space-y-3">
                <a href="/tournaments" className="block text-blue-400 hover:text-blue-300 transition-colors">
                  🏆 Turnirlar
                </a>
                <a href="/games" className="block text-blue-400 hover:text-blue-300 transition-colors">
                  🎮 O'yinlar
                </a>
                <a href="/user-dashboard" className="block text-blue-400 hover:text-blue-300 transition-colors">
                  📊 Dashboard
                </a>
                <a href="/profile" className="block text-blue-400 hover:text-blue-300 transition-colors">
                  👤 Profil
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Tez-tez beriladigan savollar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-900/20 p-2 rounded-lg mt-1">
                    <AlertCircle className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
