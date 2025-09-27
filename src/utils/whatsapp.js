export const generateWhatsAppUrl = (phone, text) => {
  const t = encodeURIComponent(text);
  return `https://wa.me/${phone.replace(/\+/g, '').replace(/\D/g, '')}?text=${t}`;
};
