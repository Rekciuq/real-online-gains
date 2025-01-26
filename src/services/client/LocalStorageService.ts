"use client";

class LocalStorageService {
  static setItem(name: string, value: unknown) {
    localStorage.setItem(name, JSON.stringify(value));
  }

  static getItem(name: string) {
    const item = localStorage.getItem(name);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }

  static removeItem(name: string) {
    localStorage.removeItem(name);
  }

  static removeAll() {
    localStorage.clear();
  }
}

export default LocalStorageService;
