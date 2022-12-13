export interface Location {
  type: string;
  coordinates: number[];
}

export interface OpeningHours {
  periods: Record<'open' | 'close', { day: number; time: string }>[];
  text: string[];
}

export interface PlaceForecast {
  dayInt: number;
  crowdMeter: number[];
}
