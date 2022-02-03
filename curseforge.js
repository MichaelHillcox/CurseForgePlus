const pointsElm = document.querySelector(".reward-points p span");
const points = parseInt(pointsElm.innerText.replace(",", ""), 10);

let firstGbpCurrency = null;
const cardItems = document.querySelectorAll(".store-itemlisting-a");
for (const elm of cardItems) {
  const images = elm.querySelectorAll("li");

  for (const elm2 of images) {
    // If the card isn't available, remove the buttons
    if (elm2.classList.contains("unavailable")) {
      elm2.querySelector(".checkout").style = "opacity: 0.2";
    }

    const pointsRequired = elm2.querySelector(".info .price").innerText;
    const [pointsRequiredClean] = /[0-9]+/g.exec(
      pointsRequired.replace(/[.,]+/g, "")
    );

    const altText = elm2.querySelector(".image img").getAttribute("alt");
    const first = altText[0];
    const [value] = /[0-9]+/g.exec(altText);

    // Setup this for calculating later
    if (first === "£" && value > 10 && firstGbpCurrency === null) {
      firstGbpCurrency = {
        price: value,
        points: pointsRequiredClean,
      };
    }

    const available = (points / parseInt(pointsRequiredClean, 10)) * value;
    const elmForCard = document.createElement("span");
    elmForCard.innerText = ` - ${first}${Math.round(
      Math.max(0, available)
    ).toLocaleString()}(${Math.round(
      points / parseInt(pointsRequiredClean, 10)
    )})`;

    const text = elm2.querySelector(".price");
    text.innerText = text.innerText.replace(" points", "P");
    text.append(elmForCard);
  }
}

// Update the points with a money value next to it
if (firstGbpCurrency !== null) {
  const newElm = document.createElement("span");
  newElm.innerText = ` - £${Math.round(
    (points / firstGbpCurrency.points) * firstGbpCurrency.price
  )}`;

  const elm = document.querySelector(".reward-points > p");
  elm.append(newElm);
}
