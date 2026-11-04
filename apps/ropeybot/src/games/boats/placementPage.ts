import { escapeHtml } from "../../webserver";

export const BOARD_SIZE = 10;
export const BOAT_LENGTHS = [1, 2, 3, 4, 5];

export interface BoatPlacement {
    length: number;
    x: number;
    y: number;
    horizontal: boolean;
}

// Returns the validated placements, or undefined if invalid.
export function parsePlacements(body: string): BoatPlacement[] | undefined {
    let data: unknown;
    try {
        data = JSON.parse(body);
    } catch {
        return undefined;
    }
    if (!Array.isArray(data) || data.length !== BOAT_LENGTHS.length) {
        return undefined;
    }
    const occupied = new Set<number>();
    const lengths: number[] = [];
    const result: BoatPlacement[] = [];
    for (const b of data) {
        if (
            typeof b !== "object" ||
            b === null ||
            !Number.isInteger(b.length) ||
            !Number.isInteger(b.x) ||
            !Number.isInteger(b.y) ||
            typeof b.horizontal !== "boolean"
        ) {
            return undefined;
        }
        const { length, x, y, horizontal } = b as BoatPlacement;
        const endX = horizontal ? x + length - 1 : x;
        const endY = horizontal ? y : y + length - 1;
        if (x < 0 || y < 0 || endX >= BOARD_SIZE || endY >= BOARD_SIZE) {
            return undefined;
        }
        for (let i = 0; i < length; i++) {
            const cell =
                (horizontal ? y : y + i) * BOARD_SIZE +
                (horizontal ? x + i : x);
            if (occupied.has(cell)) return undefined;
            occupied.add(cell);
        }
        lengths.push(length);
        result.push({ length, x, y, horizontal });
    }
    if ([...lengths].sort().join() !== [...BOAT_LENGTHS].sort().join()) {
        return undefined;
    }
    return result;
}

export function renderPlacementPage(name: string): string {
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Place your boats</title>
<style>
  body { font-family: sans-serif; text-align: center; }
  #board {
    position: relative;
    display: grid;
    grid-template-columns: repeat(${BOARD_SIZE}, 1fr);
    grid-template-rows: repeat(${BOARD_SIZE}, 1fr);
    width: min(90vw, 500px);
    aspect-ratio: 1;
    margin: 1em auto;
    border: 2px solid #036;
    background: #8cf;
    touch-action: none;
    user-select: none;
  }
  .cell { border: 1px solid #5ae; }
  .boat {
    position: absolute;
    box-sizing: border-box;
    background: #567;
    border: 2px solid #234;
    border-radius: 8px;
    cursor: grab;
  }
  .boat.dragging { opacity: 0.7; cursor: grabbing; z-index: 2; }
  .boat.bad { background: #c44; }
  #status { min-height: 1.5em; }
</style>
</head>
<body>
<h1>Hi ${escapeHtml(name)}!</h1>
<h2>Place your boats</h2>
<p>Drag boats to move them, click to rotate.</p>
<div id="board"></div>
<button id="confirm">I'm done!</button>
<p id="status"></p>
<script>
const N = ${BOARD_SIZE};
const LENGTHS = ${JSON.stringify(BOAT_LENGTHS)};
const board = document.getElementById("board");
const statusEl = document.getElementById("status");
for (let i = 0; i < N * N; i++) {
  const c = document.createElement("div");
  c.className = "cell";
  board.appendChild(c);
}

const boats = [];

function cellsOf(b, x = b.x, y = b.y, horizontal = b.horizontal) {
  const out = [];
  for (let i = 0; i < b.length; i++) out.push([horizontal ? x + i : x, horizontal ? y : y + i]);
  return out;
}

function fits(b, x, y, horizontal) {
  const mine = cellsOf(b, x, y, horizontal);
  if (mine.some(([cx, cy]) => cx < 0 || cy < 0 || cx >= N || cy >= N)) return false;
  for (const o of boats) {
    if (o === b) continue;
    for (const [ox, oy] of cellsOf(o)) {
      if (mine.some(([cx, cy]) => cx === ox && cy === oy)) return false;
    }
  }
  return true;
}

function render(b) {
  const w = b.horizontal ? b.length : 1;
  const h = b.horizontal ? 1 : b.length;
  const s = 100 / N;
  b.el.style.left = b.x * s + "%";
  b.el.style.top = b.y * s + "%";
  b.el.style.width = w * s + "%";
  b.el.style.height = h * s + "%";
}

for (const length of LENGTHS) {
  const b = { length, x: 0, y: 0, horizontal: true, el: document.createElement("div") };
  b.el.className = "boat";
  for (let tries = 0; ; tries++) {
    const horizontal = Math.random() < 0.5;
    const x = Math.floor(Math.random() * N);
    const y = Math.floor(Math.random() * N);
    if (fits(b, x, y, horizontal)) {
      b.x = x; b.y = y; b.horizontal = horizontal;
      break;
    }
  }
  boats.push(b);
  board.appendChild(b.el);
  render(b);

  let drag = null;
  b.el.addEventListener("pointerdown", (e) => {
    const r = board.getBoundingClientRect();
    const cell = r.width / N;
    drag = {
      startX: e.clientX, startY: e.clientY,
      offX: Math.floor((e.clientX - r.left) / cell) - b.x,
      offY: Math.floor((e.clientY - r.top) / cell) - b.y,
      moved: false,
    };
    b.el.setPointerCapture(e.pointerId);
  });
  b.el.addEventListener("pointermove", (e) => {
    if (!drag) return;
    if (!drag.moved && Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) < 5) return;
    drag.moved = true;
    b.el.classList.add("dragging");
    const r = board.getBoundingClientRect();
    const cell = r.width / N;
    const x = Math.floor((e.clientX - r.left) / cell) - drag.offX;
    const y = Math.floor((e.clientY - r.top) / cell) - drag.offY;
    if (fits(b, x, y, b.horizontal)) {
      b.x = x; b.y = y;
      render(b);
    }
  });
  const end = () => {
    if (!drag) return;
    const wasClick = !drag.moved;
    drag = null;
    b.el.classList.remove("dragging");
    if (wasClick) {
      // Rotate about the boat's first tile, nudging back onto the board if needed.
      const horizontal = !b.horizontal;
      for (let shift = 0; shift < b.length; shift++) {
        const x = horizontal ? b.x - shift : b.x;
        const y = horizontal ? b.y : b.y - shift;
        if (fits(b, x, y, horizontal)) {
          b.x = x; b.y = y; b.horizontal = horizontal;
          render(b);
          return;
        }
      }
      b.el.classList.add("bad");
      setTimeout(() => b.el.classList.remove("bad"), 300);
    }
  };
  b.el.addEventListener("pointerup", end);
  b.el.addEventListener("pointercancel", () => { drag = null; b.el.classList.remove("dragging"); });
}

document.getElementById("confirm").addEventListener("click", async () => {
  const payload = boats.map(({ length, x, y, horizontal }) => ({ length, x, y, horizontal }));
  statusEl.textContent = "Submitting...";
  try {
    const res = await fetch(location.pathname + location.search, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    statusEl.textContent = res.ok ? "Placement confirmed!" : "Error: " + (await res.text());
  } catch (e) {
    statusEl.textContent = "Error submitting placement";
  }
});
</script>
</body>
</html>`;
}
