export interface PlaceLocation {
  type: string;
  coordinates: number[];
}

export interface PlaceOpeningHours {
  periods: Record<'open' | 'close', { day: number; time: string }>[];
  text: string[];
}

export interface PlaceForecast {
  dayInt: number;
  crowdMeter: number[];
}
