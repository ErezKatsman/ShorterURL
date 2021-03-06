const submit = document.getElementById("submit");
const input = document.getElementById("url-input");
const shortenerUrlDiv = document.getElementById("shortener-url");

function createElement(element, id, className, inner) {
  const elem = document.createElement(element);
  elem.id = id;
  elem.className = className;
  elem.innerHTML = inner;
  return elem;
}

function getFromURL(textInput) {
  return fetch(`http://localhost:3000/API/shorterURL/`, {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify({ url: textInput }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => data);
}

submit.addEventListener("click", async (event) => {
  shortenerUrlDiv.innerHTML = "";
  const resObj = await getFromURL(input.value);
  if (resObj.success === true) {
    const urlObj = resObj.message;
    const shoreterURL = createElement(
      "span",
      "span-shoretr",
      "child-view",
      `shorterURL: http://localhost:3000/API/shorterURL/${urlObj.shortURLid}`
    );
    const redirectCount = createElement(
      "span",
      "span-shoretr",
      "child-view",
      `clickTimes: ${urlObj.redirectCount}`
    );
    shortenerUrlDiv.append(shoreterURL, redirectCount);
  } else {
    setTimeout(() => {
      shortenerUrlDiv.innerHTML = resObj.message;
    }, 700);
    shortenerUrlDiv.className = "view-section-unsuccess";
  }
});
