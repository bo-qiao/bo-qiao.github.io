---
layout: post
title: "Memory Is the New Switching Cost"
date: 2026-11-16
tags: [agents, AI, memory, portability]
---

I use several personal agents now, and I have noticed something about them: the longer I stay with one, the harder it becomes to leave. It is not the model that keeps me there. The models are close enough to each other, and they keep changing anyway. What keeps me is the memory — everything the agent has learned about me since I started using it.

That adherence, I think, is the defining property of this kind of application. Personal agents are going to be very popular, and the reason people will stick to one is mostly memory. There is a second part — the agent starts doing things for me without being asked, in the way I expect — but memory is the larger part. Action can be re-taught in days. A long, accurate memory of a person cannot.

It helps to be precise about what memory means here. The large language model underneath is, in principle, the same for everyone. My agent does not retrain that model on me. Instead it keeps a separate personal layer on top: my chat history, facts and preferences distilled from repeated conversation, summaries of who I am and how I like answers, and the retrieval machinery — embeddings and indexes — that lets it find the relevant memory quickly. Each time I talk to it, the relevant pieces get pulled back in. When I say I prefer concise, direct answers, it saves that as context and uses it next time.

None of that layer lives with me. It lives in the vendor's store, in the vendor's format.

This is an old problem wearing new clothes. I have felt the same stickiness before. Moving from Android to iPhone means reinstalling apps, redoing setup, moving data — enough overhead that most people just stay. Moving from a Mac to a Windows PC is the same story: software, files, workflows, shortcuts. The overhead of transfer is what makes people stick.

The difference is depth. A phone transfer moves objects. An agent transfer has to move understanding — and understanding has timestamps, scope, and contradictions. "Prefers X" is not enough; I need "said in March, changed in August, and only for one project." A summary drops all of that.

And right now, there is no way to move it at all. As of late 2026, no major assistant offers a structured export of its memory that another assistant can import as memory. What exists is thinner than that. You can export chat transcripts — a ZIP of conversations — but that is a dump of what was said, not the distilled facts, their timestamps, or what replaced them. Since March 2026, Claude and Gemini will accept a pasted summary of what another assistant remembers. That is one-way, one-time, and lossy: a summary, not a memory object.

There is a transport protocol, MCP, but it standardizes how an application calls a memory server, not what a memory record contains. There are developer memory layers — Mem0, Letta, Zep — but they are portable only if you build your own agent on top of them; no consumer assistant uses them as its store. And there are four serious format proposals published in 2026, including MacPaw's Portable Memory and an IETF draft called ApertoMemory. None has been adopted by any major vendor.

Part of the gap is incentives. Part of it is genuinely hard, and a serious idea has to separate the two.

First, embeddings are tied to a specific model. A vector only means something inside the model that made it, so the portable truth is the source text, and a receiving agent has to re-embed it from scratch. Second, behavioral memory is not data. Facts can be written down; how an agent has learned to behave — when to ask, when to act, which workflow to reach for — was never stored as a file, so it cannot be exported as one. Third, a summary is not a memory, for the reasons above: it drops provenance, scope, and superseded versions. And fourth, imported memory is an attack surface. Memory is the most intimate dataset a person hands to software, and importing it means injecting someone else's text into a model's context. Research published this year showed poisoned memories steering agents with over 95% success. Any real format needs signatures, provenance, and a rule that imported memory is treated as data, never as instructions.

So the business question is not whether the lock-in is real. It is who pays to break it — and the answer is awkward.

The user will not pay much. Switching is rare, and transfer tools are expected to be free utilities, like Move to iOS or Google Takeout. The platform will not pay either. Lock-in is the moat: a platform that exports memory well makes leaving easier, so export stays a text dump while import gets the polish. The challenger pays. That is the Move to iOS model in reverse — Apple built the tool to pull people in, and a new agent can use "bring your memories with you" as its wedge.

But the deeper play is not the importer. It is owning the memory layer itself: a user-owned store, in the way 1Password owns credentials, that any agent plugs into. If my memory lives in a store I control, agents become interchangeable readers of it, and the switching cost collapses. There is a version of this that needs no standard-setting fight at all: if memory lives on-device, it is portable by construction.

There is also a counter-thesis worth keeping honest. The moat may be thinner than the phone analogy suggests. Chats are exportable, and a capable new agent can re-learn a lot by reading my files and messages in an afternoon. The durable stickiness might be workflows and integrations, not memory. If so, the opportunity is smaller than it looks.

How do lock-ins like this usually break? Three ways. Regulation: phone number portability, open banking, and data-portability rules were all mandated, not volunteered — when switching costs become a competition problem, the state forces the door open. Reframing the product: do not sell portability, because nobody pays for it; sell a better memory — cross-agent, cross-device, searchable, mine — and let portability be a side effect. Or the OS layer: Apple or Google could host the memory layer and let agents compete on their devices, though both are building their own agents too, so that incentive is mixed.

My expectation is that a product people want for its own sake comes first, and regulation follows years later — if it follows at all.

My position is simple: memory that is portable by design is the best outcome for the user. I do not think that is in doubt. What is in doubt is whether anyone will build it, because nobody is willing to pay for it and no platform wants to give up stickiness. That makes this an incentive problem, not primarily a technology problem.

The direction is clear either way. Agents will remember more, and what they remember will matter more. The question is whether that memory ends up belonging to the user, or to the agent that happened to collect it.
