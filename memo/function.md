### 方眼を引く

```javaScript
function gridLine(grid) {
  for (let x = grid / 2; x < width; x += grid) {
    line(x, 0, x, height);
  }
  for (let y = grid / 2; y < height; y += grid) {
    line(0, y, width, y);
  }
}
```

### N角形を書く

```javaScript
function drawNgon(n, x, y, r, skip, angle = 0) {
  for (let i = 0; i < n; i++) {
    push();
    translate(x, y);
    rotate(angle + PI / 2);

    const start = i;
    const end = start + skip;

    const sx = r * cos(TAU * start / n);
    const sy = r * sin(TAU * start / n);

    const ex = r * cos(TAU * end / n);
    const ey = r * sin(TAU * end / n);

    line(sx, sy, ex, ey);
    pop();
  }
}
```