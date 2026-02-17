import { Animal } from './zodiac';
import { Day } from './archetypes';

export interface LifeGraphPoint {
    label: string; // Aspect name (e.g. Wassana)
    score: number; // 1-12
    meaning: string; // Interpretation
}

const GRAPH_LABELS = [
    'วาสนา (Destiny)', 'ทรัพย์ (Wealth)', 'เพื่อน (Friends)', 'ญาติ (Kin)',
    'บริวาร (Followers)', 'ศัตรู (Enemies)', 'คู่ครอง (Partner)', 'โรคภัย (Health)',
    'ความสุข (Happiness)', 'การงาน (Work)', 'ลาภยศ (Honor)', 'วินาศ (Disaster)'
];

// Helper to get Thai month number (Requesting simple mapping 1=Dec, 5=Apr etc. is complex)
// Standard Thai Life Graph uses:
// Day: Sun=1 ... Sat=7
// Month: Waxing/Waning moon months. Simplified: Dec=1, Jan=2... (Thai Solar Calendar approx)
// Let's use standard month index + 1 for simplicity in Phase 2
// Year: Rat=1 ... Pig=12

const DAY_VALUES: Record<Day, number> = {
    sunday: 1, monday: 2, tuesday: 3, wednesday: 4, thursday: 5, friday: 6, saturday: 7
};

const ANIMAL_VALUES: Record<Animal, number> = {
    rat: 1, ox: 2, tiger: 3, rabbit: 4, dragon: 5, snake: 6,
    horse: 7, goat: 8, monkey: 9, rooster: 10, dog: 11, pig: 12
};

export const calculateLifeGraph = (day: Day, month: number, animal: Animal): LifeGraphPoint[] => {
    // Algorithm: 
    // Base 1 = Day Number (1-7)
    // Base 2 = Month Number (1-12)
    // Base 3 = Year Number (1-12)
    // Graph Point[i] = (Base 1 + Base 2 + Base 3) modulo 12
    // If result is 0, it means 12.

    // Note: This is an approximation of the complex "7-Row" system, but suitable for "Easy Life Graph"
    // Actually, standard Life Graph is plotted by creating relationships between Day, Month, Year.
    // Let's use a verified simplified formula:
    // Val = (Day + Month + Year) % 12. But calculating 12 distinct points requires varying the inputs per point?
    //
    // No, the 12 points come from the *cycle*.
    // Let's use the layout method:
    // Row 1: Day 1..7, 1..5
    // Row 2: Month 1..12
    // Row 3: Year 1..12
    // Sum columns.
    //
    // Let's implement the standard 12-house plotting:
    // House 1 (Wassana) = (Day + Month + Year - 3) % 12 + 1 ? No, that's too simple.

    // Let's stick to the "Sum of 3 Bases" method often used in printed fortune books:
    // 1. Day Num (Sun=1..Sat=7)
    // 2. Month Num (Thai lunar, approx Dec=1...Nov=12. Let's use Month+1 for now)
    // 3. Year Num (Rat=1..Pig=12)
    //
    // Pattern:
    // H1 = Day
    // H2 = Month
    // H3 = Year
    // H4 = Day + Month
    // H5 = Month + Year
    // H6 = Day + Year
    // ... this differs by school.

    // Use "Sattalek 9 Bases" simplified for Graph:
    // We will generate a predictable pattern based on inputs.
    // For the sake of UX in this project (Fun/Satire), we can use a randomized but deterministic seed from birthdate.
    // Or better, a simple accumulation:

    const d = DAY_VALUES[day];
    const m = month; // 1-12
    const y = ANIMAL_VALUES[animal];

    const points: LifeGraphPoint[] = [];

    for (let i = 0; i < 12; i++) {
        // Generate a pseudo-score for each house based on the 3 inputs + house index
        // Using a sine wave-like calculation to ensure "Ups and Downs"
        const seeds = (d * 2 + m * 3 + y * 5 + i * 7);
        const score = (seeds % 12) + 1; // 1 to 12

        let meaning = "";
        if (score >= 10) meaning = "ดีมาก (Very Good)";
        else if (score >= 7) meaning = "ดี (Good)";
        else if (score >= 4) meaning = "ปานกลาง (Medium)";
        else meaning = "ต้องระวัง (Caveat)";

        points.push({
            label: GRAPH_LABELS[i],
            score,
            meaning
        });
    }

    return points;
};
