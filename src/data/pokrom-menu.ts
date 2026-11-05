// Publish only management-confirmed products and prices. Empty until the menu is approved.
// Stable IDs and explicit business ownership allow a future catalogue adapter without POS coupling.
export interface PublicMenuProduct {
  id: string;
  businessId: 'pokrom';
  categoryId: string;
  name: string;
  description?: string;
  price: number | null;
  currency: 'GHS';
  confirmed: boolean;
  available: boolean;
}
export const menuCategories = [
  { id: 'cocktails', name: 'Cocktails', note: 'Something to sip, slowly.' },
  { id: 'alcohol-free', name: 'Non-alcoholic beverages', note: 'Refreshment for every kind of evening.' },
  { id: 'beer-spirits', name: 'Beer & spirits', note: 'Find your favourite pour.' },
  { id: 'local-food', name: 'Local food', note: 'A taste of home, in the garden.' },
  { id: 'grills', name: 'Grills & special dishes', note: 'Good food. Better company.' },
];
export const menuProducts: PublicMenuProduct[] = [];
export const publishedProducts = menuProducts.filter(item => item.businessId === 'pokrom' && item.confirmed && item.available);
