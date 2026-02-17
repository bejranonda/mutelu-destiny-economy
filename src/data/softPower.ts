import { Zodiac, ZODIACS } from './zodiac';

export interface SoftPowerProduct {
    id: string;
    name: string;
    province: string;
    region: string;
    element: 'fire' | 'water' | 'wind' | 'earth';
    description: string;
    image?: string; // Placeholder or emoji
    priceRange?: string;
}

export const SOFT_POWER_DB: SoftPowerProduct[] = [
    // FIRE (Passion, Energy) -> Northeast (Isan), Hot colors
    {
        id: 'sp_001',
        name: 'Praewa Silk (ผ้าไหมแพรวา)',
        province: 'Kalasin',
        region: 'Northeast',
        element: 'fire',
        description: 'The "Queen of Silks". Intense colors and intricate patterns fuel your passion and status.',
        image: '🧣'
    },
    {
        id: 'sp_002',
        name: 'Volcanic Soil Durian (ทุเรียนดินภูเขาไฟ)',
        province: 'Sisaket',
        region: 'Northeast',
        element: 'fire',
        description: 'Grown in mineral-rich volcanic soil. Provides intense energy and luxury.',
        image: '🥔'
    },

    // WATER (Flow, Emotion) -> South, Coastal, Drinks
    {
        id: 'sp_003',
        name: 'Ranong Hot Springs (น้ำพุร้อนระนอง)',
        province: 'Ranong',
        region: 'South',
        element: 'water',
        description: 'Mineral-rich hot water to soothe emotions and cleanse the aura.',
        image: '♨️'
    },
    {
        id: 'sp_004',
        name: 'Chaiya Salted Egg (ไข่เค็มไชยา)',
        province: 'Surat Thani',
        region: 'South',
        element: 'water',
        description: 'Preserved with care. Represents stability in fluidity and wealth accumulation.',
        image: '🥚'
    },

    // WIND (Movement, Intellect) -> North, Fragrances, Light crafts
    {
        id: 'sp_005',
        name: 'Bo Sang Umbrella (ร่มบ่อสร้าง)',
        province: 'Chiang Mai',
        region: 'North',
        element: 'wind',
        description: 'Beautifully crafted bamboo umbrellas. Protects from bad winds and enhances social grace.',
        image: '☂️'
    },
    {
        id: 'sp_006',
        name: 'Arabica Coffee (กาแฟดอยตุง)',
        province: 'Chiang Rai',
        region: 'North',
        element: 'wind',
        description: 'High-altitude aromatic coffee. Stimulates the mind and inspires new ideas.',
        image: '☕'
    },

    // EARTH (Stability, Material) -> Central, Pottery, Rice
    {
        id: 'sp_007',
        name: 'Benjarong Ware (เครื่องเบญจรงค์)',
        province: 'Samut Sakhon',
        region: 'Central',
        element: 'earth',
        description: 'Five-colored porcelain. Represents balance, stability, and enduring wealth.',
        image: '🏺'
    },
    {
        id: 'sp_008',
        name: 'Hom Mali Rice (ข้าวหอมมะลิ)',
        province: 'Yasothon',
        region: 'Northeast', // Also Earth
        element: 'earth',
        description: 'World-renowned fragrant rice. The foundation of life and prosperity.',
        image: '🍚'
    }
];

// Mapping Zodiac Element to Recommended Element
// Fire needs Wood (Wind) to burn, or Earth to ground? 
// Context: "Enhance Luck" -> Support Element.
// Fire <- Wind (Wood support Fire)
// Earth <- Fire (Ash creates Earth)
// Wind <- Water (Water nourishes Wood/Wind) ? No, Water -> Wood
// Water <- Metal (Earth/Mineral)?
//
// Let's use simple complementary pairs for "Balance":
// Fire <-> Water (Balance)
// Earth <-> Wind (Balance)
//
// Or "Support" (Promote):
// Fire needs Wind.
// Wind needs Water.
// Water needs Earth (Container).
// Earth needs Fire (Ceramics).

const SUPPORT_ELEMENTS: Record<string, 'fire' | 'water' | 'wind' | 'earth'> = {
    'ไฟ': 'wind',   // Fire needs Wind
    'ลม': 'water',  // Wind (Wood?) needs Water
    'น้ำ': 'earth',  // Water needs Earth
    'ดิน': 'fire'    // Earth needs Fire
};

export const getSoftPowerRecommendation = (zodiacKey: Zodiac): SoftPowerProduct => {
    const zodiacData = ZODIACS[zodiacKey];
    // Element string in Thai: "ไฟ", "ดิน", "ลม", "น้ำ"
    const userElement = zodiacData.element;

    // Find target element to support user
    // If undefined mapping, random.
    const targetElement = SUPPORT_ELEMENTS[userElement] || 'earth';

    // Filter products by target element
    const products = SOFT_POWER_DB.filter(p => p.element === targetElement);

    // Random pick
    return products[Math.floor(Math.random() * products.length)];
};
