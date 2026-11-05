// Licensed stock photography for atmosphere only. Never present these as the property or menu.
export const inspirationPhotos = {
  lounge: {
    src: '/images/inspiration/tropical-lounge',
    alt: 'Rattan lamps, timber and tropical plants in a lounge in Thailand; inspiration photograph',
    title: 'Natural textures. A warm welcome.',
    photographer: 'Seongjin Park',
    source: 'https://unsplash.com/photos/a-tropical-restaurant-dining-area-with-lush-greenery-2iaHSGGvMNQ',
  },
  foliage: {
    src: '/images/inspiration/foliage',
    alt: 'Sunlight filtering through green palm leaves; inspiration photograph',
    title: 'A little closer to nature',
    photographer: 'Luise and Nic',
    source: 'https://unsplash.com/photos/green-palm-fronds-in-sunlight-YGoNP5ptM64',
  },
  cocktail: {
    src: '/images/inspiration/cocktail',
    alt: 'A red cocktail with citrus on a wooden table; inspiration photograph, not a confirmed menu item',
    title: 'Something refreshing',
    photographer: 'Hybrid Storytellers',
    source: 'https://unsplash.com/photos/a-glass-of-red-liquid-with-limes-and-a-slice-of-lime-hahQhtPnMMs',
  },
  evening: {
    src: '/images/inspiration/evening-lounge',
    alt: 'Outdoor tables under string lights at dusk in Bali; inspiration photograph',
    title: 'Evenings worth lingering over',
    photographer: 'Hanna Lazar',
    source: 'https://unsplash.com/photos/outdoor-dining-area-with-string-lights-at-dusk-WgJtfk9aKKI',
  },
};
export type InspirationPhotoId = keyof typeof inspirationPhotos;
