enum PlaceType1 {
  accounting = 'accounting',
  airport = 'airport',
  amusement_park = 'amusement_park',
  aquarium = 'aquarium',
  art_gallery = 'art_gallery',
  atm = 'atm',
  bakery = 'bakery',
  bank = 'bank',
  bar = 'bar',
  beauty_salon = 'beauty_salon',
  bicycle_store = 'bicycle_store',
  book_store = 'book_store',
  bowling_alley = 'bowling_alley',
  bus_station = 'bus_station',
  cafe = 'cafe',
  campground = 'campground',
  car_dealer = 'car_dealer',
  car_rental = 'car_rental',
  car_repair = 'car_repair',
  car_wash = 'car_wash',
  casino = 'casino',
  cemetery = 'cemetery',
  church = 'church',
  city_hall = 'city_hall',
  clothing_store = 'clothing_store',
  convenience_store = 'convenience_store',
  courthouse = 'courthouse',
  dentist = 'dentist',
  department_store = 'department_store',
  doctor = 'doctor',
  electrician = 'electrician',
  electronics_store = 'electronics_store',
  embassy = 'embassy',
  fire_station = 'fire_station',
  florist = 'florist',
  funeral_home = 'funeral_home',
  furniture_store = 'furniture_store',
  gas_station = 'gas_station',
  gym = 'gym',
  hair_care = 'hair_care',
  hardware_store = 'hardware_store',
  hindu_temple = 'hindu_temple',
  home_goods_store = 'home_goods_store',
  hospital = 'hospital',
  insurance_agency = 'insurance_agency',
  jewelry_store = 'jewelry_store',
  laundry = 'laundry',
  lawyer = 'lawyer',
  library = 'library',
  liquor_store = 'liquor_store',
  local_government_office = 'local_government_office',
  locksmith = 'locksmith',
  lodging = 'lodging',
  meal_delivery = 'meal_delivery',
  meal_takeaway = 'meal_takeaway',
  mosque = 'mosque',
  movie_rental = 'movie_rental',
  movie_theater = 'movie_theater',
  moving_company = 'moving_company',
  museum = 'museum',
  night_club = 'night_club',
  painter = 'painter',
  /** indicates a named park. */
  park = 'park',
  parking = 'parking',
  pet_store = 'pet_store',
  pharmacy = 'pharmacy',
  physiotherapist = 'physiotherapist',
  plumber = 'plumber',
  police = 'police',
  post_office = 'post_office',
  real_estate_agency = 'real_estate_agency',
  restaurant = 'restaurant',
  roofing_contractor = 'roofing_contractor',
  rv_park = 'rv_park',
  school = 'school',
  secondary_school = 'secondary_school',
  shoe_store = 'shoe_store',
  shopping_mall = 'shopping_mall',
  spa = 'spa',
  stadium = 'stadium',
  storage = 'storage',
  store = 'store',
  subway_station = 'subway_station',
  supermarket = 'supermarket',
  synagogue = 'synagogue',
  taxi_stand = 'taxi_stand',
  tourist_attraction = 'tourist_attraction',
  train_station = 'train_station',
  transit_station = 'transit_station',
  travel_agency = 'travel_agency',
  veterinary_care = 'veterinary_care',
  zoo = 'zoo',
}

enum PlaceType2 {
  administrative_area_level_1 = 'administrative_area_level_1',
  administrative_area_level_2 = 'administrative_area_level_2',
  administrative_area_level_3 = 'administrative_area_level_3',
  administrative_area_level_4 = 'administrative_area_level_4',
  administrative_area_level_5 = 'administrative_area_level_5',
  archipelago = 'archipelago',
  colloquial_area = 'colloquial_area',
  continent = 'continent',
  country = 'country',
  establishment = 'establishment',
  finance = 'finance',
  floor = 'floor',
  food = 'food',
  general_contractor = 'general_contractor',
  geocode = 'geocode',
  health = 'health',
  intersection = 'intersection',
  landmark = 'landmark',
  locality = 'locality',
  natural_feature = 'natural_feature',
  neighborhood = 'neighborhood',
  place_of_worship = 'place_of_worship',
  plus_code = 'plus_code',
  point_of_interest = 'point_of_interest',
  political = 'political',
  post_box = 'post_box',
  postal_code = 'postal_code',
  postal_code_prefix = 'postal_code_prefix',
  postal_code_suffix = 'postal_code_suffix',
  postal_town = 'postal_town',
  premise = 'premise',
  room = 'room',
  route = 'route',
  street_address = 'street_address',
  street_number = 'street_number',
  sublocality = 'sublocality',
  sublocality_level_1 = 'sublocality_level_1',
  sublocality_level_2 = 'sublocality_level_2',
  sublocality_level_3 = 'sublocality_level_3',
  sublocality_level_4 = 'sublocality_level_4',
  sublocality_level_5 = 'sublocality_level_5',
  subpremise = 'subpremise',
  town_square = 'town_square',
}

interface PlaceReview {
  aspects: AspectRating[];
  author_name: string;
  author_url?: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: string;
}

interface AspectRating {
  type: AspectRatingType;
  rating: number;
}

enum AspectRatingType {
  appeal = 'appeal',
  atmosphere = 'atmosphere',
  decor = 'decor',
  facilities = 'facilities',
  food = 'food',
  overall = 'overall',
  quality = 'quality',
  service = 'service',
}

type AddressType = PlaceType1 | PlaceType2;

interface LatLngLiteral {
  lat: number;
  lng: number;
}

interface LatLngBounds {
  northeast: LatLngLiteral;
  southwest: LatLngLiteral;
}

interface OpeningHours {
  open_now: boolean;
  periods: OpeningPeriod[];
  weekday_text: string[];
}

interface OpeningPeriod {
  open: OpeningHoursTime;
  close?: OpeningHoursTime;
}

interface OpeningHoursTime {
  day: number;
  time?: string;
}

enum GeocodingAddressComponentType {
  floor = 'floor',
  establishment = 'establishment',
  point_of_interest = 'point_of_interest',
  parking = 'parking',
  post_box = 'post_box',
  postal_town = 'postal_town',
  room = 'room',
  street_number = 'street_number',
  bus_station = 'bus_station',
  train_station = 'train_station',
  transit_station = 'transit_station',
}

interface AddressComponent {
  types: Array<AddressType | GeocodingAddressComponentType>;
  long_name: string;
  short_name: string;
}

interface AddressGeometry {
  location: LatLngLiteral;
  location_type?: LocationType;
  viewport: LatLngBounds;
  bounds?: LatLngBounds;
}

enum LocationType {
  ROOFTOP = 'ROOFTOP',
  RANGE_INTERPOLATED = 'RANGE_INTERPOLATED',
  GEOMETRIC_CENTER = 'GEOMETRIC_CENTER',
  APPROXIMATE = 'APPROXIMATE',
}

interface PlusCode {
  global_code: string;
  compound_code: string;
}

export interface PlaceData {
  address_components: AddressComponent[];
  formatted_address: string;
  formatted_phone_number: string;
  adr_address: string;
  geometry: AddressGeometry;
  plus_code: PlusCode;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;

  international_phone_number: string;
  name: string;
  opening_hours: OpeningHours;
  permanently_closed: boolean;
  business_status: string;
  photos: PlacePhoto[];
  place_id: string;
  price_level: number;
  rating: number;
  user_ratings_total: number;
  reviews: PlaceReview[];
  types: AddressType[];
  url: string;
  utc_offset: number;
  vicinity: string;
  website: string;
}

export interface PlaceDetails {
  result: PlaceData;
}

export interface PlacePhoto {
  photo_reference: string;
  height: number;
  width: number;
  html_attributions: string[];
}
