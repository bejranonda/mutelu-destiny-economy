import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, MapPin, ShoppingBag, ArrowRight, RefreshCw, Share2, Ghost, Heart, Briefcase, Zap, Activity, Globe, ChevronDown, Check } from 'lucide-react';
import { ARCHETYPES } from './data/archetypes';
import { QUESTS } from './data/quests';
import { UNCLE_QUOTES, UNCLE_QUOTES_EN, UNCLE_QUOTES_DE } from './data/quotes';

type GameState = 'INTRO' | 'FORM' | 'PROCESSING' | 'RESULT';
type Topic = 'love' | 'work' | 'power' | 'health';
type Day = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

interface UserData {
  name: string;
  day: Day;
  topic: Topic;
}

interface FinalResult {
  archetype: typeof ARCHETYPES.sunday;
  quest: typeof QUESTS.love[0];
  luckScore: number;
  user: UserData;
}

export default function App() {
  const { t, i18n } = useTranslation();
  const [gameState, setGameState] = useState<GameState>('INTRO');
  const [userData, setUserData] = useState<UserData>({ name: '', day: 'sunday', topic: 'love' });
  const [finalResult, setFinalResult] = useState<FinalResult | null>(null);
  const [loadingText, setLoadingText] = useState("");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const languages = [
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  const getQuotes = () => {
    const lang = i18n.language;
    if (lang === 'de') return UNCLE_QUOTES_DE;
    if (lang === 'en') return UNCLE_QUOTES_EN;
    return UNCLE_QUOTES;
  };

  const handleStart = () => setGameState('FORM');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGameState('PROCESSING');
  };

  useEffect(() => {
    if (gameState === 'PROCESSING') {
      const quotes = getQuotes();
      let i = 0;
      const interval = setInterval(() => {
        setLoadingText(quotes[i % quotes.length]);
        i++;
      }, 1500);

      setTimeout(() => {
        clearInterval(interval);
        generateDestiny();
        setGameState('RESULT');
      }, 4500);

      return () => clearInterval(interval);
    }
  }, [gameState]);

  const generateDestiny = () => {
    const archetype = ARCHETYPES[userData.day];
    const topicQuests = QUESTS[userData.topic] || QUESTS['love'];
    const quest = topicQuests[Math.floor(Math.random() * topicQuests.length)];
    const luckScore = Math.floor(Math.random() * 40) + 60;

    setFinalResult({ archetype, quest, luckScore, user: userData });
  };

  const resetGame = () => {
    setGameState('INTRO');
    setFinalResult(null);
    setUserData({ name: '', day: 'sunday', topic: 'love' });
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const topics: { id: Topic; icon: typeof Heart; labelKey: string }[] = [
    { id: 'love', icon: Heart, labelKey: 'topics.love' },
    { id: 'work', icon: Briefcase, labelKey: 'topics.work' },
    { id: 'power', icon: Zap, labelKey: 'topics.power' },
    { id: 'health', icon: Activity, labelKey: 'topics.health' }
  ];

  const days: Day[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-900 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="fixed top-[-20%] right-[-10%] w-[500px] h-[500px] bg-amber-600/20 rounded-full blur-[100px]"></div>
      <div className="fixed bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px]"></div>

      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-20">
        <div className="relative">
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 text-slate-300 hover:border-amber-500/50 hover:text-amber-400 transition-all shadow-lg"
          >
            <Globe size={16} className="text-amber-500" />
            <span className="text-sm font-medium">
              {languages.find(l => l.code === i18n.language)?.flag} {languages.find(l => l.code === i18n.language)?.name}
            </span>
            <ChevronDown size={14} className={`transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {langDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setLangDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-40 rounded-xl bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 shadow-xl overflow-hidden z-20">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all ${
                      i18n.language === lang.code
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="flex-1 text-sm font-medium">{lang.name}</span>
                    {i18n.language === lang.code && (
                      <Check size={14} className="text-amber-400" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="max-w-md mx-auto min-h-screen relative flex flex-col items-center justify-center p-4">

        {/* HEADER LOGO */}
        <div className="absolute top-6 left-0 right-0 flex justify-center z-10">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
              MUTELU
            </span>
            <span className="h-4 w-[1px] bg-amber-500/50"></span>
            <span className="text-[10px] font-bold tracking-widest text-amber-500/80 uppercase mt-1">
              The Destiny Economy
            </span>
          </div>
        </div>

        {/* INTRO SCREEN */}
        {gameState === 'INTRO' && (
          <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500 pt-10 relative z-20 w-full">
            <div className="relative mb-8">
              <div className="w-40 h-40 bg-gradient-to-tr from-amber-500 to-indigo-600 rounded-full mx-auto blur-[60px] opacity-20 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl rotate-3 shadow-[0_0_40px_rgba(245,158,11,0.4)] flex items-center justify-center">
                  <Ghost size={48} className="text-white" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-600 drop-shadow-sm pb-2">
                {t('app.title')}
              </h1>
              <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto"></div>
              <p className="text-slate-400 text-sm md:text-base font-light tracking-wide max-w-sm mx-auto leading-relaxed">
                {t('app.subtitle')} <br />
                <span className="text-amber-500/70 text-xs font-medium mt-2 block">{t('app.aiTagline')}</span>
              </p>
            </div>

            <div className="px-6 w-full">
              <button
                onClick={handleStart}
                className="group relative w-full overflow-hidden rounded-full bg-white p-[1px] shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] active:scale-95"
              >
                <span className="absolute inset-[-1000%] animate-shimmer bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#F59E0B_50%,#E2E8F0_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-4 text-lg font-bold text-white backdrop-blur-3xl gap-3">
                  {t('app.startButton')} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>


            <p className="text-xs text-slate-600 mt-8">
              *{t('app.warning')}
            </p>
          </div>
        )}

        {/* FORM SCREEN */}
        {gameState === 'FORM' && (
          <div className="w-full max-w-sm bg-slate-800/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700 shadow-xl animate-in slide-in-from-bottom-10 duration-500">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-amber-400">{t('form.title')}</h2>
              <p className="text-xs text-slate-400">{t('form.subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">{t('form.nameLabel')}</label>
                <input
                  required
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  placeholder={t('form.namePlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">{t('form.dayLabel')}</label>
                <select
                  value={userData.day}
                  onChange={(e) => setUserData({ ...userData, day: e.target.value as Day })}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none appearance-none"
                >
                  {days.map(day => (
                    <option key={day} value={day}>{t(`days.${day}`)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">{t('form.topicLabel')}</label>
                <div className="grid grid-cols-2 gap-3">
                  {topics.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setUserData({ ...userData, topic: item.id })}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${userData.topic === item.id
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                          : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500'
                        }`}
                    >
                      <item.icon size={24} className="mb-1" />
                      <span className="text-sm">{t(item.labelKey)}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-amber-500/30"
              >
                {t('form.submit')}
              </button>
            </form>
          </div>
        )}

        {/* PROCESSING SCREEN */}
        {gameState === 'PROCESSING' && (
          <div className="text-center space-y-8 animate-pulse w-full max-w-xs relative z-20">
            <div className="relative w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 bg-amber-500 w-1/2 animate-shimmer"></div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white tracking-widest uppercase">Analyzing</h3>
              <p className="text-amber-400 font-mono text-xs">
                {'>'} {loadingText}
              </p>
            </div>
          </div>
        )}

        {/* RESULT SCREEN */}
        {gameState === 'RESULT' && finalResult && (
          <div className="w-full animate-in slide-in-from-bottom-20 duration-700">

            <div className="bg-[#fcf8f0] text-slate-900 rounded-3xl overflow-hidden shadow-2xl relative border-4 border-amber-600 max-w-sm mx-auto">

              <div className="bg-amber-700 p-4 text-center relative overflow-hidden">
                <h3 className="text-amber-100 font-bold text-sm tracking-widest uppercase">{t('result.cardTitle')}</h3>
                <h2 className="text-3xl font-extrabold text-white mt-1 drop-shadow-md">{finalResult.archetype.title}</h2>
              </div>

              <div className="p-6 text-center bg-gradient-to-b from-amber-100 to-[#fcf8f0]">
                <div className="text-8xl mb-2 animate-[bounce_3s_infinite]">{finalResult.archetype.icon}</div>
                <p className="text-amber-800 font-serif italic font-medium px-4">
                  "{finalResult.archetype.desc}"
                </p>
                <div className="flex justify-center gap-4 mt-4 text-xs font-bold text-slate-600">
                  <div className="bg-amber-200 px-3 py-1 rounded-full">{t('result.luck')}: {finalResult.luckScore}/100</div>
                  <div className="bg-amber-200 px-3 py-1 rounded-full">{finalResult.quest.stat}</div>
                </div>
              </div>

              <div className="p-6 pt-0 relative z-10">
                <div className="border-t-2 border-dashed border-amber-300 my-2"></div>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">{t('result.prediction')}</p>
                    <p className="text-sm text-slate-800 font-medium leading-relaxed">
                      {finalResult.quest.text}
                    </p>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 relative overflow-hidden">
                    <p className="text-xs font-bold text-amber-600 uppercase mb-1 flex items-center gap-1">
                      <Sparkles size={14} /> {t('result.mission')}
                    </p>
                    <p className="text-lg font-bold text-amber-900 leading-tight mb-2">
                      {finalResult.quest.action}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {finalResult.quest.detail}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded-md border border-green-200">
                    <MapPin size={10} /> {finalResult.quest.location}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-1 rounded-md border border-blue-200">
                    <ShoppingBag size={10} /> {finalResult.quest.product}
                  </span>
                </div>
              </div>

              <div className="bg-slate-900 p-3 text-center">
                <p className="text-[10px] text-slate-400">
                  {t('app.footer')}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-3 px-4">
              <button className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all">
                <Share2 size={20} /> {t('result.saveImage')}
              </button>
              <button
                onClick={resetGame}
                className="w-full bg-transparent border border-slate-600 hover:bg-slate-800 text-slate-300 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <RefreshCw size={20} /> {t('result.tryAgain')}
              </button>
            </div>

            <div className="h-10"></div>
          </div>
        )}

      </div>
    </div>
  );
}
