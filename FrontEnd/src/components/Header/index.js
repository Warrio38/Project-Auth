import { onHandleRoute } from "../../helpers/route";
import loaded from "../../helpers/autoLogin";

// Header menu

export default async function createHeader() {

  const otherContent = document.createElement("div");
  const regAuth = document.createElement("div");
  const menu = document.createElement("div");
  const mainHeader = document.createElement("header");
  const mainPageHref = document.createElement("a");

  // Auto login with local/session storage

  const accountInfo = await loaded();
  const account = accountInfo ? JSON.parse(accountInfo) : undefined;

  // Main page link

  mainPageHref.append("Home");
  mainPageHref.setAttribute("href", "/");
  mainPageHref.addEventListener("click", onHandleRoute);
  // Registration & login div setting

  regAuth.id = "reg";

  // Checking account

  if (!account) {

    const loginHref = document.createElement("a");
    const registerHref = document.createElement("a");

    // Registration & login div (right side) setting

    regAuth.append(registerHref, loginHref);

    // Registration link

    registerHref.append("Register");
    registerHref.setAttribute("href", "/registration");
    registerHref.addEventListener("click", onHandleRoute);

    // Login link

    loginHref.append("Login");
    loginHref.setAttribute("href", "/authorization");
    loginHref.addEventListener("click", onHandleRoute);

  } 
  else {
    const name = document.createElement("a");
    name.href = "/account";
    name.addEventListener("click", onHandleRoute);
    name.append(account.name);
    regAuth.append(name);
  }

  // Other content (left side)

  otherContent.append(mainPageHref);
  otherContent.id = "other";
  menu.className = "menu";
  menu.append(otherContent, regAuth);
  mainHeader.append(menu);
  return mainHeader
}
