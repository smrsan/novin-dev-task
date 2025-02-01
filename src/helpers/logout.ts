import { TOKEN_LOCALSTORAGE_KEY } from "../constants";

export default function logout() {
  localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
}
