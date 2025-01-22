import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Star } from 'lucide-react';

interface FavoriteQuestion {
  id: number;
  question: string;
  category: string;
  addedTime: string;
  japaneseText?: string;
}

export function Favorites() {
  const navigate = useNavigate();
  const [showJapanese, setShowJapanese] = useState(false);
  const [favoriteQuestions, setFavoriteQuestions] = useState<FavoriteQuestion[]>([]);

  useEffect(() => {
    // TODO: 从 localStorage 加载收藏题目
    const mockFavorites: FavoriteQuestion[] = [
      {
        id: 1,
        question: '高速道路で故障車の後方に停止表示器材を置く場合、何メートル以上離して置かなければなりませんか？',
        japaneseText: '在高速公路上，故障车辆后方放置停车警示标志时，需要距离多少米以上？',
        category: '本免許試験',
        addedTime: '2小时前'
      },
      {
        id: 2,
        question: '交差点で右折する時、対向車線を走行してくる自転車に対して、どのような注意が必要ですか？',
        japaneseText: '十字路口右转时，对于对向车道行驶的自行车应该注意什么？',
        category: '仮免許試験',
        addedTime: '昨天'
      }
    ];
    setFavoriteQuestions(mockFavorites);
  }, []);

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
          <h1 className="text-2xl font-semibold text-ios-gray-900">我的收藏</h1>
          <div className="flex-1 flex justify-end space-x-4">
            <button
              onClick={() => setShowJapanese(!showJapanese)}
              className={`text-sm px-3 py-1 rounded-full ${showJapanese ? 'bg-ios-blue text-white' : 'bg-ios-gray-100 text-ios-gray-900'}`}
            >
              日本語
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
            placeholder="搜索收藏题目"
            className="w-full h-11 pl-10 pr-4 bg-ios-gray-50/80 rounded-ios-lg text-base text-ios-gray-900 placeholder-ios-gray-500 border-none focus:outline-none focus:ring-2 focus:ring-ios-blue/20"
          />
        </div>
      </div>

      {/* Favorite Questions List */}
      <div className="p-4 space-y-4">
        {favoriteQuestions.map(question => (
          <div
            key={question.id}
            className="bg-white/90 backdrop-blur-ios rounded-ios-xl p-5 shadow-ios-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-ios-blue text-sm">{question.category}</span>
              <span className="text-ios-gray-500 text-sm">{question.addedTime}</span>
            </div>
            <p className="text-lg text-ios-gray-900 mb-2">{question.question}</p>
            {showJapanese && question.japaneseText && (
              <p className="text-base text-ios-gray-500">{question.japaneseText}</p>
            )}
            <div className="mt-3 flex items-center justify-between">
              <button
                onClick={() => navigate(`/exam?mode=review&questionId=${question.id}`)}
                className="text-ios-blue text-sm"
              >
                立即练习
              </button>
              <button className="text-ios-yellow">
                <Star className="w-5 h-5 fill-current" />
              </button>
            </div>
          </div>
        ))}

        {favoriteQuestions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-ios-gray-100 flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-ios-gray-400" />
            </div>
            <p className="text-ios-gray-500">暂无收藏题目</p>
          </div>
        )}
      </div>
    </div>
  );
}