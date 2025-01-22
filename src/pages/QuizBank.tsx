import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, Globe2, BookOpen } from 'lucide-react';

interface SubCategory {
  sheetName: string;
  lang: string;
  spreadId: string;
  apiKey: string;
}

interface QuizCategory {
  internalName: string;
  lang: string;
  categoryName: string;
  sheetName: string;
  spreadId: string;
  apiKey: string;
  internalCode: string;
  subCategories: SubCategory[];
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

  const [quizCategories, setQuizCategories] = useState<QuizCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('获取题库分类失败');
        }
        const data = await response.json();
        setQuizCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取题库分类失败');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = quizCategories.filter(category => 
    (category.lang === selectedLanguage || selectedLanguage === 'all') &&
    (searchQuery === '' ||
      category.categoryName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-ios-gray-50">
      {loading ? (
        <div className="min-h-screen bg-ios-gray-50 flex items-center justify-center">
          <div className="text-ios-gray-500">加载中...</div>
        </div>
      ) : error ? (
        <div className="min-h-screen bg-ios-gray-50 flex items-center justify-center">
          <div className="text-ios-red-500">{error}</div>
        </div>
      ) : (
        <>
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
            <div key={category.internalName} className="space-y-2">
              <div className="w-full bg-white/90 backdrop-blur-ios rounded-ios-xl p-5 shadow-ios-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <BookOpen className="w-6 h-6 text-ios-blue" />
                      <h3 className="font-medium text-ios-gray-900 text-lg">{category.categoryName}</h3>
                    </div>
                  </div>
                </div>
                {/* Sub Categories */}
                <div className="mt-4 space-y-2">
                  {category.subCategories
                    .filter(sub => sub.lang === selectedLanguage || selectedLanguage === 'all')
                    .map((subCategory, index) => (
                      <button
                        key={`${category.internalName}-${index}`}
                        onClick={() => navigate(`/exam?spreadId=${subCategory.spreadId}&sheetName=${subCategory.sheetName}&apiKey=${subCategory.apiKey}`)}
                        className="w-full p-3 bg-ios-gray-50 rounded-ios-lg hover:bg-ios-gray-100 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-ios-gray-900">{subCategory.sheetName}</span>
                          <ChevronLeft className="w-4 h-4 text-ios-gray-400 transform rotate-180" />
                        </div>
                      </button>
                    ))
                  }
                </div>
              </div>
            </div>
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