import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, Clock, RotateCcw, Star, ChevronRight, AlertCircle } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  japaneseText?: string;
}

export function ExamSimulation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [showJapanese, setShowJapanese] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const searchParams = new URLSearchParams(window.location.search);
        const spreadId = searchParams.get('spreadId');
        const sheetName = searchParams.get('sheetName');
        const apiKey = searchParams.get('apiKey');

        if (!spreadId || !sheetName || !apiKey) {
          throw new Error('缺少必要的参数');
        }

        const response = await fetch(`/api/questions?spreadId=${spreadId}&sheetName=${sheetName}&apiKey=${apiKey}`);
        if (!response.ok) {
          throw new Error('获取题目失败');
        }
        const questions = await response.json();
        setQuestions(questions);
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取题目失败');
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchQuestions();
    }
  }, [categoryId]);

  useEffect(() => {
    let interval: number;
    if (!isTimerPaused) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerPaused]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: 保存到 localStorage
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ios-gray-50 flex items-center justify-center">
        <div className="text-ios-gray-500">加载中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-ios-gray-50 flex items-center justify-center">
        <div className="text-ios-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ios-gray-50">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 bg-white/90 backdrop-blur-ios sticky top-0 z-50 border-b border-ios-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 text-ios-blue"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-ios-gray-900">模拟考试</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsTimerPaused(!isTimerPaused)}
              className="flex items-center text-ios-blue"
            >
              <Clock className="w-6 h-6" />
              <span className="ml-2">{formatTime(timer)}</span>
            </button>
            <button
              onClick={() => setShowJapanese(!showJapanese)}
              className={`text-sm px-3 py-1 rounded-full ${showJapanese ? 'bg-ios-blue text-white' : 'bg-ios-gray-100 text-ios-gray-900'}`}
            >
              日本語
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-ios-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-ios-blue rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div className="p-4">
        <div className="bg-white/90 backdrop-blur-ios rounded-ios-xl p-5 shadow-ios-lg mb-4">
          <div className="flex justify-between items-start mb-4">
            <span className="text-ios-gray-500">Question {currentQuestionIndex + 1}/{questions.length}</span>
            <button
              onClick={toggleBookmark}
              className={`${isBookmarked ? 'text-ios-yellow' : 'text-ios-gray-400'}`}
            >
              <Star className="w-6 h-6" />
            </button>
          </div>
          <p className="text-lg text-ios-gray-900 mb-2">{currentQuestion.question}</p>
          {showJapanese && currentQuestion.japaneseText && (
            <p className="text-base text-ios-gray-500 mb-4">{currentQuestion.japaneseText}</p>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showExplanation}
              className={`w-full p-4 rounded-ios-lg text-left transition-colors ${selectedAnswer === index
                ? index === currentQuestion.correctAnswer
                  ? 'bg-ios-green/10 border-2 border-ios-green'
                  : 'bg-ios-red/10 border-2 border-ios-red'
                : 'bg-white/90 border-2 border-transparent hover:border-ios-blue/30'}`}
            >
              <div className="flex items-start">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-ios-gray-100 text-ios-gray-900 mr-3">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1 text-ios-gray-900">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="mt-6 bg-ios-blue/5 rounded-ios-xl p-5">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-ios-blue flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-medium text-ios-gray-900 mb-2">解説</h3>
                <p className="text-ios-gray-700">{currentQuestion.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-ios border-t border-ios-gray-100 p-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              setCurrentQuestionIndex(0);
              setSelectedAnswer(null);
              setShowExplanation(false);
              setTimer(0);
            }}
            className="flex items-center text-ios-blue"
          >
            <RotateCcw className="w-6 h-6 mr-2" />
            重新开始
          </button>
          {showExplanation && (
            <button
              onClick={handleNextQuestion}
              className="flex items-center bg-ios-blue text-white px-6 py-3 rounded-full"
            >
              下一题
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}