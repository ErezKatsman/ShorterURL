const submit = document.getElementById("submit");
const input = document.getElementById("url-input");
const shortenerUrlDiv = document.getElementById("shortener-url");

// function getOnDiv(id) {
//   fetch(`http://localhost:3000/API/shorterURL/${id}`, {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data));
// }

function getFromURL(textInput) {
  fetch(`http://localhost:3000/API/shorterURL/`, {
    method: "POST",
    // headers: { "content-Type": "application/json" },
    body: { url: textInput },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    });
}

getFromURL(
  "https://stackoverflow.com/questions/28352871/in-express-how-do-i-redirect-a-user-to-an-external-url"
);
// getOnDiv("1614870835997");

submit.addEventListener("click", (event) => {
  // getFromUrl(input.value);
});
