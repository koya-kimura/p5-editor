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

