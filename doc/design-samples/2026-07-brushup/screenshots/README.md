# Screenshot evidence

Run `../capture-screenshots.sh` from any working directory to create:

- one `1280 × 900` English desktop screenshot for every option;
- one `390 × 844` Japanese mobile screenshot for every option.

The expected total is 52 PNG files. Names follow:

```text
<axis>-<variant>-<viewport>-<language>.png
```

The capture script deletes only these exact, matrix-owned filenames before a
run and verifies every replacement is non-empty. This prevents stale PNGs from
turning a partial capture into a false 52-file success.

Screenshots are evidence inputs for `../decision-record.md`; generation does
not imply that an option has been approved.
