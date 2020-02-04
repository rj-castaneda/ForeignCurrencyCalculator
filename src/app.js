const currencyOne = document.getElementById("local-currency");
const amountOne = document.getElementById("local-amount");
const currencyTwo = document.getElementById("foreign-currency");
const amountTwo = document.getElementById("foreign-amount");

const rate = document.getElementById("rate");
const swap = document.getElementById("swap");

//Fetch exchange rate and update DOM
function calculate() {
  const currencyOneVal = currencyOne.value;
  const currencyTwoVal = currencyTwo.value;

  fetch(`https://api.exchangeratesapi.io/latest?base=${currencyOneVal}`)
    .then(res => res.json())
    .then(data => {
      const rateVal = data.rates[currencyTwoVal];
      rate.innerHTML = `1 ${currencyOneVal} = ${rateVal} ${currencyTwoVal}`;
      if (amountOne.value > 0) {
        amountTwo.value = (amountOne.value * rateVal).toFixed(2);
      } else {
        amountTwo.value = "0";
      }
    });
}

// Event Listeners
currencyOne.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
currencyTwo.addEventListener("change", calculate);
amountTwo.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
});
calculate();
