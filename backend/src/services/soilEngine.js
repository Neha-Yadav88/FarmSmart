// soilEngine.js
// FULL RULE-BASED SOIL ANALYSIS ENGINE

//-----------------------------------------
// 1. pH ANALYSIS
//-----------------------------------------
const analyzePH = (ph) => {
  if (ph < 5.5) return { status: "Highly Acidic", advice: "Add lime to improve pH." };
  if (ph >= 5.5 && ph < 6.5) return { status: "Slightly Acidic", advice: "Good for rice and turmeric." };
  if (ph >= 6.5 && ph <= 7.5) return { status: "Neutral (Ideal)", advice: "Best pH range for most crops." };
  if (ph > 7.5 && ph <= 8.5) return { status: "Slightly Alkaline", advice: "Can grow chickpea, cumin, mustard." };
  return { status: "Highly Alkaline", advice: "Add gypsum to lower alkalinity." };
};


//-----------------------------------------
// 2. NPK ANALYSIS
//-----------------------------------------
const analyzeNPK = (value, type) => {
  if (value < 40) return { status: "Low", advice: `Increase ${type} using organic compost or fertilizers.` };
  if (value >= 40 && value < 80) return { status: "Medium", advice: `${type} level is acceptable.` };
  return { status: "High", advice: `${type} level is good.` };
};


//-----------------------------------------
// 3. DETERMINE DEFICIENCIES
//-----------------------------------------
const determineDeficiencies = (Nstat, Pstat, Kstat) => {
  const list = [];

  if (Nstat.status === "Low") list.push("Nitrogen");
  if (Pstat.status === "Low") list.push("Phosphorus");
  if (Kstat.status === "Low") list.push("Potassium");

  if (list.length === 0) return ["None"];
  return list;
};


//-----------------------------------------
// 4. SOIL TYPE → CROP MAPPING
//-----------------------------------------
const soilCropMap = {
  loamy: ["Wheat", "Sugarcane", "Pulses", "Vegetables", "Maize"],
  sandy: ["Groundnut", "Bajra", "Watermelon", "Coconut"],
  clay: ["Rice", "Jute", "Sugarcane"],
  black: ["Cotton", "Jowar", "Castor", "Sunflower"],
  red: ["Millets", "Maize", "Tobacco", "Groundnut"],
  alluvial: ["Wheat", "Paddy", "Sugarcane", "Vegetables"]
};

const getSuitableCrops = (soilType) => {
  return soilCropMap[soilType.toLowerCase()] || ["Data not available"];
};


//-----------------------------------------
// 5. FERTILITY SCORE (0–100)
//-----------------------------------------
const calculateFertilityScore = (phStatus, Nstat, Pstat, Kstat, moisture) => {
  let score = 0;

  // pH scoring
  score += phStatus.status.includes("Ideal") ? 20 :
           phStatus.status.includes("Slightly") ? 14 : 10;

  // NPK scoring
  score += Nstat.status === "High" ? 20 : Nstat.status === "Medium" ? 14 : 10;
  score += Pstat.status === "High" ? 20 : Pstat.status === "Medium" ? 14 : 10;
  score += Kstat.status === "High" ? 20 : Kstat.status === "Medium" ? 14 : 10;

  // Moisture scoring (optional)
  if (moisture !== undefined) {
    score += moisture >= 20 && moisture <= 40 ? 20 : 10;
  }

  return Math.min(score, 100);
};


//-----------------------------------------
// 6. FINAL ANALYSIS FUNCTION
//-----------------------------------------
export const analyzeSoil = (data) => {
  const { soilType, soilColor, texture, ph, N, P, K, moisture } = data;

  // Step 1: pH
  const phAnalysis = analyzePH(ph);

  // Step 2: NPK
  const Nstat = analyzeNPK(N, "Nitrogen");
  const Pstat = analyzeNPK(P, "Phosphorus");
  const Kstat = analyzeNPK(K, "Potassium");

  // Step 3: Deficiencies
  const deficiencies = determineDeficiencies(Nstat, Pstat, Kstat);

  // Step 4: Crop Mapping
  const suitableCrops = soilType ? getSuitableCrops(soilType) : [];

  // Step 5: Fertility Score
  const fertilityScore = calculateFertilityScore(
    phAnalysis,
    Nstat,
    Pstat,
    Kstat,
    moisture
  );

  // Step 6: Recommendations
  const recommendations = [];
  if (deficiencies.includes("Nitrogen")) recommendations.push("Add Urea or compost for Nitrogen improvement.");
  if (deficiencies.includes("Phosphorus")) recommendations.push("Add DAP or bone meal for Phosphorus.");
  if (deficiencies.includes("Potassium")) recommendations.push("Apply MOP fertilizer for Potassium.");
  if (phAnalysis.status.includes("Acidic")) recommendations.push("Apply lime to reduce soil acidity.");
  if (phAnalysis.status.includes("Alkaline")) recommendations.push("Use gypsum to neutralize alkalinity.");

  return {
    soilType,
    soilColor,
    texture,
    phAnalysis,
    nutrients: {
      N: Nstat,
      P: Pstat,
      K: Kstat
    },
    deficiencies,
    fertilityScore,
    suitableCrops,
    recommendations
  };
};
