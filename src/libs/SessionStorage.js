export default class SessionStorage {
  static setItem(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  static getItem(key) {
    const value = sessionStorage.getItem(key);
    let data = null;
    try {
      data = JSON.parse(value);
    } catch (error) {
    }
    return data;
  }

  static resetSessionStorage(keys) {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      sessionStorage.removeItem(key);
    }
  }
}