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

//clicking on the btn.....................................
const generatorBtn = document.querySelector("#generator");
generatorBtn.addEventListener('click', ()=>{
  // car model value
  const chosenModel = document.querySelector("#cars > option").value;

  // car year value
  const chosenYear = document.querySelector("#years > option").value;
  
  // insurance type value
  let chosenInsuranceT = 0;
  const basic = document.querySelector('#basic');
  const complete = document.querySelector('#complete');
  // check only one checkbox & get insuranceRatio

 const checkboxes = document.querySelectorAll('.checkbox');
 checkboxes.forEach((checkbox)=>{
    checkbox.addEventListener('change', ()=>{
        if (basic.checked) {
            chosenInsuranceT = 30;
            complete.checked = false ;
              // ************************************* 
       } else if (complete.checked) {
            chosenInsuranceT =  50;
            basic.checked = false ;
           }
     })
 })

 return [chosenModel, chosenYear, chosenInsuranceT]

})


// calculate with OOP......................................
class Quote {
  constructor(model, year, insuranceType) {
    this.model;
    this.year;
    this.insuranceType;
  }

test(){
console.log(`car model is ${this.model}, car year is ${this.year} and insurance type is ${this.insuranceType}.`);
}
}

const user = new Quote(chosenModel, chosenYear, chosenInsuranceT);

user.test();




