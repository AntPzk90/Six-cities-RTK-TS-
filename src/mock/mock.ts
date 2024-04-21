type Host = {
  id: number;
  name: string;
  isPro: boolean;
  avatarUrl: string;
}

type Hotel = {
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  previewImage: string;
  images: string[];
  title: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: Host;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  id: number;
};


export const hotel: Hotel = {
  'city': {
    'name': 'Amsterdam',
    'location': {
      'latitude': 52.37454,
      'longitude': 4.897976,
      'zoom': 13
    }
  },
  'previewImage': 'https://9.react.htmlacademy.pro/static/hotel/15.jpg',
  'images': [
    ' https://9.react.htmlacademy.pro/static/hotel/17.jpg',
    'https://9.react.htmlacademy.pro/static/hotel/8.jpg',
    'https://9.react.htmlacademy.pro/static/hotel/9.jpg',
    'https://9.react.htmlacademy.pro/static/hotel/6.jpg',
  ],
  'title': 'Nice, cozy, warm big bed apartment',
  'isFavorite': false,
  'isPremium': false,
  'rating': 2.9,
  'type': 'room',
  'bedrooms': 1,
  'maxAdults': 2,
  'price': 216,
  'goods': [
    'Washer',
    'Air conditioning',
    'Breakfast',
    'Laptop friendly workspace'
  ],
  'host': {
    'id': 25,
    'name': 'Angelina',
    'isPro': true,
    'avatarUrl': 'img/avatar-angelina.jpg'
  },
  'description': 'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.',
  'location': {
    'latitude': 52.35054,
    'longitude': 4.908976,
    'zoom': 16
  },
  'id': 1
};
