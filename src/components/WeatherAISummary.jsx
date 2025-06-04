import React, { useState, useMemo } from 'react';
import { useWeather } from '../context/WeatherContext';
import { generateWeatherSummary } from '../api/aiSummary';
import { 
  MessageCircle, 
  X,
  Sun,
  Umbrella,
  Shirt,
  Heart,
  Car,
  Coffee,
  Sparkles,
  Send,
  Calendar,
  Clock,
  TrendingUp,
  Eye
} from 'lucide-react';

const WeatherAISummary = ({ isOpen, onClose }) => {
  const { weather, forecast } = useWeather();
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('summaries');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [summaryType, setSummaryType] = useState(null);

  // Smart question generation (secondary feature)
  const smartQuestions = useMemo(() => {
    if (!weather || !forecast) return [];

    const temp = Math.round(weather.main?.temp || 0);
    const humidity = weather.main?.humidity || 0;
    const windSpeed = weather.wind?.speed || 0;
    const condition = weather.weather?.[0]?.main?.toLowerCase() || '';
    const city = weather.name || 'your area';
    
    const questions = [
      {
        id: 'sunscreen',
        text: `Do I need sunscreen today in ${city}?`,
        icon: <Sun className="w-4 h-4 text-yellow-500" />,
        color: 'yellow',
        show: temp > 15 || condition === 'clear'
      },
      {
        id: 'umbrella',
        text: `Should I carry an umbrella today?`,
        icon: <Umbrella className="w-4 h-4 text-blue-500" />,
        color: 'blue',
        show: condition.includes('rain') || condition.includes('cloud') || humidity > 70
      },
      {
        id: 'clothing',
        text: `What should I wear in this ${temp}°C weather?`,
        icon: <Shirt className="w-4 h-4 text-purple-500" />,
        color: 'purple',
        show: true
      },
      {
        id: 'health',
        text: `Any health tips for today's weather?`,
        icon: <Heart className="w-4 h-4 text-red-500" />,
        color: 'red',
        show: temp > 30 || temp < 5 || humidity > 80
      },
      {
        id: 'driving',
        text: `Is it safe to drive in these conditions?`,
        icon: <Car className="w-4 h-4 text-green-500" />,
        color: 'green',
        show: condition.includes('rain') || condition.includes('fog') || windSpeed > 8
      },
      {
        id: 'activities',
        text: `Best outdoor activities for today's weather?`,
        icon: <Coffee className="w-4 h-4 text-orange-500" />,
        color: 'orange',
        show: temp > 10 && temp < 35 && !condition.includes('rain')
      },
      {
        id: 'hydration',
        text: `How much water should I drink today?`,
        icon: <Heart className="w-4 h-4 text-cyan-500" />,
        color: 'cyan',
        show: true
      },
      {
        id: 'comfort',
        text: `Tips to stay comfortable today?`,
        icon: <Sparkles className="w-4 h-4 text-pink-500" />,
        color: 'pink',
        show: true
      }
    ];

    return questions.filter(q => q.show).slice(0, 6);
  }, [weather, forecast]);

  const handleSummaryGenerate = async (type) => {
    if (!weather || !forecast) return;

    setSelectedQuestion(null);
    setSummaryType(type);
    setSummary('');
    setLoading(true);
    setActiveSection('result');

    try {
      const result = await generateWeatherSummary(weather, forecast, type);
      setSummary(result);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setSummary('Sorry, I couldn\'t generate the summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionClick = async (question) => {
    if (!weather || !forecast) return;

    setSelectedQuestion(question);
    setSummaryType(null);
    setSummary('');
    setLoading(true);
    setActiveSection('result');

    try {
      const result = await generateWeatherSummary(weather, forecast, 'question', question.text);
      setSummary(result);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setSummary('Sorry, I couldn\'t generate an answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetToMain = () => {
    setActiveSection('summaries');
    setSelectedQuestion(null);
    setSummaryType(null);
    setSummary('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-slate-600/50 w-full max-w-2xl max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Weather Assistant</h2>
              <p className="text-blue-100">
                {weather?.name ? `Weather insights for ${weather.name}` : 'Get personalized weather insights'}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          
          {activeSection === 'summaries' && (
            <div className="space-y-6">
              {/* Main Summary Options */}
              <div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Eye className="w-6 h-6 text-blue-400" />
                  Weather Summaries
                </h3>
                
                <div className="grid gap-4 mb-8">
                  {/* Today's Summary */}
                  <button
                    onClick={() => handleSummaryGenerate('today')}
                    className="group flex items-center gap-4 p-6 bg-gradient-to-r from-blue-600/20 to-blue-700/30 hover:from-blue-600/30 hover:to-blue-700/40 rounded-2xl transition-all duration-300 border border-blue-500/30 hover:border-blue-400/50 text-left hover:scale-[1.02]"
                  >
                    <div className="p-4 bg-blue-500/30 rounded-2xl group-hover:scale-110 transition-transform">
                      <Clock className="w-8 h-8 text-blue-300" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors mb-2">
                        Today's Weather Summary
                      </h4>
                      <p className="text-blue-200 text-sm">
                        Complete overview of current conditions, hourly forecast, and what to expect today
                      </p>
                    </div>
                    <TrendingUp className="w-6 h-6 text-blue-400 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* 5-Day Summary */}
                  <button
                    onClick={() => handleSummaryGenerate('forecast')}
                    className="group flex items-center gap-4 p-6 bg-gradient-to-r from-green-600/20 to-green-700/30 hover:from-green-600/30 hover:to-green-700/40 rounded-2xl transition-all duration-300 border border-green-500/30 hover:border-green-400/50 text-left hover:scale-[1.02]"
                  >
                    <div className="p-4 bg-green-500/30 rounded-2xl group-hover:scale-110 transition-transform">
                      <Calendar className="w-8 h-8 text-green-300" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white group-hover:text-green-200 transition-colors mb-2">
                        5-Day Forecast Summary
                      </h4>
                      <p className="text-green-200 text-sm">
                        Weekly weather trends, planning advice, and key highlights for the upcoming days
                      </p>
                    </div>
                    <TrendingUp className="w-6 h-6 text-green-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-slate-600/50"></div>
                <span className="text-slate-400 text-sm font-medium">OR ASK SPECIFIC QUESTIONS</span>
                <div className="flex-1 h-px bg-slate-600/50"></div>
              </div>

              {/* Smart Questions (Secondary) */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  Quick Questions
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {smartQuestions.map((question) => (
                    <button
                      key={question.id}
                      onClick={() => handleQuestionClick(question)}
                      className={`group flex items-center gap-3 p-3 bg-slate-800/40 hover:bg-slate-700/60 rounded-xl transition-all duration-300 border border-slate-600/30 hover:border-${question.color}-500/50 text-left hover:scale-[1.02]`}
                    >
                      <div className={`p-2 bg-${question.color}-500/20 rounded-lg group-hover:scale-110 transition-transform`}>
                        {question.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium group-hover:text-blue-300 transition-colors">
                          {question.text}
                        </p>
                      </div>
                      <Send className="w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'result' && (
            <div className="space-y-6">
              {/* Header with back button */}
              <div className="flex items-center gap-4">
                <button
                  onClick={resetToMain}
                  className="p-2 hover:bg-slate-700/50 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
                <div className="flex-1">
                  {summaryType && (
                    <h3 className="text-lg font-semibold text-white">
                      {summaryType === 'today' ? "Today's Weather Summary" : "5-Day Forecast Summary"}
                    </h3>
                  )}
                  {selectedQuestion && (
                    <h3 className="text-lg font-semibold text-white">Question Answer</h3>
                  )}
                </div>
              </div>

              {/* Question display (if applicable) */}
              {selectedQuestion && (
                <div className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-2xl border border-slate-600/30">
                  <div className={`p-3 bg-${selectedQuestion.color}-500/20 rounded-xl flex-shrink-0`}>
                    {selectedQuestion.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{selectedQuestion.text}</p>
                  </div>
                </div>
              )}

              {/* Result */}
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-600/30 min-h-[300px]">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-400 border-t-transparent"></div>
                      <span className="text-slate-300 font-medium">
                        {summaryType ? 'Generating summary...' : 'Finding answer...'}
                      </span>
                    </div>
                  </div>
                ) : summary ? (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                      <h4 className="font-semibold text-white">AI Response</h4>
                    </div>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">
                        {summary}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={resetToMain}
                  className="flex-1 px-4 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-xl transition-colors font-medium"
                >
                  Ask Something Else
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Modal trigger button component
export const WeatherAssistantButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
    >
      <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
      Get AI Insight
    </button>
  );
};

export default WeatherAISummary;