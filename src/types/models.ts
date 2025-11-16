export type Country = { id: string; name: string; flag: string };

export type City = { id: number; name: string };

export type Hotel = {
  id: number;
  name: string;
  img: string;
  cityId: number;
  cityName: string;
  countryId: string;
  countryName: string;
};

export type CountriesMap = Record<string, Country>;
export type HotelsMap = Record<string, Hotel>;

export type PriceOffer = {
  id: string;
  amount: number;
  currency: 'usd';
  startDate: string;
  endDate: string;
  hotelID?: string;
};

export type PricesMap = Record<string, PriceOffer>;

export type GeoEntity = (Country & { type: 'country' }) | (City & { type: 'city' }) | (Hotel & { type: 'hotel' });

export type GeoResponse = Record<string, GeoEntity>;

export type SearchToursStatus = 'idle' | 'loading' | 'success' | 'error';

export type SearchToursResult = {
  countryId: string;
  prices: PricesMap;
  receivedAt: number;
};

export type SearchToursState = {
  status: SearchToursStatus;
  error: string | null;
  resultsByCountry: Record<string, SearchToursResult>;
  currentCountryId: string | null;
};

export type TourAggregate = {
  id: string;
  amount: number;
  startDate: string;
  endDate: string;
  hotel: Hotel;
};
