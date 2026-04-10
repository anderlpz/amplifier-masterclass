---
title: "Appendix: Research Methodology"
chapter: 13
blocks:
  - type: prose
  - type: audio
    status: stub
---

# Appendix: Research Methodology

The facts in this document were established through a structured, multi-pass investigation of the Amplifier source code using a method called Parallax Discovery. Seven independent investigators across four teams each examined different aspects of the codebase. Their findings were reconciled into a single 805-line document. Each claim is backed by at least two independent confirmations with file-and-line evidence. Sources: `amplifier-core` and `amplifier-foundation`.

**37 verified claims.** Each confirmed by two or more investigators with file-and-line evidence. These are the facts throughout Sections 1-12.

**4 identified discrepancies.** Cases where investigators reached different conclusions. Documented with conflicting evidence and impact assessment. None affected the architectural claims in this document.

**8 consolidated unknowns.** Questions the investigation couldn't answer from source code alone, areas requiring runtime tracing. Prioritized and documented.

---

## Presentation Slides

### Slide 1: How these facts were established
- 7 independent investigators across 4 teams
- Each team examined a different aspect of the codebase
- 37 verified claims, each confirmed by 2+ investigators with file-and-line evidence
- 4 identified discrepancies, documented with conflicting evidence
- 8 consolidated unknowns, documented for future investigation
- 805-line reconciliation doc: the sole source of facts for this document

---

## Speaker Notes

### Slide 1
Optional slide; include if the audience cares about methodology. Key: this wasn't one pass. It was structured multi-pass investigation with independent teams. The reconciliation step surfaces disagreements, which point to genuinely subtle parts of the code. The 805-line reconciliation document is the sole source of facts. Don't linger. It's a trust anchor, not a feature.