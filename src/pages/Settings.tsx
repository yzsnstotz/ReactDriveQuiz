import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, Moon, Globe, Volume2, HelpCircle, LogOut } from 'lucide-react';

export function Settings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ios-gray-50">
      {/* Header */}
      <div className="px-4 pt-12 pb-2 bg-white/90 backdrop-blur-ios sticky top-0 z-50 border-b border-ios-gray-100">
        <div className="flex items-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 text-ios-blue"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-semibold text-ios-gray-900">设置</h1>
        </div>
      </div>

      {/* Settings List */}
      <div className="p-4 space-y-4">
        {/* Notification Settings */}
        <div className="bg-white/90 backdrop-blur-ios rounded-ios-xl shadow-ios-lg">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="w-5 h-5 text-ios-blue mr-3" />
              <span className="text-ios-gray-900">通知设置</span>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only peer"
                id="notifications"
              />
              <div className="w-11 h-6 bg-ios-gray-200 rounded-full peer peer-checked:bg-ios-green"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-white/90 backdrop-blur-ios rounded-ios-xl shadow-ios-lg divide-y divide-ios-gray-100">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Moon className="w-5 h-5 text-ios-purple mr-3" />
              <span className="text-ios-gray-900">深色模式</span>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only peer"
                id="darkMode"
              />
              <div className="w-11 h-6 bg-ios-gray-200 rounded-full peer peer-checked:bg-ios-green"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Globe className="w-5 h-5 text-ios-green mr-3" />
              <span className="text-ios-gray-900">语言</span>
            </div>
            <span className="text-ios-gray-500">简体中文</span>
          </div>
        </div>

        {/* Sound Settings */}
        <div className="bg-white/90 backdrop-blur-ios rounded-ios-xl shadow-ios-lg">
          <div className="p-4">
            <div className="flex items-center mb-2">
              <Volume2 className="w-5 h-5 text-ios-orange mr-3" />
              <span className="text-ios-gray-900">音量</span>
            </div>
            <input
              type="range"
              className="w-full h-1 bg-ios-gray-200 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-ios-blue"
            />
          </div>
        </div>

        {/* Help & Support */}
        <div className="bg-white/90 backdrop-blur-ios rounded-ios-xl shadow-ios-lg">
          <button className="w-full p-4 flex items-center">
            <HelpCircle className="w-5 h-5 text-ios-blue mr-3" />
            <span className="text-ios-gray-900">帮助与支持</span>
          </button>
        </div>

        {/* Logout */}
        <div className="bg-white/90 backdrop-blur-ios rounded-ios-xl shadow-ios-lg">
          <button className="w-full p-4 flex items-center justify-center text-ios-red">
            <LogOut className="w-5 h-5 mr-2" />
            退出登录
          </button>
        </div>
      </div>
    </div>
  );
}