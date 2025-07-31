// Zodiac logic and basic sign information for LLM integration

export const zodiacSigns = {
  aries: {
    name: "Aries",
    dates: { start: [3, 21], end: [4, 19] },
    traits: ["brave", "energetic", "impulsive", "leader", "competitive"]
  },
  taurus: {
    name: "Taurus",
    dates: { start: [4, 20], end: [5, 20] },
    traits: ["stubborn", "reliable", "practical", "patient", "loyal"]
  },
  gemini: {
    name: "Gemini",
    dates: { start: [5, 21], end: [6, 20] },
    traits: ["adaptable", "communicative", "curious", "versatile", "witty"]
  },
  cancer: {
    name: "Cancer",
    dates: { start: [6, 21], end: [7, 22] },
    traits: ["protective", "emotional", "nurturing", "intuitive", "loyal"]
  },
  leo: {
    name: "Leo",
    dates: { start: [7, 23], end: [8, 22] },
    traits: ["dramatic", "charismatic", "confident", "generous", "creative"]
  },
  virgo: {
    name: "Virgo",
    dates: { start: [8, 23], end: [9, 22] },
    traits: ["perfectionist", "analytical", "practical", "organized", "helpful"]
  },
  libra: {
    name: "Libra",
    dates: { start: [9, 23], end: [10, 22] },
    traits: ["balanced", "diplomatic", "charming", "social", "fair"]
  },
  scorpio: {
    name: "Scorpio",
    dates: { start: [10, 23], end: [11, 21] },
    traits: ["intense", "mysterious", "passionate", "determined", "loyal"]
  },
  sagittarius: {
    name: "Sagittarius",
    dates: { start: [11, 22], end: [12, 21] },
    traits: ["adventurous", "optimistic", "philosophical", "honest", "freedom-loving"]
  },
  capricorn: {
    name: "Capricorn",
    dates: { start: [12, 22], end: [1, 19] },
    traits: ["ambitious", "disciplined", "practical", "responsible", "patient"]
  },
  aquarius: {
    name: "Aquarius",
    dates: { start: [1, 20], end: [2, 18] },
    traits: ["innovative", "rebellious", "independent", "humanitarian", "eccentric"]
  },
  pisces: {
    name: "Pisces",
    dates: { start: [2, 19], end: [3, 20] },
    traits: ["intuitive", "empathetic", "artistic", "dreamy", "compassionate"]
  }
};

export function getZodiacSign(birthDate) {
  const date = new Date(birthDate);
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  const day = date.getDate();

  for (const [key, sign] of Object.entries(zodiacSigns)) {
    const { start, end } = sign.dates;
    
    // Handle year-crossing signs (Capricorn)
    if (start[0] > end[0]) {
      if ((month === start[0] && day >= start[1]) || 
          (month === end[0] && day <= end[1])) {
        return sign;
      }
    } else {
      if ((month === start[0] && day >= start[1]) || 
          (month === end[0] && day <= end[1]) ||
          (month > start[0] && month < end[0])) {
        return sign;
      }
    }
  }
  
  return zodiacSigns.aries; // fallback
}

// This function will now call the LLM API instead of using hardcoded responses
export async function generateSurvivalAdvice(formData) {
  const { nickname, birthdate, birthplace, favoriteColor } = formData;
  const zodiacSign = getZodiacSign(birthdate);
  
  // Return basic info for LLM processing
  return {
    nickname,
    birthdate,
    birthplace,
    favoriteColor,
    zodiacSign: zodiacSign.name,
    zodiacTraits: zodiacSign.traits
  };
}

