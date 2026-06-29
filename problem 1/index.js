/*

- A Theatre takes 5 units of time to build and covers 2x1 parcel of land.
- A Pub takes 4 units of time to develop and covers 1x1 parcel of land.
- A Commercial Park takes 10 units of time to build and covers 3x1 parcel of land.

*/

function maxProfitWrapper() {
  const profitMap = new Map();
  const firstBestBuildingTimeWise = new Map();

  const getMax = (time, profit1, profit2, profit3) => {
    const maxProfitValue = Math.max(profit1, profit2, profit3);

    switch (maxProfitValue) {
      case profit1: {
        firstBestBuildingTimeWise.set(time, "Theatre");
        break;
      }

      case profit2: {
        firstBestBuildingTimeWise.set(time, "Pub");
        break;
      }

      case profit3: {
        firstBestBuildingTimeWise.set(time, "Commercialub");
        break;
      }
    }

    return maxProfitValue;
  };

  const getMaxProfit = (time) => {
    if (time < 4) {
      return 0;
    }

    if (profitMap.has(time)) {
      return profitMap.get(time);
    }

    // building Theatre
    const remainingTime1 = time - 5;
    const profit1 =
      remainingTime1 > 0
        ? getMaxProfit(remainingTime1) + remainingTime1 * 1500
        : 0;

    // building Pub
    const remainingTime2 = time - 4;
    const profit2 =
      remainingTime2 > 0
        ? getMaxProfit(remainingTime2) + remainingTime2 * 1000
        : 0;

    // building Commercial Park
    const remainingTime3 = time - 10;
    const profit3 =
      remainingTime3 > 0
        ? getMaxProfit(remainingTime3) + remainingTime3 * 2000
        : 0;

    const maxProfitValue = getMax(time, profit1, profit2, profit3);
    profitMap.set(time, maxProfitValue);

    return maxProfitValue;
  };

  const getBestPath = (time) => {
    const bestPathMap = new Map();

    for (let i = time; i > 3; ) {
      const currentFirstBuilding = firstBestBuildingTimeWise.get(i);

      if (bestPathMap.has(currentFirstBuilding)) {
        bestPathMap.set(
          currentFirstBuilding,
          bestPathMap.get(currentFirstBuilding) + 1,
        );
      } else bestPathMap.set(currentFirstBuilding, 1);

      if (currentFirstBuilding === "Theatre") i -= 5;
      else if (currentFirstBuilding === "Pub") i -= 4;
      else i -= 10;
    }
    console.log(bestPathMap);
    return bestPathMap;
  };

  return {
    getMaxProfit,
    getBestPath,
  };
}

const { getMaxProfit, getBestPath } = maxProfitWrapper();

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
  earningsElement.textContent =
    `$${getMaxProfit(parseInt(raw, 10))} ` +
    JSON.stringify(Object.fromEntries(getBestPath(parseInt(raw, 10))));
  // `$${getMaxProfit(parseInt(raw, 10)).maxProfitValue}`;
};

computeButtonElement.addEventListener("click", handleCompute);
timeInputElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") handleCompute();
});
