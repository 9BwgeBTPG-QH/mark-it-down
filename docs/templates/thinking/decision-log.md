---
title: Decision Log
date:
tags: [decision, log, thinking]
---

![Thinking](https://img.shields.io/badge/Thinking-blue) ![Decision](https://img.shields.io/badge/Decision-orange)

# Decision Log

> [!TIP]
> Document decisions when they are made, not after. Fill in Context and Options first.
> Use `Ctrl+;` to stamp the date and `Ctrl+K` to find related decisions.

---

## Decision Metadata

| Field | Value |
|-------|-------|
| **Date** | [YYYY-MM-DD] |
| **Decision maker** | [Name or team] |
| **Status** | [Proposed / Accepted / Superseded / Deprecated] |
| **Related decisions** | [Link or reference, if any] |

## Context

[What situation or problem prompted this decision? Include relevant background that a future reader would need.]

## Options

| Option | Pros | Cons | Effort |
|--------|------|------|--------|
| **A — [Name]** | [Advantage] | [Disadvantage] | [Low / Medium / High] |
| **B — [Name]** | [Advantage] | [Disadvantage] | [Low / Medium / High] |
| **C — [Name]** | [Advantage] | [Disadvantage] | [Low / Medium / High] |

### Option A — [Name]

[Brief description if the table is not enough]

### Option B — [Name]

[Brief description]

### Option C — [Name]

[Brief description]

> [!NOTE]
> [Any option that was considered and quickly ruled out, with a one-line reason why.]

## Decision Tree

> *Visual overview — delete this section if not needed.*

```mermaid
flowchart TD
    Q([Decision: What approach?])
    Q --> A{Option A}
    Q --> B{Option B}
    Q --> C{Option C}
    A -->|Pros| A1[Low cost]
    A -->|Cons| A2[Slow delivery]
    B -->|Pros| B1[Fast delivery]
    B -->|Cons| B2[High cost]
    C -->|Pros| C1[Balanced]
    C -->|Cons| C2[Complexity]
    C1 --> Y([Chosen])
    style Y fill:#22c55e,color:#fff
```

## Chosen Option

**Option [A/B/C] — [Name]**

## Rationale

[Why this option was selected over the others. Reference specific pros/cons from the table above.]

> [Key quote, data point, or principle that drove the decision]

<details>
<summary>Dissenting opinions or risks accepted</summary>

[Record any disagreements or known trade-offs accepted with this choice.]

</details>

## Review Date

**Revisit by:** [YYYY-MM-DD or trigger event, e.g., "after Q3 results"]

---

*Captured with Mark It Down*
