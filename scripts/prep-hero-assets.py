from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

BRAND = Path(__file__).resolve().parents[1] / "public" / "images" / "brand"


def flood_transparent(arr: np.ndarray) -> np.ndarray:
    h, w = arr.shape[:2]
    rgb = arr[:, :, :3]
    dark = (rgb[:, :, 0] < 30) & (rgb[:, :, 1] < 30) & (rgb[:, :, 2] < 40)
    visited = np.zeros((h, w), dtype=bool)
    q: deque[tuple[int, int]] = deque()

    edge = [(x, 0) for x in range(w)] + [(x, h - 1) for x in range(w)]
    edge += [(0, y) for y in range(h)] + [(w - 1, y) for y in range(h)]
    for x, y in edge:
        if dark[y, x] and not visited[y, x]:
            visited[y, x] = True
            q.append((x, y))

    while q:
        x, y = q.popleft()
        arr[y, x, 3] = 0
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h and dark[ny, nx] and not visited[ny, nx]:
                visited[ny, nx] = True
                q.append((nx, ny))
    return arr


def clear_center(arr: np.ndarray, radius: int = 188) -> np.ndarray:
    h, w = arr.shape[:2]
    yy, xx = np.ogrid[:h, :w]
    cx, cy = w // 2, h // 2
    hole = (xx - cx) ** 2 + (yy - cy) ** 2 <= radius * radius
    arr[hole, 3] = 0
    return arr


def make_zodiac() -> None:
    src = Image.open(BRAND / "zodiac-wheel.png").convert("RGBA")
    arr = np.array(src)
    arr = flood_transparent(arr)
    arr = clear_center(arr)
    out = Image.fromarray(arr, "RGBA")
    alpha = out.split()[-1].filter(ImageFilter.GaussianBlur(radius=0.8))
    out.putalpha(alpha)
    dest = BRAND / "zodiac-wheel.png"
    out.save(dest)
    print("wrote", dest, out.size, out.mode)


def make_portrait() -> None:
    banner = Image.open(BRAND / "banner.jpeg").convert("RGB")
    cx, cy, r = 190, 445, 46
    face = banner.crop((cx - r, cy - r, cx + r, cy + r)).resize((512, 512), Image.Resampling.LANCZOS)
    mask = Image.new("L", (512, 512), 0)
    ImageDraw.Draw(mask).ellipse((8, 8, 504, 504), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=1.4))
    out = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
    out.paste(face, mask=mask)
    dest = BRAND / "portrait.png"
    out.save(dest)
    print("wrote", dest, out.size)


if __name__ == "__main__":
    make_zodiac()
    make_portrait()
    print("done")
