
export function getStorageData(key, defaultValue = null) {
  try {
    const savedData = localStorage.getItem(key);

    return savedData ? JSON.parse(savedData) : defaultValue;
  } catch (error) {
    console.error("Error reading localStorage:", error);
    return defaultValue;
  }
}

export function saveStorageData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    return false;
  }
}

export function removeStorageData(key) {
  localStorage.removeItem(key);
}

export function clearStorageData() {
  localStorage.clear();
}
