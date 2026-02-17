import { Day } from './archetypes';

export type Zodiac =
    | 'aries' | 'taurus' | 'gemini' | 'cancer'
    | 'leo' | 'virgo' | 'libra' | 'scorpio'
    | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';

export type Animal =
    | 'rat' | 'ox' | 'tiger' | 'rabbit'
    | 'dragon' | 'snake' | 'horse' | 'goat'
    | 'monkey' | 'rooster' | 'dog' | 'pig';

export const ZODIACS: Record<Zodiac, { th: string, dates: string, icon: string, element: string }> = {
    aries: { th: "เมษ", dates: "13 เม.ย. - 13 พ.ค.", icon: "♈", element: "ไฟ" },
    taurus: { th: "พฤษภ", dates: "14 พ.ค. - 13 มิ.ย.", icon: "♉", element: "ดิน" },
    gemini: { th: "เมถุน", dates: "14 มิ.ย. - 14 ก.ค.", icon: "♊", element: "ลม" },
    cancer: { th: "กรกฎ", dates: "15 ก.ค. - 16 ส.ค.", icon: "♋", element: "น้ำ" },
    leo: { th: "สิงห์", dates: "17 ส.ค. - 16 ก.ย.", icon: "♌", element: "ไฟ" },
    virgo: { th: "กันย์", dates: "17 ก.ย. - 16 ต.ค.", icon: "♍", element: "ดิน" },
    libra: { th: "ตุลย์", dates: "17 ต.ค. - 15 พ.ย.", icon: "♎", element: "ลม" },
    scorpio: { th: "พิจิก", dates: "16 พ.ย. - 15 ธ.ค.", icon: "♏", element: "น้ำ" },
    sagittarius: { th: "ธนู", dates: "16 ธ.ค. - 13 ม.ค.", icon: "♐", element: "ไฟ" },
    capricorn: { th: "มังกร", dates: "14 ม.ค. - 12 ก.พ.", icon: "♑", element: "ดิน" },
    aquarius: { th: "กุมภ์", dates: "13 ก.พ. - 13 มี.ค.", icon: "♒", element: "ลม" },
    pisces: { th: "มีน", dates: "14 มี.ค. - 12 เม.ย.", icon: "♓", element: "น้ำ" },
};

export const ANIMALS: Record<Animal, { th: string, icon: string }> = {
    rat: { th: "ชวด (หนู)", icon: "🐀" },
    ox: { th: "ฉลู (วัว)", icon: "🐂" },
    tiger: { th: "ขาล (เสือ)", icon: "🐅" },
    rabbit: { th: "เถาะ (กระต่าย)", icon: "🐇" },
    dragon: { th: "มะโรง (งูใหญ่)", icon: "🐉" },
    snake: { th: "มะเส็ง (งูเล็ก)", icon: "🐍" },
    horse: { th: "มะเมีย (ม้า)", icon: "🐎" },
    goat: { th: "มะแม (แพะ)", icon: "🐐" },
    monkey: { th: "วอก (ลิง)", icon: "🐒" },
    rooster: { th: "ระกา (ไก่)", icon: "🐓" },
    dog: { th: "จอ (หมา)", icon: "🐕" },
    pig: { th: "กุน (หมู)", icon: "🐖" },
};

export const calculateZodiac = (date: Date): Zodiac => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // 1-12

    if ((month === 4 && day >= 13) || (month === 5 && day <= 13)) return 'aries';
    if ((month === 5 && day >= 14) || (month === 6 && day <= 13)) return 'taurus';
    if ((month === 6 && day >= 14) || (month === 7 && day <= 14)) return 'gemini';
    if ((month === 7 && day >= 15) || (month === 8 && day <= 16)) return 'cancer';
    if ((month === 8 && day >= 17) || (month === 9 && day <= 16)) return 'leo';
    if ((month === 9 && day >= 17) || (month === 10 && day <= 16)) return 'virgo';
    if ((month === 10 && day >= 17) || (month === 11 && day <= 15)) return 'libra';
    if ((month === 11 && day >= 16) || (month === 12 && day <= 15)) return 'scorpio';
    if ((month === 12 && day >= 16) || (month === 1 && day <= 13)) return 'sagittarius';
    if ((month === 1 && day >= 14) || (month === 2 && day <= 12)) return 'capricorn';
    if ((month === 2 && day >= 13) || (month === 3 && day <= 13)) return 'aquarius';
    return 'pisces';
};

export const calculateAnimal = (year: number): Animal => {
    // Thai animal year roughly corresponds to (Year - 4) % 12
    // Rat is 1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020
    // (2020 - 4) % 12 = 0 -> Rat
    const animalOrder: Animal[] = [
        'rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake',
        'horse', 'goat', 'monkey', 'rooster', 'dog', 'pig'
    ];
    const index = (year - 4) % 12;
    return animalOrder[index >= 0 ? index : index + 12];
};

export const getDayFromDate = (date: Date): Day => {
    const days: Day[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[date.getDay()];
};
