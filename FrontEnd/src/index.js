import { onLocation } from "./helpers/route";
import "./styles/styles.css";
import createHeader from "./components/Header";

async function init() {

  // Creating main div, adding header
  
  const root = document.getElementById("root");
  const main = document.createElement("div");
  const header = await createHeader()
  main.id = "main";
  root.append(header, main);


  // Set home page

  onLocation();
}

init()