export type BusinessStatus = 'coming_soon' | 'open' | 'temporarily_closed';
export type BusinessId = 'pokrom' | 'pokhills';

// Management-confirmed changes only. Static pages must be rebuilt after editing.
export const businesses: Record<BusinessId, {
  id: BusinessId; name: string; status: BusinessStatus; path: string; hours: string | null;
}> = {
  pokrom: { id: 'pokrom', name: 'Pokrom Eco Bar', status: 'coming_soon', path: '/restaurant', hours: null },
  pokhills: { id: 'pokhills', name: 'Pokhills Eco Garden', status: 'coming_soon', path: '/rooms', hours: null },
};

export function statusLabel(id: BusinessId): string {
  const status = businesses[id].status;
  if (status === 'open') return 'Now Open';
  if (status === 'temporarily_closed') return 'Temporarily Closed';
  return id === 'pokrom' ? 'Opening Soon' : 'Coming Soon';
}

export function statusMessage(id: BusinessId): string {
  const status = businesses[id].status;
  if (status === 'open') return id === 'pokrom'
    ? 'We look forward to welcoming you to the garden. Contact us for visitor information.'
    : 'Contact us for information about Pokhills Eco Garden. Online bookings are not available.';
  if (status === 'temporarily_closed') return 'We are temporarily closed. Contact us for updates before planning a visit.';
  return id === 'pokrom'
    ? 'We’re getting the garden ready for you. Our opening date and hours will be announced here once confirmed.'
    : 'Our accommodation experience is being prepared. Stays, room reservations and payments are not available yet.';
}

// Existing verified property contact details; shared location does not imply shared operations.
export const property = {
  address: 'RQQG+2J8, Pokrom Nsabaa, Ghana',
  email: 'pokhillsecogarden@gmail.com',
  whatsapp: (import.meta.env?.PUBLIC_WHATSAPP ?? '233202400666').replace(/\D/g, ''),
  maps: 'https://www.google.com/maps/search/?api=1&query=RQQG%2B2J8%2C%20Pokrom%20Nsabaa%2C%20Ghana',
};

export function enquiryLink(id: BusinessId) {
  const text = `Hello! I’d like to enquire about ${businesses[id].name}.`;
  return property.whatsapp ? `https://wa.me/${property.whatsapp}?text=${encodeURIComponent(text)}`
    : `mailto:${property.email}?subject=${encodeURIComponent(businesses[id].name + ' enquiry')}`;
}

export function enquiryLabel(id: BusinessId): string {
  if (businesses[id].status === 'temporarily_closed') return 'Ask for reopening updates';
  if (businesses[id].status === 'open') return id === 'pokrom' ? 'Plan your visit' : 'Enquire about Pokhills';
  return id === 'pokrom' ? 'Ask about the opening' : 'Enquire about future stays';
}
