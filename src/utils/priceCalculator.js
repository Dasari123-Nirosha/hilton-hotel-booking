
export function calculateRoomPrice(pricePerNight, nights) {
  return Number(pricePerNight || 0) * Number(nights || 0);
}

export function calculateTotalPrice(pricePerNight, nights, extraCharges = 0) {
  const roomPrice = calculateRoomPrice(pricePerNight, nights);

  return roomPrice + Number(extraCharges || 0);
}

export function formatPrice(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));
}
