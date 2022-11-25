import { onHandleRoute } from "./route";

export default function reloadHeader(name) {
    const regAuth = document.getElementById("reg");
    if (name) {

        // Creating variables

        const nameA = document.createElement("a");
        nameA.append(name)

        // Changing registration & authorization div

        regAuth.innerHTML = "";
        regAuth.append(nameA)
        nameA.href = "/account";
        nameA.addEventListener("click", onHandleRoute);

    } else {

        // Creating variables

        const loginHref = document.createElement("a");
        const registerHref = document.createElement("a");

        // Changing registration & authorization div

        regAuth.innerHTML = "";

        // Registration & login div setting

        regAuth.append(registerHref, loginHref);

        // Registration link

        registerHref.append("Register");
        registerHref.setAttribute("href", "/registration");
        registerHref.addEventListener("click", onHandleRoute);

        // Login link

        loginHref.append("Log-in");
        loginHref.setAttribute("href", "/authorization");
        loginHref.addEventListener("click", onHandleRoute);

    }
}