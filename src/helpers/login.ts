import { TOKEN_LOCALSTORAGE_KEY } from "../constants";

export default function login(token: string) {
  localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, token);
}
