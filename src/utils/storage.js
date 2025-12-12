import { STORAGE_KEY } from "../constants.js";

export function saveChannels(channels) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(channels));
  } catch (error) {
    console.error("Failed to save channels to localStorage:", error);
  }
}

export function loadChannels() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load channels from localStorage:", error);
    return [];
  }
}

export function clearChannels() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear channels from localStorage:", error);
  }
}
