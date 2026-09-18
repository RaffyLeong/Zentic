export interface PropertyType {
  id: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  address: string;
  postcode: string;
  city: string;
  imageUrl: string;
  pros: string[];
  cons: string[];
  listingUrl: string;
  lat: number;
  lng: number;
  agency: string;
  platform: string;
  agentName: string;
  agentPhone: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ComparisonType {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  items: { id: string; propertyId: string; property: PropertyType }[];
}

export interface SavedSearchType {
  id: string;
  userId: string;
  name: string;
  location: string;
  minPrice: number | null;
  maxPrice: number | null;
  minBedrooms: number | null;
  maxBedrooms: number | null;
  createdAt: string;
}

export interface FavoriteType {
  id: string;
  userId: string;
  propertyId: string;
  createdAt: string;
  property: PropertyType;
}
