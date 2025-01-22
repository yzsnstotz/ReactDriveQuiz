import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, Globe2, BookOpen } from 'lucide-react';

interface QuizCategory {
  id: number;
  name: string;
  description: string;
  questionCount: number;
  language: string;
  sheetId: string;
  sheetName: string;
}

export function QuizBank() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('ja');
  const [searchQuery, setSearchQuery] = useState('');

  const languages = [
    { code: 'ja', name: '日本語' },
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' },
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'ko', name: '한국어' }
  ];

  const quizCategories: QuizCategory[] = [
    {
      id: 1,
      name: '仮免許試験対策',
      description: '仮免許試験の出題範囲を網羅した問題集',
      questionCount: 100,
      language: 'ja',
      sheetId: 'sheet1',
      sheetName: 'provisional'
    },
    {
      id: 2,
      name: '本免許試験対策',
      description: '本免許試験の出題範囲を網羅した問題集',
      questionCount: 150,
      language: 'ja',
      sheetId: 'sheet2',
      sheetName: 'full'
    }
  ];

  const filteredCategories = quizCategories.filter(category => 
    (category.language === selectedLanguage || selectedLanguage === 'all') &&
    (searchQuery === '' ||
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
          <h1 className="text-2xl font-semibold text-ios-gray-900">题库</h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-ios-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索题库"
            className="w-full h-11 pl-10 pr-4 bg-ios-gray-50/80 rounded-ios-lg text-base text-ios-gray-900 placeholder-ios-gray-500 border-none focus:outline-none focus:ring-2 focus:ring-ios-blue/20"
          />
        </div>

        {/* Language Selector */}
        <div className="flex items-center space-x-2 mb-4 overflow-x-auto hide-scrollbar">
          <Globe2 className="w-5 h-5 text-ios-gray-500 flex-shrink-0" />
          <button
            onClick={() => setSelectedLanguage('all')}
            className={`px-4 py-2 rounded-full text-sm ${selectedLanguage === 'all' ? 'bg-ios-blue text-white' : 'bg-ios-gray-100 text-ios-gray-900'}`}
          >
            全部
          </button>
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`px-4 py-2 rounded-full text-sm ${selectedLanguage === lang.code ? 'bg-ios-blue text-white' : 'bg-ios-gray-100 text-ios-gray-900'}`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Categories */}
      <div className="p-4 space-y-4">
        {filteredCategories.length > 0 ? (
          filteredCategories.map(category => (
            <button
              key={category.id}
              onClick={() => navigate(`/exam?category=${category.id}`)}
              className="w-full bg-white/90 backdrop-blur-ios rounded-ios-xl p-5 shadow-ios-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <BookOpen className="w-6 h-6 text-ios-blue" />
                    <h3 className="font-medium text-ios-gray-900 text-lg">{category.name}</h3>
                  </div>
                  <p className="text-base text-ios-gray-500">{category.description}</p>
                  <div className="mt-3 flex items-center space-x-4">
                    <span className="text-sm text-ios-gray-500">{category.questionCount} 题</span>
                  </div>
                </div>
                <div className="text-ios-blue">
                  <ChevronLeft className="w-5 h-5 transform rotate-180" />
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-ios-gray-100 flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-ios-gray-400" />
            </div>
            <p className="text-ios-gray-500">未找到相关题库</p>
          </div>
        )}
      </div>
    </div>
  );
}