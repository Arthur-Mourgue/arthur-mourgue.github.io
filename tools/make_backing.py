"""
make_backing.py: derive the hand's opaque backing from the line drawing.

The reactive cross grid is painted behind the hand. The drawing is thin,
anti-aliased ink: once scaled, its strokes are semi-transparent, so the crosses
bleed through and look like they pass in front of the hand (very visible in
light mode). This backing is a slightly dilated copy of the drawing's alpha,
painted in the page's paper colour (CSS) and masked with the drawing. It sits
under the ink and blocks the crosses on the strokes, while the drawing's empty
gaps still let the background show through.

Usage:
    python make_backing.py ../site/assets/img/lamain-lines.png \
                           ../site/assets/img/lamain-lines-backing.png
"""
import argparse

import cv2
import numpy as np


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("input")
    ap.add_argument("output")
    ap.add_argument("--grow", type=int, default=2,
                    help="dilation in px at the source size (hides the anti-aliased stroke edges)")
    a = ap.parse_args()

    img = cv2.imread(a.input, cv2.IMREAD_UNCHANGED)
    if img is None:
        raise SystemExit(f"Cannot read {a.input}")
    if img.ndim != 3 or img.shape[2] != 4:
        raise SystemExit("Expected a BGRA PNG (the drawing produced by make_lineart.py)")

    alpha = img[:, :, 3]
    k = 2 * a.grow + 1
    alpha = cv2.dilate(alpha, np.ones((k, k), np.uint8))
    out = np.dstack([np.full_like(alpha, 255)] * 3 + [alpha])
    cv2.imwrite(a.output, out)
    print(f"Wrote {a.output} ({out.shape[1]}x{out.shape[0]}).")


if __name__ == "__main__":
    main()
