"""Pack the reviewed revision 7 portraits for the 48px header portrait (Pillow required)."""

import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "output/imagegen/face-motion-v7"
OUTPUT = ROOT / "public/ask-ai"
CELL = 96  # Supports the 48px header portrait at 2x DPR.

frames = json.loads((SOURCE / "manifest.json").read_text())["frames"]
assert len(frames) == 57
assert len({frame["key"] for frame in frames}) == 57
OUTPUT.mkdir(parents=True, exist_ok=True)
atlas = Image.new("RGBA", (CELL * 8, CELL * 8))
for index, frame in enumerate(frames):
    # Use the exact fixed crop and transparency shown in the accepted review.
    with Image.open(SOURCE / "preview" / f"{frame['code']}.webp") as source:
        assert source.size == (656, 656)
        cell = source.convert("RGBA").resize((CELL, CELL), Image.Resampling.LANCZOS)
    atlas.paste(cell, ((index % 8) * CELL, (index // 8) * CELL))
    if frame["key"] == "center":
        cell.save(OUTPUT / "portrait.webp", quality=93, method=6)
atlas.save(OUTPUT / "portrait-atlas.webp", quality=93, method=6)
print(f"Packed {len(frames)} revision 7 frames at {CELL}px per cell.")
