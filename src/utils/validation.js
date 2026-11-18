
export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone) {
  return /^\d{10}$/.test(String(phone).replace(/\D/g, ""));
}

export function validateRequired(value) {
  return String(value || "").trim().length > 0;
}

export function validateGuestCount(guests, maxGuests) {
  const count = Number(guests);
  const maximum = Number(maxGuests);

  return Number.isInteger(count) && count >= 1 && count <= maximum;
}

export function validateBookingDates(checkIn, checkOut) {
  if (!checkIn || !checkOut) return false;

  return checkOut > checkIn;
}

export function validateBookingForm(data, maxGuests) {
  const errors = {};

  if (!validateRequired(data.fullName)) {
    errors.fullName = "Please enter your full name.";
  }

  if (!validateEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!validatePhone(data.phone)) {
    errors.phone = "Please enter a valid 10-digit phone number.";
  }

  if (!validateGuestCount(data.guests, maxGuests)) {
    errors.guests = `Please enter between 1 and ${maxGuests} guests.`;
  }

  if (!validateBookingDates(data.checkIn, data.checkOut)) {
    errors.dates = "Please select a valid check-in and check-out date.";
  }

  return errors;
}
