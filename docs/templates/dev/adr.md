---
title: Architecture Decision Record
date:
tags: [adr, architecture, decision]
---

![Dev](https://img.shields.io/badge/Dev-blue) ![Architecture](https://img.shields.io/badge/Architecture-orange)

# ADR-[Number]: [Decision Title]

> [!TIP]
> One ADR per significant technical decision. Fill in Status, Context, and Decision first.
> Use `Ctrl+Shift+P` to insert code blocks for technical details.

## Status

**[Proposed | Accepted | Deprecated | Superseded]**

> [!NOTE]
> If superseded, link to the replacing ADR: Superseded by [ADR-XXX](./adr-xxx.md)

## Context

[Describe the situation and the forces at play. What is the problem or opportunity? What constraints exist?]

## Decision

[State the decision clearly and concisely. Use active voice.]

> [!TIP]
> A good decision statement starts with "We will..." and is one to three sentences.

## Consequences

### Positive

- **Improved performance** by reducing database round-trips from 5 to 1
- Simpler mental model for new team members
- Aligns with existing infrastructure investments

### Negative

- [Negative consequence]
- [Negative consequence]

### Neutral

- [Trade-off or observation that is neither clearly positive nor negative]

## Decision Tree

> *Visual overview — delete this section if not needed.*

```mermaid
flowchart TD
    Q([Problem: How to solve X?])
    Q --> A{Option A}
    Q --> B{Option B}
    Q --> C{Option C}
    A -->|Pro| A1[Advantage]
    A -->|Con| A2[Disadvantage]
    B -->|Pro| B1[Advantage]
    B -->|Con| B2[Disadvantage]
    C -->|Pro| C1[Advantage]
    C -->|Con| C2[Disadvantage]
    A1 --> Y([Chosen: Option A])
    style Y fill:#22c55e,color:#fff
```

## Alternatives Considered

| Option | Pros | Cons |
|--------|------|------|
| [Option A] | [Advantages] | [Disadvantages] |
| [Option B] | [Advantages] | [Disadvantages] |
| [Option C] | [Advantages] | [Disadvantages] |

<details>
<summary>Additional context on alternatives</summary>

[Longer discussion of why alternatives were rejected, benchmarks, proof-of-concept results, or links to relevant research]

</details>

---

*Captured with Mark It Down*
