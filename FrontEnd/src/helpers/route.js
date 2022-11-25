import login from "components/RegAuth/login";
import registration from "components/RegAuth/registration";
import error from "../views/Error/error";
import homePage from "../views/Home/homePage";
import reset from "./reset";
import account from "../views/Account/account";

// Link redirecting

const onHandleRoute = (e) => {
  e.preventDefault();
  reset();
  window.history.pushState({}, "", e.target.href);
  onLocation();
};

// Routes for links

const routes = {
  404: error,
  "/": homePage,
  "/authorization": login,
  "/registration": registration,
  "/account": account,
};

// Page redirecting

const onLocation = async () => {
  const main = document.getElementById("main");
  const { pathname } = window.location;
  const routing = routes[pathname] || routes[404];
  main.innerHTML = "";
  main.append(await routing());
};

export { onHandleRoute, onLocation };
