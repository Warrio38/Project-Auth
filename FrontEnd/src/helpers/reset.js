export default function reset() {
  if (
    location.pathname === "/registration" ||
    location.pathname === "/authorization"
  ) {

    // Resetting errors & other content from reg and login links

    const err = document.getElementById("error");
    const loadingDiv = document.getElementById("loadDiv");
    const checkbox = document.getElementsByClassName("form__check")[0];
    const passInp = document.getElementById("passInp");
    const nameInp = document.getElementById("nameInp");
    err.innerText = "";
    loadingDiv.style.display = "none";
    nameInp.value = "";
    passInp.value = "";
    checkbox.checked = false;
  }
}
