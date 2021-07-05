const submit = document.getElementById("submit");
const input = document.getElementById("url-input");
const shortenerUrlDiv = document.getElementById("shortener-url");

// function for creating alements
function createElement(element, id, className, inner) {
  const elem = document.createElement(element);
  elem.id = id;
  elem.className = className;
  elem.innerHTML = inner;
  return elem;
}

//function the checks if the url is valid
function getFromURL(textInput) {
  return fetch(`${window.location.origin}/api/shorterurl/`, {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify({ url: textInput }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => data);
}

//function that get the shortr url
function getLocalURL(textInput) {
  return fetch(`${window.location.origin}/api/shorterurl/`, {
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
    shortenerUrlDiv.className = "view-section-success";
    const urlObj = resObj.message;
    const shoreterURL = createElement(
      "span",
      "span-shoretr",
      "child-view",
      `shorter URL:  ${(await getLocalURL(input.value)) + urlObj.shortURLid}`
    );
    const redirectCount = createElement(
      "span",
      "span-redirect",
      "child-view",
      `click Times: ${urlObj.redirectCount}`
    );
    const copyButton = createElement("button", "copy-btn", "btn", "copy URL");

    copyButton.addEventListener("click", async () => {
      const copyText = (await getLocalURL(input.value)) + urlObj.shortURLid;
      console.log(copyText);
      const TempText = document.createElement("input");
      TempText.value = copyText;
      document.body.appendChild(TempText);
      TempText.select();
      document.execCommand("copy");
      document.body.removeChild(TempText);

      alert("Copied the text: " + copyText);
    });

    shortenerUrlDiv.append(shoreterURL, redirectCount, copyButton);
  } else {
    setTimeout(() => {
      shortenerUrlDiv.innerHTML = resObj.message;
    }, 700);
    shortenerUrlDiv.className = "view-section-unsuccess";
  }
});
