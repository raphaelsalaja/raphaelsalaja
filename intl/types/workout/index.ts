export interface Workout {
  uuid: string;
  activityType: string;
  startDate: string;
  endDate: string;
  duration: number;
  device?: string;
  totalEnergyBurned_kcal?: number;
  totalDistance_m?: number;
  totalFlightsClimbed?: number;
  indoorWorkout?: boolean;
  weatherTemperature_C?: number;
  weatherHumidity_pct?: number;
  elevationAscended_m?: number;
  effortScore?: number;
}

export interface WorkoutData {
  date: string;
  workouts: Workout[];
}
