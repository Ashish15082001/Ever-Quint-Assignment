/*

- A Theatre takes 5 units of time to build and covers 2x1 parcel of land.
- A Pub takes 4 units of time to develop and covers 1x1 parcel of land.
- A Commercial Park takes 10 units of time to build and covers 3x1 parcel of land.

*/
// manually written
function maxProfitWrapper() {
  const profitMap = new Map();

  const maxProfit = (time) => {
    if (time <= 0) {
      return 0;
    }

    if (profitMap.has(time)) {
      return profitMap.get(time);
    }

    // building Theatre
    const remainingTime1 = time - 5;
    const maxProfit1 = maxProfit(remainingTime1);
    const profit1 = remainingTime1 > 0 ? maxProfit1 + remainingTime1 * 1500 : 0;

    // building Pub
    const remainingTime2 = time - 4;
    const maxProfit2 = maxProfit(remainingTime2);
    const profit2 = remainingTime2 > 0 ? maxProfit2 + remainingTime2 * 1000 : 0;

    // building Commercial Park
    const remainingTime3 = time - 10;
    const maxProfit3 = maxProfit(remainingTime3);
    const profit3 = remainingTime3 > 0 ? maxProfit3 + remainingTime3 * 2000 : 0;

    const maxProfitValue = Math.max(profit1, profit2, profit3);
    profitMap.set(time, maxProfitValue);

    return maxProfitValue;
  };

  return maxProfit;
}

const getMaxProfit = maxProfitWrapper();

const timeInputElement = document.querySelector("#time");
const computeButtonElement = document.querySelector("#compute");
const earningsElement = document.querySelector("#earnings");
const errorElement = document.querySelector("#error");

const showError = (message) => {
  errorElement.textContent = message;
  errorElement.hidden = false;
};

const hideError = () => {
  errorElement.textContent = "";
  errorElement.hidden = true;
};

const handleCompute = () => {
  const raw = timeInputElement.value.trim();

  if (raw === "" || !/^\d+$/.test(raw)) {
    showError("Please enter a whole, non-negative number of time units.");
    earningsElement.textContent = "$0";
    return;
  }

  hideError();
  earningsElement.textContent = `$${getMaxProfit(parseInt(raw, 10))}`;
};

computeButtonElement.addEventListener("click", handleCompute);
timeInputElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") handleCompute();
});
