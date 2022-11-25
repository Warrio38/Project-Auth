import { onLocation } from "../../helpers/route";
import reloadHeader from "../../helpers/reloadingHeader";
import reset from "../../helpers/reset";

export default async function registration() {

  // Creating elements

  const mainDiv = document.createElement("div");
  const loadingDiv = document.createElement("div");
  const nameDiv = document.createElement("div");
  const passDiv = document.createElement("div");
  const nameLabel = document.createElement("label");
  const passLabel = document.createElement("label");
  const form = document.createElement("form");
  const title = document.createElement("h1");
  const nameInp = document.createElement("input");
  const passInp = document.createElement("input");
  const sendBut = document.createElement("input");
  const err = document.createElement("div");
  const rememberCheck = document.createElement("input");
  const rememberLabel = document.createElement("label");
  let working = false;

  // Loading div setting

  loadingDiv.id = "loadDiv";
  loadingDiv.className = "loadingDiv";
  loadingDiv.style.display = "none";

  // Setting div with errors

  err.id = "error";

  // Remember label & checkbox setting

  rememberLabel.className = "remember__label";
  rememberLabel.append("Remember me");
  rememberCheck.type = "checkbox"
  rememberCheck.className = "form__check";
  rememberCheck.name = "rememberMe"

  // Main div; form; title setting

  mainDiv.className = "l-form";
  form.className = "form";
  form.name = "registration"
  title.className = "form__title";
  title.append("Registration");

  // Name setting

  nameDiv.className = "form__div";
  err.className = "authReg";
  nameInp.name = "nameInp"
  nameInp.id = "nameInp";
  nameInp.className = "form__input";
  nameInp.type = "text"
  nameInp.autocomplete = "off"
  nameLabel.className = "form__label";
  nameLabel.append("Name");

  // Password setting

  passDiv.className = "form__div";
  passInp.className = "form__input";
  passInp.id = "passInp";
  passInp.name = "passInp"
  passInp.type = "password"
  passLabel.className = "form__label";
  passLabel.append("Password");

  // Send button setting

  sendBut.type = "submit"
  sendBut.className = "form__button";
  sendBut.value = "Submit";

  // Appending elements

  nameDiv.append(nameInp, nameLabel);
  passDiv.append(passInp, passLabel);
  form.append(
    loadingDiv,
    title,
    err,
    nameDiv,
    passDiv,
    rememberCheck,
    rememberLabel,
    sendBut
  );
  mainDiv.append(form);

  // Fetching to backend

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    if (!working) {

      // Set loading

      working = true;
      loadingDiv.style.display = "";

      // Fetching

      await fetch("http://localhost:3000/createAccount", {
        method: "POST",
        body: JSON.stringify({
          name: nameInp.value,
          password: passInp.value,
          remember: rememberCheck.checked,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((req) => req.text())
        .then((req) => {

          // Parsing result

          const res = JSON.parse(req);

          // Loading result

          if (res.req === "Success") {

            // Setting token in local storage

            if (res.token && rememberCheck.checked) {
              localStorage.setItem("token", res.token);
            } 
            else {
              sessionStorage.setItem("token", res.token)
            }

            //  Reloading header

            reloadHeader(res.info.name)

            // Returning to the main page

            window.history.pushState({}, "", "/");
            onLocation();
          } else {

            // Set error

            err.className = "authReg errDiv";
            err.innerText = res.req;
          }

          // Resetting inputs and loading

          reset()
          
        });
    }
  });
  return mainDiv;
}
