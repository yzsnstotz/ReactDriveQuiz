import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Mail, Phone, Calendar, MapPin } from 'lucide-react';

export function Profile() {
  const navigate = useNavigate();

  const userInfo = {
    name: '山田太郎',
    email: 'yamada@example.com',
    phone: '080-1234-5678',
    joinDate: '2023年10月',
    location: '栃木県足利市'
  };

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
          <h1 className="text-2xl font-semibold text-ios-gray-900">个人信息</h1>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-4 space-y-4">
        {/* Avatar Section */}
        <div className="bg-white/90 backdrop-blur-ios rounded-ios-xl p-5 shadow-ios-lg flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-ios-blue/10 flex items-center justify-center">
            <User className="w-10 h-10 text-ios-blue" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-ios-gray-900">{userInfo.name}</h2>
            <p className="text-ios-gray-500">驾考学员</p>
          </div>
        </div>

        {/* Info List */}
        <div className="bg-white/90 backdrop-blur-ios rounded-ios-xl shadow-ios-lg divide-y divide-ios-gray-100">
          <div className="p-4 flex items-center">
            <Mail className="w-5 h-5 text-ios-gray-400 mr-3" />
            <div>
              <p className="text-sm text-ios-gray-500">邮箱</p>
              <p className="text-base text-ios-gray-900">{userInfo.email}</p>
            </div>
          </div>
          <div className="p-4 flex items-center">
            <Phone className="w-5 h-5 text-ios-gray-400 mr-3" />
            <div>
              <p className="text-sm text-ios-gray-500">电话</p>
              <p className="text-base text-ios-gray-900">{userInfo.phone}</p>
            </div>
          </div>
          <div className="p-4 flex items-center">
            <Calendar className="w-5 h-5 text-ios-gray-400 mr-3" />
            <div>
              <p className="text-sm text-ios-gray-500">加入时间</p>
              <p className="text-base text-ios-gray-900">{userInfo.joinDate}</p>
            </div>
          </div>
          <div className="p-4 flex items-center">
            <MapPin className="w-5 h-5 text-ios-gray-400 mr-3" />
            <div>
              <p className="text-sm text-ios-gray-500">所在地</p>
              <p className="text-base text-ios-gray-900">{userInfo.location}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white/90 backdrop-blur-ios rounded-ios-xl shadow-ios-lg">
          <button
            onClick={() => navigate('/settings')}
            className="w-full p-4 text-left text-ios-blue"
          >
            编辑个人信息
          </button>
        </div>
      </div>
    </div>
  );
}