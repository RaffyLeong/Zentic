export interface MockProperty {
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
}

export const mockProperties: MockProperty[] = [
  // ---------- LONDON ----------
  {
    price: 475000, bedrooms: 3, bathrooms: 2, sqft: 1200,
    address: "14 Maple Street, Hackney", postcode: "E8 2QR", city: "London",
    imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
    pros: ["Period features", "Large garden", "Near transport links"],
    cons: ["Needs kitchen renovation", "No parking"],
    listingUrl: "https://www.rightmove.co.uk/properties/142837461", lat: 51.5456, lng: -0.0558,
    agency: "Foxtons", platform: "Rightmove",
    agentName: "James Whitfield", agentPhone: "020 7123 4567"
  },
  {
    price: 750000, bedrooms: 5, bathrooms: 3, sqft: 2400,
    address: "The Old Rectory, 1 Church Lane, Richmond", postcode: "TW9 1DN", city: "London",
    imageUrl: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
    pros: ["Detached family home", "Large garden", "Off-street parking", "Home office"],
    cons: ["High council tax", "Requires maintenance"],
    listingUrl: "https://www.rightmove.co.uk/properties/142837462", lat: 51.4613, lng: -0.3016,
    agency: "Foxtons", platform: "Rightmove",
    agentName: "James Whitfield", agentPhone: "020 7123 4567"
  },
  {
    price: 620000, bedrooms: 4, bathrooms: 3, sqft: 2000,
    address: "3 Greenwich Park Road, Blackheath", postcode: "SE3 0PH", city: "London",
    imageUrl: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800",
    pros: ["Near Greenwich Park", "Double garage", "South-facing garden", "Recently renovated"],
    cons: ["Busy road", "Premium price area"],
    listingUrl: "https://www.onthemarket.com/details/1428374/", lat: 51.4693, lng: 0.0059,
    agency: "Savills", platform: "OnTheMarket",
    agentName: "Emma Hartley", agentPhone: "0117 910 1234"
  },

  // ---------- MANCHESTER ----------
  {
    price: 325000, bedrooms: 2, bathrooms: 1, sqft: 850,
    address: "7 Victoria Terrace, Didsbury", postcode: "M20 6QJ", city: "Manchester",
    imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
    pros: ["Modern interior", "Close to high street", "Double glazing"],
    cons: ["Small garden", "Street parking only"],
    listingUrl: "https://www.zoopla.co.uk/for-sale/details/63827419/", lat: 53.4084, lng: -2.2258,
    agency: "Purplebricks", platform: "Zoopla",
    agentName: "Sarah O'Connor", agentPhone: "0161 496 0000"
  },
  {
    price: 289000, bedrooms: 3, bathrooms: 1, sqft: 980,
    address: "42 Chorlton Road, Chorlton", postcode: "M21 9AQ", city: "Manchester",
    imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
    pros: ["Vibrant neighbourhood", "Through lounge", "Loft conversion potential"],
    cons: ["Single bathroom", "No conservatory"],
    listingUrl: "https://www.zoopla.co.uk/for-sale/details/63827419/", lat: 53.4408, lng: -2.2731,
    agency: "Purplebricks", platform: "Zoopla",
    agentName: "Sarah O'Connor", agentPhone: "0161 496 0000"
  },
  {
    price: 155000, bedrooms: 1, bathrooms: 1, sqft: 480,
    address: "Flat 12, Northern Quarter, Dale Street", postcode: "M1 1JW", city: "Manchester",
    imageUrl: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
    pros: ["City centre living", "Concierge service", "Gym access"],
    cons: ["No outdoor space", "Leasehold only"],
    listingUrl: "https://www.zoopla.co.uk/for-sale/details/63827419/", lat: 53.4841, lng: -2.2367,
    agency: "Purplebricks", platform: "Zoopla",
    agentName: "Sarah O'Connor", agentPhone: "0161 496 0000"
  },

  // ---------- BIRMINGHAM ----------
  {
    price: 199000, bedrooms: 2, bathrooms: 1, sqft: 780,
    address: "31 Jewellery Quarter, Hockley", postcode: "B1 3LE", city: "Birmingham",
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    pros: ["City centre location", "New build", "Allocated parking"],
    cons: ["No garden", "Service charge applies"],
    listingUrl: "https://www.onthemarket.com/details/1428374/", lat: 52.4862, lng: -1.9086,
    agency: "Connells", platform: "OnTheMarket",
    agentName: "David Ahmed", agentPhone: "0121 296 3000"
  },
  {
    price: 215000, bedrooms: 2, bathrooms: 1, sqft: 720,
    address: "9 Kings Heath High Street", postcode: "B14 7DJ", city: "Birmingham",
    imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
    pros: ["Close to shops", "Recently refurbished", "Good transport links"],
    cons: ["Busy road", "Compact garden"],
    listingUrl: "https://www.onthemarket.com/details/1428374/", lat: 52.4369, lng: -1.8942,
    agency: "Connells", platform: "OnTheMarket",
    agentName: "David Ahmed", agentPhone: "0121 296 3000"
  },
  {
    price: 168000, bedrooms: 2, bathrooms: 1, sqft: 650,
    address: "19 Erdington High Street", postcode: "B23 6SY", city: "Birmingham",
    imageUrl: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800",
    pros: ["Affordable starter home", "Near train station", "Double bedrooms"],
    cons: ["Needs decorating", "Small kitchen"],
    listingUrl: "https://www.onthemarket.com/details/1428374/", lat: 52.5226, lng: -1.8388,
    agency: "Connells", platform: "OnTheMarket",
    agentName: "David Ahmed", agentPhone: "0121 296 3000"
  },

  // ---------- BRISTOL ----------
  {
    price: 550000, bedrooms: 4, bathrooms: 3, sqft: 1800,
    address: "2 Clifton Village, Clifton", postcode: "BS8 4EF", city: "Bristol",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    pros: ["Stunning views", "Period property", "Quiet cul-de-sac", "Wine cellar"],
    cons: ["Steep hill", "Limited public transport"],
    listingUrl: "https://www.rightmove.co.uk/properties/152938472", lat: 51.4545, lng: -2.6236,
    agency: "Savills", platform: "Rightmove",
    agentName: "Emma Hartley", agentPhone: "0117 910 1234"
  },
  {
    price: 340000, bedrooms: 3, bathrooms: 2, sqft: 1100,
    address: "22 Stokes Croft, Montpelier", postcode: "BS2 8QR", city: "Bristol",
    imageUrl: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800",
    pros: ["Trendy area", "Roof terrace", "Open plan living"],
    cons: ["Noisy at weekends", "No garage"],
    listingUrl: "https://www.rightmove.co.uk/properties/152938472", lat: 51.4621, lng: -2.5903,
    agency: "Savills", platform: "Rightmove",
    agentName: "Emma Hartley", agentPhone: "0117 910 1234"
  },
  {
    price: 460000, bedrooms: 4, bathrooms: 2, sqft: 1500,
    address: "11 Redland Road, Redland", postcode: "BS6 6QT", city: "Bristol",
    imageUrl: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800",
    pros: ["Family friendly area", "Large kitchen-diner", "Cellar storage", "Solar panels"],
    cons: ["On-street parking", "North-facing garden"],
    listingUrl: "https://www.rightmove.co.uk/properties/152938472", lat: 51.4717, lng: -2.6014,
    agency: "Savills", platform: "Rightmove",
    agentName: "Emma Hartley", agentPhone: "0117 910 1234"
  },

  // ---------- LEEDS ----------
  {
    price: 185000, bedrooms: 1, bathrooms: 1, sqft: 520,
    address: "15 Headingley Lane, Headingley", postcode: "LS6 1BL", city: "Leeds",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    pros: ["Near university", "Modern kitchen", "Energy efficient"],
    cons: ["Small rooms", "No parking"],
    listingUrl: "https://www.zoopla.co.uk/for-sale/details/64829104/", lat: 53.8206, lng: -1.5771,
    agency: "Reeds Rains", platform: "Zoopla",
    agentName: "Michael Chen", agentPhone: "0113 387 7700"
  },
  {
    price: 275000, bedrooms: 3, bathrooms: 2, sqft: 1050,
    address: "5 Roundhay Park View, Roundhay", postcode: "LS8 2HT", city: "Leeds",
    imageUrl: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800",
    pros: ["Overlooks park", "Conservatory", "Driveway parking"],
    cons: ["Dated bathroom", "Single glazed upstairs"],
    listingUrl: "https://www.zoopla.co.uk/for-sale/details/64829104/", lat: 53.8387, lng: -1.5101,
    agency: "Reeds Rains", platform: "Zoopla",
    agentName: "Michael Chen", agentPhone: "0113 387 7700"
  },
  {
    price: 230000, bedrooms: 2, bathrooms: 1, sqft: 800,
    address: "6 Chapel Allerton, Harrogate Road", postcode: "LS7 4NZ", city: "Leeds",
    imageUrl: "https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?w=800",
    pros: ["Up-and-coming area", "Bay windows", "Rear garden"],
    cons: ["Dated electrics", "Single reception"],
    listingUrl: "https://www.zoopla.co.uk/for-sale/details/64829104/", lat: 53.8290, lng: -1.5403,
    agency: "Reeds Rains", platform: "Zoopla",
    agentName: "Michael Chen", agentPhone: "0113 387 7700"
  },

  // ---------- Oxford ----------
  {
    price: 425000, bedrooms: 3, bathrooms: 2, sqft: 1350,
    address: "8 Morningside Road, Morningside", postcode: "EH10 4DD", city: "Oxford",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    pros: ["Traditional sandstone", "Spacious rooms", "Close to parks"],
    cons: ["Needs some modernising", "Street parking"],
    listingUrl: "https://www.onthemarket.com/details/1528394/", lat: 55.9319, lng: -3.2088,
    agency: "Knight Frank", platform: "OnTheMarket",
    agentName: "Fiona MacLeod", agentPhone: "0131 222 9600"
  },
  {
    price: 395000, bedrooms: 4, bathrooms: 2, sqft: 1600,
    address: "17 Stockbridge, New Town", postcode: "EH3 6TN", city: "Oxford",
    imageUrl: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800",
    pros: ["Georgian architecture", "High ceilings", "Central location", "Original fireplaces"],
    cons: ["No lift access", "Limited storage"],
    listingUrl: "https://www.onthemarket.com/details/1528394/", lat: 55.9571, lng: -3.2073,
    agency: "Knight Frank", platform: "OnTheMarket",
    agentName: "Fiona MacLeod", agentPhone: "0131 222 9600"
  },
  {
    price: 310000, bedrooms: 3, bathrooms: 2, sqft: 1150,
    address: "28 Marchmont Crescent, Marchmont", postcode: "EH9 1HQ", city: "Oxford",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600",
    pros: ["Near university", "Communal garden", "Well-maintained tenement"],
    cons: ["Shared stairwell", "Limited parking"],
    listingUrl: "https://www.onthemarket.com/details/1528394/", lat: 55.9383, lng: -3.1852,
    agency: "Knight Frank", platform: "OnTheMarket",
    agentName: "Fiona MacLeod", agentPhone: "0131 222 9600"
  }
];