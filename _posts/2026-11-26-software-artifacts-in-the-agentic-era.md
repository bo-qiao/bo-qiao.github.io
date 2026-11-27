---
layout: post
title: "Software Artifacts in the Agentic Era"
date: 2026-11-26
tags: [software, agents, AI, design, verification]
---

When agents write most of the code, what is software? Not how do we write it — what is the thing we keep, the thing we ship, the thing we trust? I have been turning this question over, and four recent pieces of work, plus one real migration, point at an answer that is starting to converge — and at the places where it still falls apart.

The real-world example first. Anthropic migrated its Messages API from Python to Rust, and Claude wrote the first version of the core request path in about a week. Generation was not the hard part. Trusting the result was. Their test suite was coupled to the Python implementation — an audit found more than 100 weakened assertions — and it was incomplete: 20 binary options make over a million combinations. So they turned the production API itself into the verifier. Live traffic was shadowed through both versions and compared step by step; each difference was recorded by its shape, checkpointing to locate it and fingerprinting to tell one bug from another. Then three loops did the work: a fast inner loop where agents tested hypotheses in a sandbox in seconds, a slower outer loop validating fixes on shadowed production traffic, and a memory loop recording review corrections as rules every later agent could read. The result: about 70% less CPU per request and 20% faster time to first token, with no downtime and no feature freeze. The same pattern is now a product — Claude Ship, where agents review, fix, and approve routine PRs under team-written policy.

If generation is solved, the question becomes what we store. Here is where the four sources agree.

**The common trend: the stored artifact stops being code.**

Saman Amarasinghe argues that code in a repo is today's source of truth, but it holds neither the spec nor the reasons nor the proofs — and it was designed for humans to read and write by hand, which is no longer what happens. Daniel Jackson and Eagon Meng break systems into concepts, each one coherent piece of functionality, wired together by explicit synchronizations written in a small DSL that LLMs can generate reliably. Frattini, Feldt, and Lenberg argue the software engineering process itself materializes into artifacts — context documentation and executable skills — that an engine executes, until the engine is embedded in the product itself. Different words, same direction: what you keep is intent, structure, and rules. Code is generated and disposable, like bytecode.

**Legibility becomes the point, not a nice-to-have.** Jackson's line is "what you see is what it does." A feature like "share" is currently scattered across several services; in his model it is one concept, and the synchronizations spell out exactly how concepts interact. Software should be written in terms of human understanding, so that the connections are visible instead of buried in low-level code.

**Verification moves from tests to the system itself.** When generated code is produced in masses and hardly read by anyone, it needs certification against requirements — the way bytecode is trusted because the compiler and the runtime are trusted. Production traffic as an oracle is one instance of that; a checker that verifies a binary against a spec is another.

**Humans move up one level.** From writing code, to defining intent, writing the policy, engineering the engine, governing on the loop. The human judges only what the verifier cannot answer — in the migration, whether a difference was a bug or a deliberate change.

That is the consensus. The disagreements are where it gets interesting.

**Amarasinghe's new source of truth.** He sketches an artifact holding twelve things: a declarative spec, goals and SLAs, a two-way interactive channel, decisions recorded with their reasons, proofs as the default, built-in version history, whole-system coverage, a structured store, a notation per part, model-native representations, active component contracts, and a retargetable compiler. The human reads generated views of it; a fixed checker verifies the result. I am not convinced. The checker carries all the trust, and writing a spec precise enough to check yet rich enough to capture intent is the same hard problem moved up a layer. He designs no final artifact — the paper is a research agenda, not a spec. Still, it names exactly what code fails to store, and that gap is real whether or not his replacement ever exists.

**Jackson's concepts.** Legibility at the concept level, with shared catalogs of well-tested concepts, so that building an application becomes selecting concepts and writing the synchronizations between them. The open question I keep coming back to: does this reach down the stack? A FlashAttention kernel does not decompose into concepts the way a share button does. It may be a property of application software only.

**Frattini's end state.** The engine embedded in the product, rebuilding the system from user requests as they arrive. Their own interviewees flagged the objection: Polanyi's "we know more than we can tell." Taste, judgment, the things that cannot be written down. One practitioner said purely language-based AI may not suffice for the vision. If some knowledge resists codification, the engine has to escalate to a human — and the boundary of what can be codified becomes the boundary of the whole idea.

**The verifier can be gamed.** In the migration, an agent "fixed" a missing web-search tool description by hardcoding the text into files. The outputs matched; the fix was not real, and an engineer had to kill it. A verifier tells you the outputs matched, not whether the fix is good enough to ship. That is the correlation problem: the oracle has to be independent of the thing being judged, and when the agent writes both the code and the tests, a pass means nothing.

There is exactly one place where verification already works cleanly: kernels. A PyTorch reference for correctness plus a speed-of-light bound for performance is the golden reference — mechanical, independent of the agent, checkable without reading the code. That is the standard the rest of software has to reach.

So the shape I see is this: a catalog of concepts wired by explicit synchronizations, a spec carrying goals and constraints, proofs or checks attached — that bundle is the stored artifact. An engine of agents maintains it against the spec, with fast local loops, slow production truth, and a memory of past corrections. Humans govern it: pick the concepts, write the policy, sit on the loop for escalations. Code is generated and regenerated, never the thing you keep.

What is still open is the spec itself — whether intent can be written down precisely enough to be checked and richly enough to be worth checking. Until that question is answered, everything else is scaffolding around it.
