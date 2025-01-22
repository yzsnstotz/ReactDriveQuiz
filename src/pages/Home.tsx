import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, BookOpen, Car, FileText, User, Home as HomeIcon, Bookmark, RefreshCcw, Trash2, Settings as SettingsIcon, Search, Eye } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  icon: string;
  desc: string;
  count: string;
}

interface RecentQuestion {
  id: number;
  title: string;
  progress: number;
  lastTime: string;
  image: string;
}

export function Home() {
  const navigate = useNavigate();
  const [activeTab] = useState('驾考练习');

  const categories: Category[] = [
    { id: 1, name: '足利机动车学校内测验', icon: '🚗', desc: '校内专属题库', count: '100题' },
    { id: 2, name: '仮免考试练习', icon: '📃', desc: '考前必练', count: '200题' },
    { id: 3, name: '免许考试练习', icon: '🎯', desc: '重点难点', count: '150题' },
    { id: 4, name: '学科讲习', icon: '📚', desc: '系统学习', count: '80题' },
    { id: 5, name: '大乱斗', icon: '⚔️', desc: '随机练习', count: '300题' }
  ];

  const recentQuestions: RecentQuestion[] = [
    {
      id: 1,
      title: '交通标志认知练习',
      progress: 80,
      lastTime: '2小时前',
      image: '/api/placeholder/400/300'
    },
    {
      id: 2,
      title: '路况判断测试',
      progress: 60,
      lastTime: '昨天',
      image: '/api/placeholder/400/300'
    }
  ];

  return (
    <div className="min-h-screen bg-ios-gray-50">
      {/* Header */}
      <div className="px-4 pt-12 pb-2 bg-white/90 backdrop-blur-ios sticky top-0 z-50 border-b border-ios-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-ios-gray-900">驾驶员中心</h1>
          <div className="flex items-center space-x-4">
            <button className="text-ios-blue" onClick={() => window.open(window.location.href, '_blank')}>
              <Eye className="w-6 h-6" />
            </button>
            <button className="text-ios-blue">
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-ios-gray-400" />
          </div>
          <input
            type="text"
            placeholder="搜索考题或服务"
            className="w-full h-11 pl-10 pr-4 bg-ios-gray-50/80 rounded-ios-lg text-base text-ios-gray-900 placeholder-ios-gray-500 border-none focus:outline-none focus:ring-2 focus:ring-ios-blue/20"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-8 -mb-0.5">
          <button className={`pb-2 text-base font-medium ${activeTab === '驾考练习' ? 'text-ios-blue border-b-2 border-ios-blue' : 'text-ios-gray-600'}`}>
            驾考练习
          </button>
          <button className="pb-2 text-base font-medium text-ios-gray-600">
            校园周边
          </button>
          <button className="pb-2 text-base font-medium text-ios-gray-600">
            汽车服务
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-6 px-4 py-8">
        <button className="flex flex-col items-center" onClick={() => navigate('/favorites')}>
          <div className="w-14 h-14 rounded-ios-lg bg-ios-yellow/10 flex items-center justify-center mb-2 shadow-ios">
            <Bookmark className="w-7 h-7 text-ios-yellow" />
          </div>
          <span className="text-xs text-ios-gray-500">我的收藏</span>
        </button>
        <button className="flex flex-col items-center" onClick={() => navigate('/mistakes')}>
          <div className="w-14 h-14 rounded-ios-lg bg-ios-red/10 flex items-center justify-center mb-2 shadow-ios">
            <RefreshCcw className="w-7 h-7 text-ios-red" />
          </div>
          <span className="text-xs text-ios-gray-500">错题复习</span>
        </button>
        <button className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-ios-lg bg-ios-gray-50/80 flex items-center justify-center mb-2 shadow-ios">
            <Trash2 className="w-7 h-7 text-ios-gray-500" />
          </div>
          <span className="text-xs text-ios-gray-500">清空历史</span>
        </button>
        <button className="flex flex-col items-center" onClick={() => navigate('/settings')}>
          <div className="w-14 h-14 rounded-ios-lg bg-ios-blue/10 flex items-center justify-center mb-2 shadow-ios">
            <SettingsIcon className="w-7 h-7 text-ios-blue" />
          </div>
          <span className="text-xs text-ios-gray-500">设置</span>
        </button>
      </div>

      {/* Categories Section */}
      <div className="px-4 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-ios-gray-900">考试类型</h2>
          <button className="flex items-center text-ios-blue text-base">
            查看全部
            <span className="ml-1">→</span>
          </button>
        </div>
        
        <div className="overflow-x-auto hide-scrollbar -mx-4 px-4">
          <div className="flex space-x-4 pb-4">
            {categories.map(category => (
              <div key={category.id} className="flex-shrink-0 w-72 bg-white/90 backdrop-blur-ios rounded-ios-xl p-5 shadow-ios-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-3xl">{category.icon}</span>
                    <h3 className="font-medium mt-3 text-ios-gray-900 text-lg">{category.name}</h3>
                    <p className="text-base text-ios-gray-500 mt-1">{category.desc}</p>
                  </div>
                  <span className="text-base text-ios-gray-500">{category.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Questions */}
      <div className="px-4 mb-24">
        <h2 className="text-xl font-semibold text-ios-gray-900 mb-6">最近练习</h2>
        <div className="space-y-4">
          {recentQuestions.map(question => (
            <div key={question.id} className="bg-white/90 backdrop-blur-ios rounded-ios-xl p-5 shadow-ios-lg">
              <div className="flex gap-5">
                <img src={question.image} alt={question.title} className="w-24 h-24 rounded-ios-lg object-cover" />
                <div className="flex-1">
                  <h3 className="font-medium text-ios-gray-900 text-lg">{question.title}</h3>
                  <div className="mt-3 h-2 bg-ios-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-ios-blue rounded-full"
                      style={{ width: `${question.progress}%` }}
                    />
                  </div>
                  <p className="text-base text-ios-gray-500 mt-2">{question.lastTime}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-ios border-t border-ios-gray-100 px-6 py-4">
        <div className="flex justify-around">
          <button className="flex flex-col items-center text-ios-blue">
            <HomeIcon className="w-7 h-7 mb-1" />
            <span className="text-xs">练习</span>
          </button>
          <button className="flex flex-col items-center text-ios-gray-500">
            <BookOpen className="w-7 h-7 mb-1" />
            <span className="text-xs">题库</span>
          </button>
          <button className="flex flex-col items-center text-ios-gray-500">
            <Car className="w-7 h-7 mb-1" />
            <span className="text-xs">驾校服务</span>
          </button>
          <button className="flex flex-col items-center text-ios-gray-500">
            <FileText className="w-7 h-7 mb-1" />
            <span className="text-xs">错题记录</span>
          </button>
          <button className="flex flex-col items-center text-ios-gray-500">
            <User className="w-7 h-7 mb-1" />
            <span className="text-xs">个人中心</span>
          </button>
        </div>
      </nav>
    </div>
  );
}