// get Solar Hijri year in number & in English...........
// "en-Us-u-ca-persian" > a Unicode
// Intl.DateTimeFormat / format() > an API for time format

// 1) this is more customizable
const shamsiFormat = new Intl.DateTimeFormat("en-Us-u-ca-persian", {
  year: "numeric",
})
  .format(new Date())
  .replace(" AP", "");

// or

// 2) this is simpler
const date = new Date();
const shamsi = date
  .toLocaleDateString("en-Us-u-ca-persian", { year: "numeric" })
  .replace(" AP", "");

// get the current year & its previous 20 years............
const currentYear = shamsi;
const minYear = currentYear - 20;

for (let i = currentYear; i >= minYear; i--) {
  const option = document.createElement("option");
  option.textContent = i;
  document.querySelector("#years").appendChild(option);
}

// check only one checkbox................................
const checkboxes = document.querySelectorAll(".checkbox");
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (basic.checked) {
      complete.checked = false;
      // *************************************
    } else if (complete.checked) {
      basic.checked = false;
    }
  });
});

//clicking on the btn (START)............................
const generatorBtn = document.querySelector("#generator");
generatorBtn.addEventListener("click", () => {
  // 1) car model value
  const chosenModel = document.querySelector("#cars").value;
  // show the chosen model
  document.querySelector("#model").textContent = chosenModel;

  // 2) car year value
  const chosenYear = document.querySelector("#years").value;
    // show the chosen year
    document.querySelector("#year").textContent = chosenYear;


  // 3) insurance type value
  let chosenInsuranceT = 0;
  const basic = document.querySelector("#basic");
  const complete = document.querySelector("#complete");

  // get insuranceRatio
  if (basic.checked) {
    chosenInsuranceT = 30;
    // show it in factor
      document.querySelector("#type").textContent = "Basic";
  } else if (complete.checked) {
    chosenInsuranceT = 50;
        // show it in factor
      document.querySelector("#type").textContent = "Complete";
  }

  // checkbox validation
  if (!basic.checked && !complete.checked) {
    const small = document.querySelector("small");
    small.textContent = "Choose your insurance type.";
  } else {
    // remove the form
    const form = document.querySelector("form");
    form.style.display = "none";

    // show loading svg for a period of time

    loading();

    // give it values to generate quote after a sec
    setTimeout(
      priceCalculator,
      3000,
      chosenModel,
      chosenYear,
      chosenInsuranceT
    );
  }
});

// calculate final price..................................
function priceCalculator(chosenModel, chosenYear, chosenInsuranceT) {
  // remove loading svg
  document.querySelector("#loadingsvg").remove();

  // show the factor
  const factor = document.querySelector("#factor");
  factor.style.display = "flex";

  // insurance ratio
  const insuranceRatio = chosenInsuranceT;

  // base price
  const basePrice = 2000000;

  // year difference
  const yearDifference = currentYear - chosenYear;

  // car ratio
  let carRatio = 0;
  switch (chosenModel) {
    case "Pride":
      carRatio = 1.15;
      break;

    case "Optima":
      carRatio = 1.3;
      break;

    case "Porches":
      carRatio = 1.8;
      break;
  }

  // calculate final price
  let price = 0;
  price = basePrice * carRatio;
  // price =
  price = price * insuranceRatio;

  // show the final price
  document.querySelector("#finalPrice").textContent = price;
}

// loading ...............................................

function loading() {
  const quoteForm = document.querySelector("#quoteForm");
  quoteForm.insertAdjacentHTML(
    "afterbegin",
    `<?xml version="1.0" encoding="utf-8"?>
  <svg id="loadingsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(241, 242, 243, 0); display: block; shape-rendering: auto;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
  <path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#0051a2" stroke="none">
    <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51;360 50 51"></animateTransform>
  </path></svg>`
  );
}

// calculate with OOP......................................
// class Quote {
//   constructor(model, year, insuranceType) {
//     this.model;
//     this.year;
//     this.insuranceType;
//   }

// test(){
// console.log(`car model is ${this.model}, car year is ${this.year} and insurance type is ${this.insuranceType}.`);
// }
// }

// const user = new Quote(chosenModel, chosenYear, chosenInsuranceT);

// user.test();
