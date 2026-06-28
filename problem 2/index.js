const heightsInputElement = document.querySelector("#heights");
const computeButtonElement = document.querySelector("#compute");
const totalWaterElement = document.querySelector("#total-water");
const errorElement = document.querySelector("#error");
const tableElement = document.querySelector("#table");

let heightsArray = [];

heightsInputElement.addEventListener("input", (event) => {
  const inputValue = event.target.value;

  heightsArray = inputValue
    .split(",")
    .filter(
      (height) => height.trim() !== "" && !isNaN(parseInt(height.trim(), 10)),
    )
    .map((height) => {
      const trimmedHeight = height.trim();
      const parsedHeight = parseInt(trimmedHeight, 10);

      return Math.max(0, parsedHeight);
    });

  hideError();
});

computeButtonElement.addEventListener("click", () => {
  if (heightsArray.length === 0) {
    showError("Please enter at least one block height (e.g. 0, 4, 0, 6).");
    totalWaterElement.textContent = "0 Units";
    tableElement.replaceChildren();
    return;
  }

  hideError();

  const totalWater = computeTrappedWater(heightsArray);
  totalWaterElement.textContent = `${totalWater} Units`;
  renderTable(heightsArray);
});

// [0,4,0,0,0,6,0,6,4,0]
function computeTrappedWater(heights) {
  if (heights.length < 3) return 0;

  let leftindex = 0;
  let rightIndex = heights.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let totalWater = 0;

  while (leftindex < rightIndex) {
    if (heights[leftindex] <= heights[rightIndex]) {
      leftMax = Math.max(leftMax, heights[leftindex]);
      totalWater += leftMax - heights[leftindex];
      leftindex++;
    } else {
      rightMax = Math.max(rightMax, heights[rightIndex]);
      totalWater += rightMax - heights[rightIndex];
      rightIndex--;
    }
  }

  return totalWater;
}

// Water level for each column = min(tallest wall to the left, tallest to the right).
function computeWaterLevels(heights) {
  const n = heights.length;
  const levels = new Array(n).fill(0);

  let leftMax = 0;
  for (let i = 0; i < n; i++) {
    leftMax = Math.max(leftMax, heights[i]);
    levels[i] = leftMax;
  }

  let rightMax = 0;
  for (let i = n - 1; i >= 0; i--) {
    rightMax = Math.max(rightMax, heights[i]);
    levels[i] = Math.min(levels[i], rightMax);
  }

  return levels;
}

// Render the grid top-down: each cell is a block (yellow), water (blue), or empty (white).
function renderTable(heights) {
  const maxHeight = Math.max(...heights, 0);
  const levels = computeWaterLevels(heights);

  const grid = document.createElement("div");
  grid.className = "grid";
  grid.style.gridTemplateColumns = `repeat(${heights.length}, var(--cell))`;

  for (let level = maxHeight; level >= 1; level--) {
    for (let i = 0; i < heights.length; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";

      if (level <= heights[i]) {
        cell.classList.add("block");
      } else if (level <= levels[i]) {
        cell.classList.add("water");
      } else {
        cell.classList.add("empty");
      }

      grid.appendChild(cell);
    }
  }

  // Height labels along the bottom row.
  for (let i = 0; i < heights.length; i++) {
    const label = document.createElement("div");
    label.className = "label";
    label.textContent = heights[i];
    grid.appendChild(label);
  }

  tableElement.replaceChildren(grid);
}

function showError(message) {
  errorElement.textContent = message;
  errorElement.hidden = false;
}

function hideError() {
  errorElement.textContent = "";
  errorElement.hidden = true;
}
