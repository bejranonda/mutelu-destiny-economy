import { Day } from './archetypes';

export interface DailyFortune {
    date: string; // YYYY-MM-DD
    luckScore: number; // 0-100
    prediction: string;
    color: string;
}

// Day of Week mapping (0=Sun, 1=Mon...)
const DAY_INDEX: Day[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// Friendly Pairs (Mitr) - Support each other
const FRIENDLY_PAIRS: Record<Day, Day> = {
    sunday: 'thursday',
    monday: 'wednesday',
    tuesday: 'friday',
    wednesday: 'monday',
    thursday: 'sunday',
    friday: 'tuesday',
    saturday: 'wednesday' // Simplified: Wed Night/Rahu is usually associated with Sat, here mapping to Wed generic
};

// Enemy Pairs (Satru) - Conflict
const ENEMY_PAIRS: Record<Day, Day> = {
    sunday: 'tuesday',
    monday: 'thursday',
    tuesday: 'sunday',
    wednesday: 'friday', // Wed Night vs Mon in some texts, Wed vs Fri (Sun/Fri/Tue/Thur/Sat/Wed/Mon/Rah) 
    thursday: 'saturday', // Teacher vs Soldier? 
    friday: 'wednesday', // Fri vs Wed Night = conflict
    saturday: 'thursday'
};

// Colors for each day (Lucky colors for that day)
const DAILY_COLORS: Record<Day, string> = {
    sunday: '#EF4444', // Red
    monday: '#F59E0B', // Yellow/Gold
    tuesday: '#EC4899', // Pink
    wednesday: '#10B981', // Green
    thursday: '#F97316', // Orange
    friday: '#3B82F6', // Blue
    saturday: '#8B5CF6' // Purple
};

export const calculateDailyFortune = (birthDay: Day): DailyFortune => {
    const today = new Date();
    const currentDayIndex = today.getDay();
    const currentDay = DAY_INDEX[currentDayIndex];

    let score = 70; // Base score
    let predictionKey = "neutral";

    // Logic: Check relationship between Birth Day and Current Day
    if (FRIENDLY_PAIRS[birthDay] === currentDay) {
        score = 90 + Math.floor(Math.random() * 10);
        predictionKey = "friend";
    } else if (ENEMY_PAIRS[birthDay] === currentDay) {
        score = 40 + Math.floor(Math.random() * 20);
        predictionKey = "enemy";
    } else if (birthDay === currentDay) {
        score = 80 + Math.floor(Math.random() * 10);
        predictionKey = "own";
    } else {
        score = 60 + Math.floor(Math.random() * 20);
    }

    return {
        date: today.toISOString().split('T')[0],
        luckScore: score,
        prediction: predictionKey, // To be translated
        color: DAILY_COLORS[currentDay]
    };
};
