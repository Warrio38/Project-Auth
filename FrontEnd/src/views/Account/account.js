import loaded from "../../helpers/autoLogin";
import reloadHeader from "../../helpers/reloadingHeader";
import { onLocation } from "../../helpers/route";

export default async function account() {

    // Creating variables for sign-out form

    const mainDiv = document.createElement("div");
    const form = document.createElement("div")
    const signOut = document.createElement("button")
    const formTitle = document.createElement("h1")
    const accountInfo = await loaded()
    const account = accountInfo ? JSON.parse(accountInfo) : undefined;
    console.log(account)

    // Setting form

    form.className = "form"

    // Setting sign out button

    signOut.className = "signOut__button"
    signOut.type = "submit"
    signOut.append("Sign out")

    // Sign out function

    signOut.addEventListener("click", async (e) => {

        // Removing token from storages

        sessionStorage.getItem("token") ? sessionStorage.removeItem("token") : localStorage.removeItem("token")

        // Reloading header element

        reloadHeader()

        // Returning to the main page

        window.history.pushState({}, "", "/");
        onLocation();

    })

    // Setting form title

    formTitle.className = "form__title"
    formTitle.append("Account " + account.name)

    // Setting main div

    mainDiv.className = "l-form"

    // Appending

    form.append(formTitle, signOut)
    mainDiv.append(form)

    return mainDiv
}