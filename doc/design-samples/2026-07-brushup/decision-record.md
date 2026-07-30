# July 2026 brush-up — decision record

> Status: **Approved**
>
> Scope: Issue #1661, Phase 0. These values are the production input for
> Issues #1662–#1664; downstream phases may refine semantic token ownership,
> but must not reopen the visual choices recorded here.

## Review metadata

| Field | Recorded value |
|---|---|
| Decision date | `2026-07-30` |
| Decision owner | `repository owner (explicit approval in the #1660 resolve session)` |
| Reviewers | `Codex implementation review; frontend-design; style-guide` |
| Artifact commit | `recorded in the #1661 closeout comment` |
| Artifact URL | `http://127.0.0.1:4173/` |
| Browser and version | `Google Chrome 148.0.7778.96` |
| Operating system | `Linux 6.6.114.1-microsoft-standard-WSL2` |
| Desktop viewport | `1280 × 900 CSS px` |
| Mobile viewport | `390 × 844 CSS px` |
| Device scale factor | `1` |
| Pointer/input | `mouse; keyboard; Chrome hasTouch=1 mobile emulation` |
| OS color scheme | `light → dark live change verified; final production follows browser preference only` |
| OS motion preference | `no-preference + reduce verified` |
| Artifact font state | `5/5 loaded confirmed with FontFaceSet` |
| Forced fallback state | `confirmed` |
| DevTools Rendered Fonts evidence | `CDP CSS.getPlatformFontsForNode; details below` |
| Screenshot directory | [`screenshots/`](./screenshots/) |
| Recommended composite | [`screenshots/composite-recommended-desktop-en.png`](./screenshots/composite-recommended-desktop-en.png), SHA-256 `f52b0fac32c9081358f068f8f340e4c850438bab7af3902e609fc9657bb3cea2` |

## Decision rules

Score each option from **1 (fails)** to **5 (excellent)** against all seven
dimensions. Add a short evidence note; a number without evidence is not a
decision.

| Dimension | Question |
|---|---|
| Distinctiveness | Is this recognizably Mark It Down rather than a generic SaaS landing page? |
| MID fit | Does it reinforce local-first, no-AI, writing-first product character? |
| Readability EN/JA | Does hierarchy, rhythm, and mixed-script text remain comfortable at desktop and mobile? |
| Affordance | Are action, status, focus, and current state unambiguous without hover? |
| AA | Do text, controls, focus, and states meet WCAG AA contrast and remain perceivable? |
| Motion safety | Is feedback useful, touch-independent, at most 300 ms, and safely removed under reduced motion? |
| Font performance | Are the self-hosted asset cost, fallback behavior, and layout stability acceptable? |

AA, motion safety, keyboard/touch access, font load, and horizontal overflow are
**veto gates**. A high total cannot average away a veto failure.

## Score sheet

`n/a` means the axis does not alter font loading; those rows are totaled out of
30. All font choices are totaled out of 35.

| Axis / option | Distinctive | MID fit | EN/JA | Affordance | AA | Motion | Font perf | Total | Evidence note |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| S1 current fallback | 2 | 3 | 4 | 4 | 5 | 5 | 5 | 28/35 | Stable and cheap, but its generic metrics do not mark metadata as an intentional system. |
| S1 Space Mono | 5 | 5 | 4 | 4 | 5 | 5 | 4 | **32/35** | Strong editorial/tool character, clear 400/700 hierarchy, and only 19,016 bytes across two local assets. |
| S1 JetBrains Mono | 3 | 4 | 4 | 4 | 5 | 5 | 3 | 28/35 | Excellent code legibility, but reads as developer tooling and costs 40,480 bytes. |
| S1 Geist Mono | 2 | 4 | 4 | 4 | 5 | 5 | 4 | 28/35 | Neutral and efficient, but visually closest to a generic SaaS system face. |
| S2 current Lora | 4 | 5 | 5 | 4 | 5 | 5 | 5 | **33/35** | Best long-form hierarchy; its serif voice keeps writing—not interface chrome—at the center. |
| S2 Space Mono | 5 | 4 | 3 | 4 | 5 | 5 | 5 | 31/35 | Distinctive but too rigid for long headings and mixed-script wraps. |
| S2 JetBrains Mono | 3 | 4 | 3 | 4 | 5 | 5 | 5 | 29/35 | Legible but makes the page resemble a code product rather than a writing product. |
| S2 Geist Mono | 2 | 4 | 4 | 4 | 5 | 5 | 5 | 29/35 | Clean but removes the editorial contrast that distinguishes headings from UI. |
| S3a soft layered shadow | 2 | 3 | 5 | 4 | 5 | 5 | n/a | 24/30 | Polished but too familiar; depth is visually ambiguous against the warm background. |
| S3a hard 6 px offset | 5 | 5 | 5 | 4 | 5 | 5 | n/a | **29/30** | Gives screenshots and cards a deliberate printed-object hierarchy without blur. |
| S3b current radius/border | 2 | 3 | 5 | 4 | 5 | 5 | n/a | 24/30 | Comfortable but retains the prior soft-SaaS grammar. |
| S3b 3 px radius/solid border | 5 | 5 | 5 | 5 | 5 | 5 | n/a | **30/30** | Sharp frames make interactive and editorial surfaces unambiguous. |
| S3c flat cream | 4 | 5 | 5 | 5 | 5 | 5 | n/a | **29/30** | Quiet enough for long reading while preserving the established paper tone. |
| S3c 24 px grid | 5 | 4 | 3 | 4 | 5 | 5 | n/a | 26/30 | Memorable, but competes with paragraph rhythm and becomes noisy behind JA text. |
| S4 extension `#60a5fa` | 4 | 5 | 5 | 5 | 5 | 5 | n/a | **29/30** | Connects the public site to the extension and remains AA on the selected dark surfaces. |
| S4 signal blue `#4d9fff` | 3 | 4 | 5 | 5 | 5 | 5 | n/a | 27/30 | Clear, but duplicates the role of the existing extension blue without brand continuity. |
| S4 warm amber `#eab464` | 4 | 3 | 5 | 4 | 5 | 5 | n/a | 26/30 | Warm and readable, but weakens action/state distinction in the cream/ink system. |
| S5a status pill | 2 | 3 | 5 | 4 | 5 | 5 | n/a | 24/30 | Familiar, but looks like a generic product badge. |
| S5a unboxed status | 5 | 5 | 5 | 4 | 5 | 5 | n/a | **29/30** | Top/bottom rules preserve status semantics without adding another capsule. |
| S5b CTA pill | 2 | 3 | 5 | 5 | 5 | 5 | n/a | 25/30 | Accessible but conflicts with the sharp framed composition. |
| S5b CTA 4 px corner | 5 | 5 | 5 | 5 | 5 | 5 | n/a | **30/30** | Strong action affordance and coherent geometry at desktop and touch sizes. |
| S6a 120 ms press | 5 | 5 | 5 | 5 | 5 | 5 | n/a | **30/30** | Physical, immediate feedback works for pointer, keyboard, and touch. |
| S6a 220 ms glow | 4 | 3 | 5 | 4 | 5 | 5 | n/a | 26/30 | Visible but introduces a luminous grammar better reserved for dark-theme focus. |
| S6b system-only | 4 | 5 | 5 | 5 | 5 | 5 | n/a | **29/30** | Final owner decision: follows the browser without adding site chrome, persistence, or a second preference surface. |
| S6b explicit 3 options | 4 | 4 | 5 | 3 | 5 | 5 | n/a | 26/30 | States are clear, but the control duplicates browser settings and adds navigation density plus stored-state complexity. |
| S6b compact cycle | 3 | 4 | 5 | 3 | 5 | 5 | n/a | 25/30 | Compact, but hides the available states and makes the next click harder to predict. |

## Decisions and rationale

### S1 — mono surfaces

- Chosen option: **Space Mono**
- Why it won:
  - Version, shortcut, status, changelog, Markdown, and code samples gain one
    recognizable metadata voice without moving body copy into monospace.
  - Mixed EN/JA evidence showed Space Mono for Latin glyphs and the documented
    system fallback for Japanese, with no overflow at either viewport.
- Rejected options and exact reason:
  - Current fallback: stable but visually generic and weight hierarchy depends
    on the client platform.
  - JetBrains Mono: code-first personality and a 40,480-byte variable asset.
  - Geist Mono: competent but too neutral to create a distinct MID metadata layer.
- Exact production font token and fallback:
  - `--font-mono: var(--font-space-mono), ui-monospace, SFMono-Regular, monospace`
- Asset(s):
  - `fonts/space-mono-latin-400.woff2`, weight 400, 9,464 bytes
  - `fonts/space-mono-latin-700.woff2`, weight 700, 9,552 bytes
- Desktop screenshot: `screenshots/s1-space-desktop-en.png`
- Mobile screenshot: `screenshots/s1-space-mobile-ja.png`
- Veto checks: pass — AA, zero overflow, both assets loaded, Latin/JA fallback verified.

### S2 — heading typography

- Chosen option: **current Lora**
- Why it won:
  - Editorial hierarchy reinforces a writing environment instead of a code tool.
  - EN and JA headings retained readable wraps at 1280 and 390 CSS px.
- Rejected options and exact reason:
  - Space Mono: distinctive but too rigid and dense for long headings.
  - JetBrains Mono: developer-tool signal overpowers the writing-first message.
  - Geist Mono: removes the serif/sans contrast without adding product character.
- Exact production heading token and fallback:
  - `--font-heading: var(--font-lora), Georgia, serif`
- Desktop screenshot: `screenshots/s2-lora-desktop-en.png`
- Mobile screenshot: `screenshots/s2-lora-mobile-ja.png`
- Veto checks: pass — AA, zero overflow, Lora loaded, fallback path verified.

### S3a — shadow

- Chosen option: **hard 6 px offset**
- Why it won: creates a printed-object hierarchy without blur, measured with
  radius and background held constant.
- Rejected option and exact reason: soft layered shadow is readable but retains
  the prior generic floating-card grammar.
- Exact production token:
  - comparison value `--shadow-card: 6px 6px 0 #2d2a26`; production splits
    this into semantic surface tokens in Phase 2.
- Desktop screenshot: `screenshots/s3a-hard-desktop-en.png`
- Mobile screenshot: `screenshots/s3a-hard-mobile-ja.png`
- Veto checks: pass — focus visible, no clipping, text unaffected.

### S3b — radius and border

- Chosen option: **3 px radius / 2 px solid border**
- Why it won: gives frames and controls definite edges with shadow/background
  held constant.
- Rejected option and exact reason: current 10–24 px radii preserve the
  rounded-card language this brush-up is meant to replace.
- Exact production tokens:
  - `--radius-card: 3px`
  - `--border-card: 2px solid #2d2a26`
- Desktop screenshot: `screenshots/s3b-sharp-desktop-en.png`
- Mobile screenshot: `screenshots/s3b-sharp-mobile-ja.png`
- Veto checks: pass — focus ring distinct; light control border was raised to
  `#81796e` for 3.68:1 adjacent contrast.

### S3c — background

- Chosen option: **flat cream**
- Why it won: preserves paper warmth without competing with long-form text.
- Rejected option and exact reason: the 24 px grid is distinctive but creates
  texture noise behind paragraphs and mixed-script text.
- Exact production tokens:
  - `--page-background: #f2ede4`
  - `--grid-size: none`
- Desktop screenshot: `screenshots/s3c-cream-desktop-en.png`
- Mobile screenshot: `screenshots/s3c-cream-mobile-ja.png`
- Veto checks: pass — body contrast retained; no texture or image cost.

### S4 — dark accent

- Chosen option: **extension `#60a5fa`**
- Why it won: connects action and state to the extension's established blue
  while remaining distinct on the dark ink surfaces.
- Rejected options and exact reason:
  - Signal blue `#4d9fff`: similar utility without the extension identity.
  - Warm amber `#eab464`: blends into the cream/ink palette and weakens state contrast.
- Exact production tokens:
  - `--dark-accent: #60a5fa`
  - `--dark-accent-soft: rgb(96 165 250 / 18%)`
- Desktop screenshot: `screenshots/s4-extension-desktop-en.png`
- Mobile screenshot: `screenshots/s4-extension-mobile-ja.png`
- Measured contrast:
  - `#60a5fa` on composite `#15191f`: **6.94:1**
  - `#60a5fa` on planned dark root `#0a0a09`: **7.79:1**
- Veto checks: pass — normal text, status, and focus exceed AA; state is not color-only.

### S5a — status badge

- Chosen option: **unboxed label**
- Why it won: rules and text remain scannable as status without adding a generic capsule.
- Rejected option and exact reason: pill is familiar but visually collapses
  status into the same shape as actions and tags.
- Exact production tokens:
  - `--status-radius: 0`
  - `--status-border: 2px solid currentColor` on block-start/block-end
- Desktop screenshot: `screenshots/s5a-label-desktop-en.png`
- Mobile screenshot: `screenshots/s5a-label-mobile-ja.png`
- Veto checks: pass — status includes text and rule shape; AA passes.

### S5b — CTA shape

- Chosen option: **4 px corner**
- Why it won: strong rectangular action affordance matches the sharp frame system.
- Rejected option and exact reason: pill is accessible but belongs to the
  rounded grammar being replaced.
- Exact production tokens:
  - `--cta-radius: 4px`
  - `--cta-min-height: 52px`
- Desktop screenshot: `screenshots/s5b-angular-desktop-en.png`
- Mobile screenshot: `screenshots/s5b-angular-mobile-ja.png`
- Veto checks: pass — ≥44 px target, visible focus, AA, and touch activation.

### S6a — motion grammar

- Chosen option: **120 ms press**
- Why it won:
  - Pointer feedback is immediate and spatially consistent with the hard shadow.
  - Native keyboard and touch activation replayed the same selected grammar.
  - Reduced motion removes transform and duration while retaining instant state feedback.
- Rejected option and exact reason: glow is clear but introduces a luminous
  grammar reserved for dark-theme focus and takes longer to resolve.
- Exact production tokens:
  - `--motion-duration: 120ms`
  - `--motion-easing: ease-out`
  - `--motion-transform-or-shadow: translate(2px, 3px)` with a corresponding
    hard-shadow reduction
- Desktop screenshot: `screenshots/s6a-press-desktop-en.png`
- Mobile screenshot: `screenshots/s6a-press-mobile-ja.png`
- Veto checks: pass — 120 ms, hover guarded, reduced-motion override, focus parity.

### S6b — theme information architecture

- Chosen option: **browser preference only**

| Concern | Production decision |
|---|---|
| Effective theme | CSS `@media (prefers-color-scheme: dark)` |
| First paint | CSS applies the correct scheme before client code runs |
| Live browser changes | The media query is reevaluated by the browser |
| Browser chrome | Paired `theme-color` metadata uses light/dark media queries |
| Previous `mid-theme` value | Ignored |

The three-option selector was removed because it duplicated a browser setting
and added storage, bootstrap, hydration, and cross-tab behavior to a reading
site. A compact cycle control was also rejected because it hid the available
states and made the next result harder to predict.

- Desktop screenshot:
  `../../audit/screenshots/phase3-dark/matrix/dark/en-index.png`
- Mobile screenshot:
  `../../audit/screenshots/phase3-dark/mobile/ja-home.png`
- Veto checks: pass — both schemes retain AA contrast, reduced-motion behavior,
  and zero horizontal overflow.

## Phase 2 production ownership addendum

Recorded on `2026-07-30` before Phase 3 color/theme work.

| Layer | Production ownership |
|---|---|
| Shape | `--radius-card/control/inline/media/status/action/pill/circle` are theme-independent and must not be overridden by Phase 3. |
| Layout rhythm | Existing `--spacing-*` values are retained and theme-independent. |
| Type hierarchy | Lora headings, Raleway body/navigation, Space Mono metadata/code, sizes, line heights, and letter spacing are theme-independent. |
| Motion | `120ms ease-out` press timing and `translate(2px, 3px)` grammar are theme-independent. |
| Effects | Card, media, action, focus, floating, and decorative `--shadow-*` tokens are semantic theme effects; Phase 3 may override their rendering without changing role or shape. |
| Color | Background, text, accent, and border colors are theme-owned and may be overridden only after the Phase 3 hard-coded-color audit. |

The complete selector-level radius/shadow classification and exception
allowlist is
[`../../audit/phase2-shape-shadow-allowlist-2026-07-30.md`](../../audit/phase2-shape-shadow-allowlist-2026-07-30.md).

## Phase 3 browser-preference revision

After the first Phase 3b production review on `2026-07-30`, the repository owner
removed the website theme control. The production site now follows the browser
preference directly.

| Event / condition | Effective theme | Site action |
|---|---|---|
| boot with browser Light | Light | CSS light tokens apply |
| boot with browser Dark | Dark | CSS dark media-query tokens apply |
| browser changes Light -> Dark | Dark | native media-query reevaluation |
| browser changes Dark -> Light | Light | native media-query reevaluation |
| JavaScript unavailable | same as browser preference | CSS remains authoritative |
| stale `mid-theme` key exists | same as browser preference | the old value is ignored |

### Initial paint

- Light tokens are the root default; dark tokens apply inside
  `@media (prefers-color-scheme: dark)`.
- EN/JA root layouts and static template viewers declare
  `color-scheme: light dark` and media-specific `theme-color` metadata.
- Client code does not write a theme attribute or render a theme selector.

## Candidate token ledger

These are comparison values, not production decisions.

### Current control copied from `app/original.css`

```css
--bg-primary: #f2ede4;
--bg-secondary: #ebe6dc;
--bg-accent: #e4ded4;
--bg-card: #faf7f2;
--text-primary: #2d2a26;
--text-secondary: #5c5854;
--text-muted: #696460;
--accent-primary: #6b4e37;
--accent-hover: #5a4030;
--accent-light: rgb(107 78 55 / 8%);
--border-primary: #c8c0b4;
--border-subtle: #e4ded4;
--border-card: rgb(43 43 43 / 6%);
--shadow-card:
  0 2px 8px rgb(107 78 55 / 5%),
  0 1px 2px rgb(107 78 55 / 3%);
--shadow-screenshot:
  0 16px 48px rgb(43 43 43 / 12%),
  0 8px 16px rgb(107 78 55 / 8%);
--radius-sm: 6px;
--radius-md: 10px;
--radius-lg: 16px;
--radius-xl: 24px;
--transition-fast: 150ms ease-out;
--transition-base: 250ms ease-out;
```

### Experimental values

| Axis | Option | Exact comparison value |
|---|---|---|
| S1 | Space Mono | local 400/700 WOFF2 + `Yu Gothic`, `Hiragino Kaku Gothic ProN`, monospace |
| S1 | JetBrains Mono | local 100–800 variable WOFF2 + same JA fallback |
| S1 | Geist Mono | local 100–900 variable WOFF2 + same JA fallback |
| S2 | Current Lora | local 400–700 variable WOFF2 + Georgia, serif |
| S3a | Hard offset | `box-shadow: 6px 6px 0 #2d2a26` |
| S3b | Sharp frame | `border: 2px solid #2d2a26; border-radius: 3px` |
| S3c | Grid | two 1 px `rgb(107 78 55 / 14%)` linear gradients at `24px 24px` |
| S4 | Extension | accent `#60a5fa`; soft `rgb(96 165 250 / 18%)` |
| S4 | Signal blue | accent `#4d9fff`; soft `rgb(77 159 255 / 18%)` |
| S4 | Warm amber | accent `#eab464`; soft `rgb(234 180 100 / 18%)` |
| S5a | Status pill | `border-radius: 999px` |
| S5a | Unboxed status | `border-radius: 0`; 2 px top/bottom current-color rules |
| S5b | CTA pill | `border-radius: 999px`; `min-height: 52px` |
| S5b | CTA angular | `border-radius: 4px`; `min-height: 52px` |
| S6a | Press | translate `2px 3px`; `120ms ease-out` |
| S6a | Glow | `scale(.98)` + focus-like glow; transform 150 ms, shadow 220 ms, ease-out |
| S6b | System-only | visible effective state, no preference control |
| S6b | Explicit options | native radio group: System / Light / Dark |
| S6b | Compact cycle | native button cycling System → Light → Dark with current and next state in accessible name |

## Font and layout verification

| Check | Self-hosted state | Forced-fallback state | Evidence |
|---|---|---|---|
| Lora control loads | `pass` | `n/a` | CDP reports custom `Lora` on EN S2 heading |
| Raleway control loads | `pass` | `n/a` | CDP reports custom `Raleway Thin` on body |
| Space Mono 400/700 loads | `pass` | `n/a` | CDP reports custom `Space Mono` on S1 and S2 |
| JetBrains Mono variable loads | `pass` | `n/a` | CDP reports custom `JetBrains Mono` on S1 and S2 |
| Geist Mono variable loads | `pass` | `n/a` | CDP reports custom `Geist Mono` on S1 and S2 |
| JA glyphs use documented fallback | `pass` | `pass` | mixed code sample: custom Space Mono for 69 Latin glyphs + WenQuanYi Zen Hei for 4 JA glyphs; forced path uses Liberation Mono + WenQuanYi Zen Hei |
| No remote font request | `pass` | `pass` | Resource Timing reports zero non-origin resources |
| Font-load layout stability | `pass with note` | `pass` | measured CLS 0.035 desktop / 0.072 mobile (both below 0.1 good threshold); forcing fallback added no CLS |
| 1280 px no horizontal overflow | `pass` | `pass` | measured document overflow `0 px` |
| 390 px no horizontal overflow | `pass` | `pass` | measured document overflow `0 px` |

## Automated interaction verification

Run on 2026-07-29 with Chrome 148.0.7778.96:

- Ten axes and 26 options present; duplicate IDs `0`; orphan labels `0`.
- Every visible choice target is at least `44 × 44 CSS px`.
- Keyboard radio navigation moved S1 from control to Space Mono with
  `ArrowRight`; the associated 3 px focus ring remained visible.
- Chrome `hasTouch=1` mobile input delivered `pointerdown`, `touchstart`,
  `pointerup`, `touchend`, and `click` to the S6a sample button.
- Native touch and keyboard clicks replay the selected grammar: press reached
  `translate(2px, 3px)` at 120 ms; glow reached the documented scale/glow
  state at 220 ms.
- Independent OS `reduce` context reported `0` animations, `transform: none`,
  and `0.001ms` transition duration. The non-moving shadow state may change
  instantly to preserve feedback.
- S6b production follows a live OS color-scheme change from Light to Dark with
  no site-visible control, storage access, or bootstrap script.
- Static S6a PNG files do not prove elapsed-time behavior. The live checks
  above and a human review of the Replay control are required for selection.

## Final gate

- [x] All score-sheet cells and evidence notes are complete.
- [x] All ten decisions have chosen and rejected rationale.
- [x] Exact adopted tokens and font asset paths are recorded.
- [x] EN desktop and JA mobile screenshots exist for every option.
- [x] Font loaded and forced-fallback paths are verified.
- [x] Keyboard, touch, focus-visible, reduced-motion, and AA veto gates pass.
- [x] S6b system-only initial-paint and browser-change contracts are explicit.
- [x] The approved values have been copied to the canonical #1660 plan before
      Phase 1 begins.
