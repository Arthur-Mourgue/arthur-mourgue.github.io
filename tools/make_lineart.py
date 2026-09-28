"""
make_lineart.py: turn a CAD render / screenshot of the hand into the line drawing
used on the site (transparent PNG; the colour is applied by CSS).

Usage:
    pip install -r requirements.txt
    python make_lineart.py input.png ../site/assets/img/lamain-lines.png --height 1240

Tips:
- Best input: a clean export from the CAD tool (white background, 3/4 view, >= 2000 px),
  not a phone photo of a screen (moiré creates noise).
- Even better: export the edges as SVG directly from the CAD tool (drawing / technical
  view) and use that instead of this script: it stays sharp at any size.
- Tune --low / --high (Canny thresholds) if you get too many or too few lines.
"""
import argparse

import cv2
import numpy as np
from scipy import ndimage as ndi


def object_mask(gray: np.ndarray) -> np.ndarray:
    """Separate the hand from a light, uniform background."""
    blur = cv2.GaussianBlur(gray, (5, 5), 0).astype(float)
    mag = np.hypot(ndi.sobel(blur, 1), ndi.sobel(blur, 0))
    m = (mag > 60) | (blur < 150)
    m = ndi.binary_closing(m, iterations=6)
    m = ndi.binary_fill_holes(m)
    m = ndi.binary_opening(m, iterations=3)
    lab, n = ndi.label(m)
    if n == 0:
        raise SystemExit("No object found: is the background light and uniform?")
    sizes = ndi.sum(m, lab, range(1, n + 1))
    m = lab == (np.argmax(sizes) + 1)
    m = ndi.binary_fill_holes(ndi.binary_closing(m, iterations=4))
    return ndi.binary_opening(m, iterations=4)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("input")
    ap.add_argument("output")
    ap.add_argument("--height", type=int, default=1240, help="output height in px (2x the display size)")
    ap.add_argument("--low", type=int, default=50)
    ap.add_argument("--high", type=int, default=130)
    ap.add_argument("--min-speck", type=int, default=30, help="drop edge fragments smaller than this (px)")
    a = ap.parse_args()

    img = cv2.imread(a.input)
    if img is None:
        raise SystemExit(f"Cannot read {a.input}")
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    mask = object_mask(gray)

    # Local contrast so details inside dark parts come out
    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8)).apply(gray)
    smooth = cv2.bilateralFilter(clahe, 9, 50, 9)
    edges = cv2.Canny(smooth, a.low, a.high)
    edges = np.where(ndi.binary_erosion(mask, iterations=2), edges, 0).astype(np.uint8)

    n, lab, stats, _ = cv2.connectedComponentsWithStats(edges, 8)
    keep = np.zeros_like(edges)
    for i in range(1, n):
        if stats[i, cv2.CC_STAT_AREA] >= a.min_speck:
            keep[lab == i] = 255

    contours, _ = cv2.findContours(mask.astype(np.uint8) * 255, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    cv2.drawContours(keep, contours, -1, 255, 3)
    keep = (ndi.binary_dilation(keep > 0, iterations=1) * 255).astype(np.uint8)

    h = a.height
    w = int(keep.shape[1] * h / keep.shape[0])
    alpha = cv2.resize(keep, (w, h), interpolation=cv2.INTER_AREA)
    rgba = np.dstack([np.full_like(alpha, 255)] * 3 + [alpha])
    cv2.imwrite(a.output, cv2.cvtColor(rgba, cv2.COLOR_RGBA2BGRA))
    print(f"Wrote {a.output} ({w}x{h}). Aspect ratio for CSS: {w} / {h}")


if __name__ == "__main__":
    main()
