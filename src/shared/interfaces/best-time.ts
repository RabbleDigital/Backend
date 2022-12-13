interface DayInfo {
  day_int: number;
  day_max: number;
  day_mean: number;
  day_rank_max: number;
  day_rank_mean: number;
  day_text: string;
  venue_closed: number;
  venue_open: number;
}

interface WeekRaw {
  day_info: DayInfo;
  day_int: number;
  day_raw: number[];
}

interface Analysis {
  week_raw: WeekRaw[];
}

interface VenueInfo {
  venue_address: string;
  venue_address_list: string[];
  venue_dwell_time_avg: number;
  venue_dwell_time_max: number;
  venue_dwell_time_min: number;
  venue_id: string;
  venue_lat: number;
  venue_lon: number;
  venue_name: string;
  venue_timezone: string;
  venue_type: string;
  venue_types: string[];
}

interface Window {
  day_window_end_int: number;
  day_window_end_txt: string;
  day_window_start_int: number;
  day_window_start_txt: string;
  time_window_end: number;
  time_window_end_12h: string;
  time_window_start: number;
  time_window_start_12h: string;
  week_window: string;
}

export interface NewForecast {
  analysis: Analysis;
  status: string;
  venue_address: string;
  venue_id: string;
  venue_info: VenueInfo;
  venue_name: string;
  window: Window;
}
