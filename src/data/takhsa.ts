import { Day } from './archetypes';

export type TakhsaAspect =
    | 'บริวาร' // Boriwan (Entourage/Family)
    | 'อายุ'   // Ayu (Health/Life)
    | 'เดช'    // Det (Power/Authority)
    | 'ศรี'    // Sri (Luck/Wealth)
    | 'มูละ'   // Mula (Foundation/Assets)
    | 'อุตสาหะ' // Utsaha (Effort/Work)
    | 'มนตรี'  // Montri (Support/Patron)
    | 'กาลกิณี'; // Kalakini (Misfortune/Obstacle)

export interface TakhsaPosition {
    aspect: TakhsaAspect;
    planet: string;
    direction: string;
    meaning: string;
}

// Fixed order of aspects in Takhsa system (clockwise)
const ASPECT_ORDER: TakhsaAspect[] = [
    'บริวาร', 'อายุ', 'เดช', 'ศรี', 'มูละ', 'อุตสาหะ', 'มนตรี', 'กาลกิณี'
];

// Planet data corresponding to directions
// 1=Sun(NE), 2=Moon(E), 3=Mars(SE), 4=Mercury(S), 7=Saturn(SW), 5=Jupiter(W), 8=Rahu(NW), 6=Venus(N)
const PLANET_DIRECTIONS = [
    { id: 1, name: 'อาทิตย์ (๑)', dir: 'อีสาน (NE)' },
    { id: 2, name: 'จันทร์ (๒)', dir: 'บูรพา (E)' },
    { id: 3, name: 'อังคาร (๓)', dir: 'อาคเนย์ (SE)' },
    { id: 4, name: 'พุธ (๔)', dir: 'ทักษิณ (S)' },
    { id: 7, name: 'เสาร์ (๗)', dir: 'หรดี (SW)' },
    { id: 5, name: 'พฤหัส (๕)', dir: 'ประจิม (W)' },
    { id: 8, name: 'ราหู (๘)', dir: 'พายัพ (NW)' },
    { id: 6, name: 'ศุกร์ (๖)', dir: 'อุดร (N)' }
];

// Starting index for each birth day in the PLANET_DIRECTIONS array
// Sunday starts at Sun (index 0)
// Monday starts at Moon (index 1)
// Tuesday starts at Mars (index 2)
// Wednesday starts at Mercury (index 3)
// Thursday starts at Jupiter (index 5) - Wait, standard Takhsa order for starting is usually based on day
// Let's use the sequence derived from research:
// Sun -> Moon -> Mars -> Mercury -> Saturn -> Jupiter -> Rahu -> Venus (This is NOT correct Takhsa order)
// Correct Takhsa circular flow: Sun(1) -> Moon(2) -> Mars(3) -> Mercury(4) -> Saturn(7) -> Jupiter(5) -> Rahu(8) -> Venus(6) -> Sun(1)
// This matches the PLANET_DIRECTIONS array order above exactly!

const START_INDICES: Record<Day, number> = {
    sunday: 0,    // Starts at Sun
    monday: 1,    // Starts at Moon
    tuesday: 2,   // Starts at Mars
    wednesday: 3, // Starts at Mercury
    thursday: 5,  // Starts at Jupiter (Index 5 in our array)
    friday: 7,    // Starts at Venus (Index 7 in our array)
    saturday: 4   // Starts at Saturn (Index 4 in our array)
};

export const calculateTakhsa = (birthDay: Day): TakhsaPosition[] => {
    const positions: TakhsaPosition[] = [];
    const startIndex = START_INDICES[birthDay];

    for (let i = 0; i < 8; i++) {
        const planetIndex = (startIndex + i) % 8;
        const planetInfo = PLANET_DIRECTIONS[planetIndex];
        const aspect = ASPECT_ORDER[i];

        let meaning = "";
        switch (aspect) {
            case 'บริวาร': meaning = "คนรอบข้าง, ลูกน้อง, เพื่อน"; break;
            case 'อายุ': meaning = "สุขภาพ, ความเป็นอยู่"; break;
            case 'เดช': meaning = "อำนาจ, อิทธิพล, ชื่อเสียง"; break;
            case 'ศรี': meaning = "โชคลาภ, เสน่ห์, ความสำเร็จ"; break;
            case 'มูละ': meaning = "ทรัพย์สิน, มรดก, หลักฐาน"; break;
            case 'อุตสาหะ': meaning = "ความขยัน, งาน, ความพยายาม"; break;
            case 'มนตรี': meaning = "ผู้ใหญ่ช่วยเหลือ, ที่พึ่ง"; break;
            case 'กาลกิณี': meaning = "อุปสรรค, สิ่งที่ควรระวัง"; break;
        }

        positions.push({
            aspect,
            planet: planetInfo.name,
            direction: planetInfo.dir,
            meaning
        });
    }

    return positions;
};
