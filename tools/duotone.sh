#!/usr/bin/env bash
# duotone.sh: grade a video or image in the site's blue (#1A0DAB -> paper #F4F2ED)
# and export web-ready files.
#
# Usage:
#   ./duotone.sh input.mov ../site/assets/video/lepotager      -> .mp4 + .webm + .jpg poster
#   ./duotone.sh photo.jpg ../site/assets/img/lamain-photo      -> .jpg
#
# Needs ffmpeg (brew install ffmpeg / apt install ffmpeg).
set -euo pipefail
IN="$1"; OUT="$2"

# dark -> blue (26,13,171), light -> paper (244,242,237)
GRADE="format=gray,format=rgb24,eq=contrast=1.15,lutrgb=r='26+(244-26)*val/255':g='13+(242-13)*val/255':b='171+(237-171)*val/255'"

case "${IN,,}" in
  *.jpg|*.jpeg|*.png|*.webp)
    ffmpeg -y -i "$IN" -vf "scale='min(2000,iw)':-2,$GRADE" -q:v 3 "$OUT.jpg"
    ;;
  *)
    # 1280 px wide, no sound, loop-friendly, small
    ffmpeg -y -i "$IN" -an -vf "scale=1280:-2,fps=30,$GRADE" \
      -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart "$OUT.mp4"
    ffmpeg -y -i "$IN" -an -vf "scale=1280:-2,fps=30,$GRADE" \
      -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 "$OUT.webm"
    ffmpeg -y -ss 1 -i "$OUT.mp4" -frames:v 1 -q:v 3 "$OUT.jpg"
    ;;
esac
echo "Done: $OUT.*"
