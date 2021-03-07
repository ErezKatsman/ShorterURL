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
  return fetch(`http://localhost:3000/api/shorterurl/`, {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify({ url: textInput }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => data);
}

function getLocalURL(textInput) {
  return fetch(`http://localhost:3000/api/shorterurl/`, {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify({ url: textInput }),
  }).then((res) => {
    console.log(res);
    return res.url;
  });
}

submit.addEventListener("click", async () => {
  shortenerUrlDiv.innerHTML = "";
  const resObj = await getFromURL(input.value);
  if (resObj.success === true) {
    const urlObj = resObj.message;
    const shoreterURL = createElement(
      "span",
      "span-shoretr",
      "child-view",
      `shorter URL:  ${(await getLocalURL(input.value)) + urlObj.shortURLid}`
    );
    const redirectCount = createElement(
      "span",
      "span-shoretr",
      "child-view",
      `click Times: ${urlObj.redirectCount}`
    );
    shortenerUrlDiv.append(shoreterURL, redirectCount);
  } else {
    setTimeout(() => {
      shortenerUrlDiv.innerHTML = resObj.message;
    }, 700);
    shortenerUrlDiv.className = "view-section-unsuccess";
  }
});
