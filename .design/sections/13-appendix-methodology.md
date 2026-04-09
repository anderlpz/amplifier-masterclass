# Appendix: Research Methodology

The facts in this document were established through structured investigation of the Amplifier source code.

## Approach

The investigation used Parallax Discovery, a multi-agent, multi-pass approach to codebase analysis. Rather than one investigator tracing through code once, multiple independent investigators examined the same codebase from different angles, and findings were reconciled afterward.

The advantage: when two investigators reach the same conclusion through different paths, confidence is high. When they disagree, the disagreement points to genuine ambiguity, places where code diverges from documentation or where behavior is subtle.

## Structure

Four teams (seven agents total) each examined a different aspect:

- Kernel internals: Coordinator, HookRegistry, Module Loader, session lifecycle.
- Module system: contracts, loading order, discovery mechanisms, six types.
- Event and hook system: namespaces, dispatch, action precedence cascade.
- Foundation and bundles: preparation pipeline, callbacks, composition, @mentions.

Each team produced findings with file-and-line evidence. Not "the Coordinator is a Rust struct" but "defined in `amplifier-core/src/coordinator.rs` at line 47, exposed through PyO3 at line 112."

## Results

**37 verified claims.** Each confirmed by two or more investigators with file-and-line evidence. These are the facts throughout Sections 1–12.

**4 identified discrepancies.** Cases where investigators reached different conclusions. Documented with conflicting evidence and impact assessment. None affected the architectural claims in this document.

**8 consolidated unknowns.** Questions the investigation couldn't answer from source code alone, areas requiring runtime tracing. Prioritized and documented.

## Source material

- **amplifier-core**: Python + Rust, with PyO3 bridging.
- **amplifier-foundation**: Python.

Full reconciliation: 805 lines of verified findings, cross-references, and evidence trails.

---

## Presentation Slides

### Slide 1: How these facts were established
- Multi-agent investigation: 7 agents across 4 independent teams
- Each team examined a different aspect of the codebase
- Every finding backed by file-and-line evidence
- 37 verified claims, 4 discrepancies, 8 open questions

---

## Speaker Notes

### Slide 1
Optional slide; include if the audience cares about methodology. Key: this wasn't one pass. It was structured multi-pass investigation with independent teams. The reconciliation step is what matters: it surfaces disagreements, which point to genuinely subtle parts of the code. If someone asks to see the full evidence, the reconciliation document is available. Don't linger. It's a trust anchor, not a feature.
