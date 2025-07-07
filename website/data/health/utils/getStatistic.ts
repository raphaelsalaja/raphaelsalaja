import type { Json } from "../types/codegen.types";

export enum QuantityType {
  bodyMassIndex = "HKQuantityTypeIdentifierBodyMassIndex",
  bodyFatPercentage = "HKQuantityTypeIdentifierBodyFatPercentage",
  height = "HKQuantityTypeIdentifierHeight",
  bodyMass = "HKQuantityTypeIdentifierBodyMass",
  leanBodyMass = "HKQuantityTypeIdentifierLeanBodyMass",
  waistCircumference = "HKQuantityTypeIdentifierWaistCircumference",
  stepCount = "HKQuantityTypeIdentifierStepCount",
  distanceWalkingRunning = "HKQuantityTypeIdentifierDistanceWalkingRunning",
  distanceCycling = "HKQuantityTypeIdentifierDistanceCycling",
  distanceWheelchair = "HKQuantityTypeIdentifierDistanceWheelchair",
  basalEnergyBurned = "HKQuantityTypeIdentifierBasalEnergyBurned",
  activeEnergyBurned = "HKQuantityTypeIdentifierActiveEnergyBurned",
  flightsClimbed = "HKQuantityTypeIdentifierFlightsClimbed",
  nikeFuel = "HKQuantityTypeIdentifierNikeFuel",
  appleExerciseTime = "HKQuantityTypeIdentifierAppleExerciseTime",
  pushCount = "HKQuantityTypeIdentifierPushCount",
  distanceSwimming = "HKQuantityTypeIdentifierDistanceSwimming",
  swimmingStrokeCount = "HKQuantityTypeIdentifierSwimmingStrokeCount",
  vo2Max = "HKQuantityTypeIdentifierVO2Max",
  distanceDownhillSnowSports = "HKQuantityTypeIdentifierDistanceDownhillSnowSports",
  appleStandTime = "HKQuantityTypeIdentifierAppleStandTime",
  walkingSpeed = "HKQuantityTypeIdentifierWalkingSpeed",
  walkingDoubleSupportPercentage = "HKQuantityTypeIdentifierWalkingDoubleSupportPercentage",
  walkingAsymmetryPercentage = "HKQuantityTypeIdentifierWalkingAsymmetryPercentage",
  walkingStepLength = "HKQuantityTypeIdentifierWalkingStepLength",
  sixMinuteWalkTestDistance = "HKQuantityTypeIdentifierSixMinuteWalkTestDistance",
  stairAscentSpeed = "HKQuantityTypeIdentifierStairAscentSpeed",
  stairDescentSpeed = "HKQuantityTypeIdentifierStairDescentSpeed",
  heartRate = "HKQuantityTypeIdentifierHeartRate",
  bodyTemperature = "HKQuantityTypeIdentifierBodyTemperature",
  basalBodyTemperature = "HKQuantityTypeIdentifierBasalBodyTemperature",
  bloodPressureSystolic = "HKQuantityTypeIdentifierBloodPressureSystolic",
  bloodPressureDiastolic = "HKQuantityTypeIdentifierBloodPressureDiastolic",
  respiratoryRate = "HKQuantityTypeIdentifierRespiratoryRate",
  restingHeartRate = "HKQuantityTypeIdentifierRestingHeartRate",
  walkingHeartRateAverage = "HKQuantityTypeIdentifierWalkingHeartRateAverage",
  heartRateVariabilitySDNN = "HKQuantityTypeIdentifierHeartRateVariabilitySDNN",
  oxygenSaturation = "HKQuantityTypeIdentifierOxygenSaturation",
  peripheralPerfusionIndex = "HKQuantityTypeIdentifierPeripheralPerfusionIndex",
  bloodGlucose = "HKQuantityTypeIdentifierBloodGlucose",
  numberOfTimesFallen = "HKQuantityTypeIdentifierNumberOfTimesFallen",
  electrodermalActivity = "HKQuantityTypeIdentifierElectrodermalActivity",
  inhalerUsage = "HKQuantityTypeIdentifierInhalerUsage",
  insulinDelivery = "HKQuantityTypeIdentifierInsulinDelivery",
  bloodAlcoholContent = "HKQuantityTypeIdentifierBloodAlcoholContent",
  forcedVitalCapacity = "HKQuantityTypeIdentifierForcedVitalCapacity",
  forcedExpiratoryVolume1 = "HKQuantityTypeIdentifierForcedExpiratoryVolume1",
  peakExpiratoryFlowRate = "HKQuantityTypeIdentifierPeakExpiratoryFlowRate",
  environmentalAudioExposure = "HKQuantityTypeIdentifierEnvironmentalAudioExposure",
  headphoneAudioExposure = "HKQuantityTypeIdentifierHeadphoneAudioExposure",
  dietaryFatTotal = "HKQuantityTypeIdentifierDietaryFatTotal",
  dietaryFatPolyunsaturated = "HKQuantityTypeIdentifierDietaryFatPolyunsaturated",
  dietaryFatMonounsaturated = "HKQuantityTypeIdentifierDietaryFatMonounsaturated",
  dietaryFatSaturated = "HKQuantityTypeIdentifierDietaryFatSaturated",
  dietaryCholesterol = "HKQuantityTypeIdentifierDietaryCholesterol",
  dietarySodium = "HKQuantityTypeIdentifierDietarySodium",
  dietaryCarbohydrates = "HKQuantityTypeIdentifierDietaryCarbohydrates",
  dietaryFiber = "HKQuantityTypeIdentifierDietaryFiber",
  dietarySugar = "HKQuantityTypeIdentifierDietarySugar",
  dietaryEnergyConsumed = "HKQuantityTypeIdentifierDietaryEnergyConsumed",
  dietaryProtein = "HKQuantityTypeIdentifierDietaryProtein",
  dietaryVitaminA = "HKQuantityTypeIdentifierDietaryVitaminA",
  dietaryVitaminB6 = "HKQuantityTypeIdentifierDietaryVitaminB6",
  dietaryVitaminB12 = "HKQuantityTypeIdentifierDietaryVitaminB12",
  dietaryVitaminC = "HKQuantityTypeIdentifierDietaryVitaminC",
  dietaryVitaminD = "HKQuantityTypeIdentifierDietaryVitaminD",
  dietaryVitaminE = "HKQuantityTypeIdentifierDietaryVitaminE",
  dietaryVitaminK = "HKQuantityTypeIdentifierDietaryVitaminK",
  dietaryCalcium = "HKQuantityTypeIdentifierDietaryCalcium",
  dietaryIron = "HKQuantityTypeIdentifierDietaryIron",
  dietaryThiamin = "HKQuantityTypeIdentifierDietaryThiamin",
  dietaryRiboflavin = "HKQuantityTypeIdentifierDietaryRiboflavin",
  dietaryNiacin = "HKQuantityTypeIdentifierDietaryNiacin",
  dietaryFolate = "HKQuantityTypeIdentifierDietaryFolate",
  dietaryBiotin = "HKQuantityTypeIdentifierDietaryBiotin",
  dietaryPantothenicAcid = "HKQuantityTypeIdentifierDietaryPantothenicAcid",
  dietaryPhosphorus = "HKQuantityTypeIdentifierDietaryPhosphorus",
  dietaryIodine = "HKQuantityTypeIdentifierDietaryIodine",
  dietaryMagnesium = "HKQuantityTypeIdentifierDietaryMagnesium",
  dietaryZinc = "HKQuantityTypeIdentifierDietaryZinc",
  dietarySelenium = "HKQuantityTypeIdentifierDietarySelenium",
  dietaryCopper = "HKQuantityTypeIdentifierDietaryCopper",
  dietaryManganese = "HKQuantityTypeIdentifierDietaryManganese",
  dietaryChromium = "HKQuantityTypeIdentifierDietaryChromium",
  dietaryMolybdenum = "HKQuantityTypeIdentifierDietaryMolybdenum",
  dietaryChloride = "HKQuantityTypeIdentifierDietaryChloride",
  dietaryPotassium = "HKQuantityTypeIdentifierDietaryPotassium",
  dietaryCaffeine = "HKQuantityTypeIdentifierDietaryCaffeine",
  dietaryWater = "HKQuantityTypeIdentifierDietaryWater",
  uvExposure = "HKQuantityTypeIdentifierUVExposure",
  appleMoveTime = "HKQuantityTypeIdentifierAppleMoveTime",
  appleWalkingSteadiness = "HKQuantityTypeIdentifierAppleWalkingSteadiness",
  appleSleepingWristTemperature = "HKQuantityTypeIdentifierAppleSleepingWristTemperature",
  runningStrideLength = "HKQuantityTypeIdentifierRunningStrideLength",
  runningVerticalOscillation = "HKQuantityTypeIdentifierRunningVerticalOscillation",
  runningGroundContactTime = "HKQuantityTypeIdentifierRunningGroundContactTime",
  runningPower = "HKQuantityTypeIdentifierRunningPower",
  runningSpeed = "HKQuantityTypeIdentifierRunningSpeed",
  heartRateRecoveryOneMinute = "HKQuantityTypeIdentifierHeartRateRecoveryOneMinute",
  numberOfAlcoholicBeverages = "HKQuantityTypeIdentifierNumberOfAlcoholicBeverages",
  atrialFibrillationBurden = "HKQuantityTypeIdentifierAtrialFibrillationBurden",
  underwaterDepth = "HKQuantityTypeIdentifierUnderwaterDepth",
  waterTemperature = "HKQuantityTypeIdentifierWaterTemperature",
  workoutEffortScore = "HKQuantityTypeIdentifierWorkoutEffortScore",
  estimatedWorkoutEffortScore = "HKQuantityTypeIdentifierEstimatedWorkoutEffortScore",
}

interface Statistic {
  sources: any[];
  harmonized: {
    summary?: number;
    average?: number;
    min?: number;
    max?: number;
    unit: string;
  };
  identifier: string;
  startTimestamp: number;
  endTimestamp: number;
}

export function getStatistic(stats: Statistic[], type: QuantityType) {
  const stat = stats.find((s) => s.identifier === type);

  if (!stat) return null;

  const { summary, average, min, max, unit } = stat.harmonized;

  return {
    summary,
    average,
    min,
    max,
    unit,
  };
}

export function jsonToStatistic(json: Json[]): Statistic[] {
  return json.map((stat: any) => ({
    sources: stat.sources,
    harmonized: {
      summary: stat.harmonized.summary,
      average: stat.harmonized.average,
      min: stat.harmonized.min,
      max: stat.harmonized.max,
      unit: stat.harmonized.unit,
    },
    identifier: stat.identifier,
    startTimestamp: stat.start_timestamp,
    endTimestamp: stat.end_timestamp,
  }));
}
