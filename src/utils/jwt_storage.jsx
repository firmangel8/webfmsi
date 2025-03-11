import { EncryptStorage } from "encrypt-storage";

const SECRET_KEY = import.meta.env.VITE_REACT_APP_SECRET_KEY_STORE;
if (!SECRET_KEY) {
  throw new Error(
    "Missing SECRET_KEY environment variable. Please set it in .env",
  );
}
const storage = new EncryptStorage(SECRET_KEY);
const token_auth = "token_auth";

export const jwtStorage = {
  async storeToken(token) {
    try {
      storage.setItem(token_auth, token);
    } catch (error) {
      console.error("Error storing token:", error);
      throw error; // Re-throw error for handling
    }
  },

  async retrieveToken() {
    try {
      const token = await storage.getItem(token_auth);
      return token;
    } catch (error) {
      console.error("Error retrieving token:", error);
      return null;
    }
  },

  async removeItem() {
    try {
      storage.removeItem(token_auth);
    } catch (error) {
      console.error("Error retrieving token:", error);
      return null; // Handle missing or invalid token
    }
  },
};

// Optional: Wrap in an immediately invoked function expression (IIFE)
// to avoid exposing the secret key in module scope
(function () {
  Object.freeze(jwtStorage); // Prevent further modification
})();
