import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

interface HistoryRecord {
  id: number;
  examType: string;
  date: string;
  duration: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
}

export function History() {
  const navigate = useNavigate();

  const historyRecords: HistoryRecord[] = [
    {
      id: 1,
      examType: '仮免許試験',
      date: '2023年10月15日',
      duration: '45分钟',
      score: 85,
      totalQuestions: 50,
      correctCount: 43
    },
    {
      id: 2,
      examType: '本免許試験',
      date: '2023年10月10日',
      duration: '50分钟',
      score: 90,
      totalQuestions: 50,
      correctCount: 45
    }
  ];

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
          <h1 className="text-2xl font-semibold text-ios-gray-900">答题历史</h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-ios-gray-400" />
          </div>
          <input
            type="text"
            placeholder="搜索历史记录"
            className="w-full h-11 pl-10 pr-4 bg-ios-gray-50/80 rounded-ios-lg text-base text-ios-gray-900 placeholder-ios-gray-500 border-none focus:outline-none focus:ring-2 focus:ring-ios-blue/20"
          />
        </div>
      </div>

      {/* History List */}
      <div className="p-4 space-y-4">
        {historyRecords.map(record => (
          <div
            key={record.id}
            className="bg-white/90 backdrop-blur-ios rounded-ios-xl p-5 shadow-ios-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-ios-blue text-sm">{record.examType}</span>
              <div className="flex items-center text-ios-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {record.date}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-ios-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                <span>{record.duration}</span>
              </div>
              <div className="text-2xl font-semibold text-ios-gray-900">
                {record.score}分
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center text-ios-green">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span>正确 {record.correctCount}</span>
              </div>
              <div className="flex items-center text-ios-red">
                <XCircle className="w-4 h-4 mr-1" />
                <span>错误 {record.totalQuestions - record.correctCount}</span>
              </div>
              <button
                onClick={() => navigate(`/exam?mode=review&examId=${record.id}`)}
                className="text-ios-blue text-sm"
              >
                查看详情
              </button>
            </div>
          </div>
        ))}

        {historyRecords.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-ios-gray-100 flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-ios-gray-400" />
            </div>
            <p className="text-ios-gray-500">暂无答题记录</p>
          </div>
        )}
      </div>
    </div>
  );
}