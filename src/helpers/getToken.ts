import { TOKEN_LOCALSTORAGE_KEY } from "../constants";

export default function getToken() {
  return localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);
}
