const pointsElm = document.querySelector(".reward-points p span");
const points = parseInt(pointsElm.innerText.replace(",", ""), 10);



const newElm = document.createElement("span");

getFormatedCurency(points).then(amount => {
  newElm.innerText = ` -` + amount
})

newElm.innerText = ` - ${getFormatedCurency(points)}`;

const elm = document.querySelector(".reward-points > p");
elm.append(newElm);


addMoneys()


addButton('more')
addButton('transfers')
addButton('awards')
addButton('orders')

function addButton(name) {
  document.getElementById(name).addEventListener('click', function () {
    setTimeout(() => addMoneys(), 1000)
  });
}

function addMoneys() {
  const days = document.querySelectorAll("#toggleRolldown.toggle.rolldown-plus > span > strong");

  for (const elm of days) {
    const amount = elm.innerText + ""
    if (!amount.includes("$")) {
      getFormatedCurency(amount).then(am2 => {
        elm.append(am2)
      })
    }
  }


  const projs = document.querySelectorAll(".reward-item-inner.item-color .sub-reward-item li > b");

  for (const elm of projs) {
    const amount = elm.innerText + "";
    if (!amount.includes("$")) {
      getFormatedCurency(amount).then(am => {
        elm.append(am)
      })
    }

  }
}

function getFormatedCurency(amount) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('conversion', conversion => {
      const rate = conversion.conversion;
      chrome.storage.sync.get('currency', currency => {
        const symbol = currency.currency === 'USD' ? "$" : "£"
        resolve(" (" + symbol + (Math.round(parseFloat(amount) * rate * 100) / 100).toFixed(2) + ") ")
      })
    })
  })
}


