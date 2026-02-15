import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, MapPin, ShoppingBag, ArrowRight, RefreshCw, Share2, Ghost, Heart, Briefcase, Zap, Activity } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-900 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/thatch.png')]"></div>

      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-20 flex gap-2">
        {['th', 'en', 'de'].map(lang => (
          <button
            key={lang}
            onClick={() => changeLanguage(lang)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              i18n.language === lang
                ? 'bg-amber-500 text-slate-900'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
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
          <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500 pt-10">
            <div className="relative">
              <div className="w-40 h-40 bg-amber-500 rounded-full mx-auto blur-[60px] opacity-20 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Ghost size={80} className="text-amber-500/90 relative z-10 animate-[bounce_3s_infinite]" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-600 drop-shadow-sm pb-2">
                {t('app.title')}
              </h1>
              <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto"></div>
              <p className="text-slate-400 text-sm md:text-base font-light tracking-wide max-w-sm mx-auto leading-relaxed">
                "{t('app.subtitle')} <br/>
                <span className="text-amber-500/70 text-xs font-medium mt-2 block">{t('app.aiTagline')}</span>"
              </p>
            </div>

            <button
              onClick={handleStart}
              className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-slate-900 transition-all duration-300 bg-amber-500 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 active:scale-95 shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)]"
            >
              <span className="absolute inset-0 transition-all duration-1000 group-hover:rotate-180 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-400 rounded-full opacity-0 group-hover:opacity-100"></span>
              <span className="relative flex items-center gap-3">
                {t('app.startButton')} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

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
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  placeholder={t('form.namePlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">{t('form.dayLabel')}</label>
                <select
                  value={userData.day}
                  onChange={(e) => setUserData({...userData, day: e.target.value as Day})}
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
                      onClick={() => setUserData({...userData, topic: item.id})}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                        userData.topic === item.id
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
          <div className="text-center space-y-6 animate-pulse">
            <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
               <div className="absolute inset-0 border-4 border-amber-500/30 rounded-full animate-ping"></div>
               <div className="absolute inset-4 border-4 border-amber-500/50 rounded-full animate-[spin_3s_linear_infinite]"></div>
               <div className="absolute inset-8 border-4 border-amber-500/70 rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
               <span className="text-4xl">🔮</span>
            </div>

            <div className="bg-slate-800/80 px-6 py-4 rounded-2xl border border-amber-500/30">
              <p className="text-xl font-medium text-amber-400 font-serif italic">
                "{loadingText}"
              </p>
            </div>
            <p className="text-xs text-slate-500">{t('processing.title')}</p>
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
                      <Sparkles size={14}/> {t('result.mission')}
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
