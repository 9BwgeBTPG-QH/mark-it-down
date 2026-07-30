#!/usr/bin/env bash

set -eu

artifact_root="$(cd "$(dirname "$0")" && pwd)"
port="${MID_DESIGN_LAB_PORT:-4173}"
server_log="$(mktemp)"
server_pid=""

cleanup() {
  if [ -n "$server_pid" ]; then
    kill "$server_pid" 2>/dev/null || true
  fi
  rm -f "$server_log"
}
trap cleanup EXIT INT TERM

if command -v google-chrome >/dev/null 2>&1; then
  chrome_bin="$(command -v google-chrome)"
elif command -v chromium >/dev/null 2>&1; then
  chrome_bin="$(command -v chromium)"
else
  echo "Error: google-chrome or chromium is required." >&2
  exit 1
fi

mkdir -p "$artifact_root/screenshots"

capture_matrix() {
  printf '%s\n' \
    "s1 control space jetbrains geist" \
    "s2 lora space jetbrains geist" \
    "s3a soft hard" \
    "s3b current sharp" \
    "s3c cream grid" \
    "s4 extension blue amber" \
    "s5a pill label" \
    "s5b pill angular" \
    "s6a press glow" \
    "s6b system segmented cycle"
}

# Remove only files this script owns. This prevents stale images from making a
# partial or failed run look complete while preserving any manually named PNG.
while read -r axis variants; do
  for variant in $variants; do
    rm -f -- \
      "$artifact_root/screenshots/$axis-$variant-desktop-en.png" \
      "$artifact_root/screenshots/$axis-$variant-mobile-ja.png"
  done
done < <(capture_matrix)

python3 -m http.server "$port" --bind 127.0.0.1 --directory "$artifact_root" \
  >"$server_log" 2>&1 &
server_pid="$!"

ready="false"
attempt=0
while [ "$attempt" -lt 30 ]; do
  if curl --silent --fail "http://127.0.0.1:$port/" >/dev/null; then
    ready="true"
    break
  fi
  attempt=$((attempt + 1))
  sleep 0.1
done

if [ "$ready" != "true" ]; then
  echo "Error: local artifact server did not start." >&2
  exit 1
fi

capture() {
  axis="$1"
  variant="$2"
  language="$3"
  viewport="$4"
  window_size="$5"
  output="$artifact_root/screenshots/$axis-$variant-$viewport-$language.png"
  url="http://127.0.0.1:$port/?capture=1&axis=$axis&variant=$variant&lang=$language&viewport=$viewport"

  "$chrome_bin" \
    --headless=new \
    --disable-gpu \
    --disable-dev-shm-usage \
    --force-device-scale-factor=1 \
    --hide-scrollbars \
    --no-first-run \
    --no-default-browser-check \
    --virtual-time-budget=1200 \
    --window-size="$window_size" \
    --screenshot="$output" \
    "$url" >/dev/null 2>&1

  if [ ! -s "$output" ]; then
    echo "Error: screenshot was not created: $output" >&2
    exit 1
  fi
}

generated_count=0
while read -r axis variants; do
  for variant in $variants; do
    capture "$axis" "$variant" "en" "desktop" "1280,900"
    generated_count=$((generated_count + 1))
    capture "$axis" "$variant" "ja" "mobile" "390,844"
    generated_count=$((generated_count + 1))
  done
done < <(capture_matrix)

if [ "$generated_count" -ne 52 ]; then
  echo "Error: expected 52 screenshots, created $generated_count." >&2
  exit 1
fi

echo "Created $generated_count verified screenshots in $artifact_root/screenshots"
