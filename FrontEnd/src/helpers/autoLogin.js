export default async function loaded() {

  // Parsing localStorage and adding information to sessionStorage

  const token = localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token");
  if (token) {
    const result = await fetch("http://localhost:3000/getInfo", {
      method: "POST",
      body: JSON.stringify({
        token: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res) return res.text()
      })
      return result
  }
}
