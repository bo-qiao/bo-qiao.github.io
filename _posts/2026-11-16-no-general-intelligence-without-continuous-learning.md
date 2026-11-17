---
layout: post
title: "No General Intelligence Without Continuous Learning"
date: 2026-11-16
tags: [AGI, AI, brain, learning]
---

There are roughly two bets on how to get to general intelligence. One says keep scaling what works: bigger models, more data, better efficiency tricks — mixture of experts, better memory handling — until the model captures enough of how we think. The other says the current path hits a wall, and only systems that learn the way a brain learns will get there.

I bet on the second one. The brain-like learning path is the closest to biology, and natural selection, running over a very long history, is the best approach we know of. If that sounds like an appeal to nature, it is not quite that. It is a claim about what learning actually is.

Here is the core of it. A deployed language model can only infer. It cannot keep learning. Its weights are frozen the moment training ends, and everything it does afterward is reading those fixed numbers back. If a system cannot learn, there is no general intelligence in it — because it cannot learn, it must always be pre-learned. Inference and learning have to happen together, the way they do in the brain.

Memory shows the difference most clearly. Biological memory is distributed and active. Memories overlap, they are reconstructed every time I recall them, and sleep consolidates and prunes them — all at almost no extra energy. The memory of a model is separate and static: weights frozen after training, recall is just reading fixed numbers back. One is a living process; the other is a snapshot.

The data diets are opposite too. A newborn brain arrives already wired — tens of billions of neurons — and learns from a tiny stream of experience, constantly rewiring itself as it goes. A model starts mostly blank and is fed billions of text examples before it knows anything. The brain is efficient, learns from very little, and pays for it by needing sleep and getting tired. A GPU does not sleep. It will keep processing as long as power and cooling hold. But it also does not learn anything after training, and that is the more important difference.

Why can the GPU not learn the way a brain does? Three reasons, and they are architectural.

First, memory and compute are separate. The weights live in one place, the computation happens in another, and learning means shuttling numbers back and forth. In a brain, memory and computation are the same thing — a synapse both stores and processes.

Second, the weights freeze after training. The whole point of deployment is that the model is fixed. Learning would mean changing the weights while the model is in use, and nothing in the serving stack is built for that.

Third, backpropagation rewrites everything at once. When a model learns something new by gradient descent, the update touches the whole network, which is why it forgets what it knew before — catastrophic forgetting. A brain updates locally: synapses strengthen and weaken where the experience happened, and the rest stays put.

There are workarounds. Freeze most of the weights and train only small adapters or new experts. Replay old data so the new learning does not wash the old away. Protect the weights that matter most. These help, but they are workarounds around an architecture that was not designed to keep learning. They do not change the fact that the model, once deployed, is a fixed object.

That is why some people are building hardware that learns like a brain from the start. Neuromorphic chips put memory and compute together, update locally, and run on almost no power. Intel's Loihi 2 — a research system at Sandia called Hala Point runs 1,152 of them, 1.15 billion neurons, on about 2.6 kilowatts. IBM's NorthPole keeps 224 megabytes of memory on the chip, no DRAM at all, and IBM reports around 22 times the efficiency of an A100 on image recognition. BrainChip's Akida has been shipping since June 2026 and runs on under 300 milliwatts. There are others: SpiNNaker 2, BrainScaleS-2, Innatera, SynSense.

I should be honest about where this stands. These chips are real, but they are real at the microwatt edge and in small-scale research — not for large language models. Intel archived Loihi's software framework in May 2026. The field, as of late 2025, is about eight serious chips, patents up roughly 400 percent in a year, venture funding tripled to over $200 million, and one startup, Unconventional AI, raised a $475 million seed at a $4.5 billion valuation on exactly this thesis. The European Union put about €1.5 billion in. And commercial revenue is still only around $50 million. Billions in capital chasing tens of millions in revenue, and no killer app yet.

So the honest position is this: the brain-like path is the bet I would make, and it is also a bet that has not paid off yet. The hardware is not ready for the workloads that matter, and the algorithms that could learn continuously on today's hardware are still workarounds.

Which leaves the question I have not settled for myself: which side pulls more — the hardware, or the learning algorithms? Brain-like chips that learn on the device, or learning rules that run on the GPUs we already have? If the algorithms crack continuous learning first, the hardware may not matter. If they do not, no amount of scaling the current stack gets us there, and the chips are the only way through.

Either way, the thing to watch is not model size or benchmark scores. It is whether the system, once deployed, can still learn. Until it can, what we have is a very good snapshot of intelligence — not intelligence itself.
