export const convertToKilograms = (weight: number, unit: string) => {
    switch (unit.toLowerCase()) {
      case 'kilograms':
      case 'kg':
        return weight; // already in kilograms
      case 'pounds':
      case 'lbs':
        return weight * 0.453592; // 1 lb = 0.453592 lbs
      case 'g':
      case 'grams':
        return weight / 1000; // 1 kg = 1000 grams
      default:
        return 0; // Unknown unit
    }
  }
