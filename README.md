# Ever Quint Assignment

## Problem 1 — Max Profit

Mr. X owns a large strip of land in Mars Land. For the purposes of this problem assume that he has infinite land capacity. On each parcel he can choose to develop it as per his wishes. He can build either Theatres, Pubs or Commercial Park. Commercial Park can house 6 Commercial Spaces; Theatre has 8 Auditoriums and Pub houses only one dance floor.

- A Theatre takes **5 units** of time to build and covers a **2×1** parcel of land.
- A Pub takes **4 units** of time to develop and covers a **1×1** parcel of land.
- A Commercial Park takes **10 units** of time to build and covers a **3×1** parcel of land.

Each unit of time that a building is operational, it earns him money.

| Establishment | Earnings |
|---|---|
| Theatre | $1500 |
| Pub | $1000 |
| Commercial Park | $2000 |

He cannot have two properties being developed in parallel in one unit of time.

- After `n` units of time, where `n` is the input, he earns money based on which properties have been developed.
- The output should be **T** for Theatre followed by number developed, **P** for Pub followed by number developed and **C** for Commercial Park followed by number developed.

**Challenge:** Come up with the right mix of properties based on the given input unit of time (`n`).

### Test Cases

| | Test Case 1 | Test Case 2 | Test Case 3 |
|---|---|---|---|
| **Input** | Time Unit: 7 | Time Unit: 8 | Time Unit: 13 |
| **Earnings** | $3000 | $4500 | $16500 |
| **Solutions** | 1. T: 1 P: 0 C: 0<br>2. T: 0 P: 1 C: 0 | 1. T: 1 P: 0 C: 0 | 1. T: 2 P: 0 C: 0 |

---

## Problem 2 — Water Tank

Given `n` (always greater than -1) representing the block height, compute the units of water stored in-between the blocks. Build a Web Application (Frontend Solution) using Vanilla JavaScript and HTML/CSS to represent the solution. Share the code and snippets in a Git repository.

**Hint:** Generate an SVG Shape (preferred) or a Table View to represent the solution.

### Example

```
Input:  [0, 4, 0, 0, 0, 6, 0, 6, 4, 0]
Output: 18 Units
```
