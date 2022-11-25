// Creating home page

export default function homePage() {
  // Creating variables

  const mainDiv = document.createElement("div")
  const h1 = document.createElement("h1");

  // Appending

  h1.append("Home Page");
  mainDiv.append(h1)

  return mainDiv;
}
