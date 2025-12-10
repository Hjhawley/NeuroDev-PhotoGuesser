#!/usr/bin/env python3
import argparse
import os
from PIL import Image


def convert_directory(directory, quality=100, delete_originals=False):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith((".jpg", ".jpeg", ".png")):
                src_path = os.path.join(root, file)
                dst_path = os.path.splitext(src_path)[0] + ".webp"
                try:
                    img = Image.open(src_path)
                    if img.mode in ("RGBA", "LA"):
                        img = img.convert("RGBA")
                    else:
                        img = img.convert("RGB")

                    # Resize if larger than 1024x1024
                    max_size = (1024, 1024)
                    img.thumbnail(max_size, Image.Resampling.LANCZOS)

                    img.save(dst_path, "webp", quality=quality)
                    print(f"Converted: {src_path} -> {dst_path}")
                    if delete_originals:
                        os.remove(src_path)
                        print(f"Deleted original: {src_path}")

                except Exception as e:
                    print(f"Failed: {src_path}: {e}")


def main():
    parser = argparse.ArgumentParser(
        description="Batch convert JPG/JPEG to WebP")
    parser.add_argument(
        "folder",
        nargs="?",
        default="./photos",
        help="Root folder containing images (default: /images)",
    )
    parser.add_argument("--quality", type=int, default=100,
                        help="WebP quality (0-100)")
    parser.add_argument(
        "--delete-originals",
        action="store_true",
        help="Delete JPG/JPEG after conversion",
    )
    args = parser.parse_args()
    convert_directory(
        args.folder, quality=args.quality, delete_originals=args.delete_originals
    )


if __name__ == "__main__":
    main()
