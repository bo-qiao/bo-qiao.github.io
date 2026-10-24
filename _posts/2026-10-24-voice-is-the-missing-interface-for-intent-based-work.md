---
layout: post
title: "Voice Is the Better Interface"
date: 2026-10-24
tags: [voice, AI, intent, interface, agents]
---

I type a lot. Chat windows, coding agents, terminal prompts — most of my day is typing instructions into boxes. Dictation was supposed to fix that. It doesn't.

Speaking into a text box feels wrong in a way that's hard to explain until you've felt it. You have to compose in writing while speaking: monitor yourself for clean sentences, edit in real time. It costs more energy than typing, not less. And something is always lost.

That something is the whole reason I'm writing this. Voice is not a faster keyboard. It is a different medium, and for the kind of work AI agents are now doing, it is the medium the work actually needs.

## The work changed before the interface did

With a coding agent or a chat assistant, you no longer give step-by-step instructions. You describe roughly what you want and let the agent figure out the rest. The work is intent-based now: you supply the intent, the agent supplies the execution.

But "roughly" is exactly what text is bad at. Text forces you to either over-specify or be misunderstood. You have to decide what you think before you can write it down, and deciding what you think is often the work itself.

Humans don't communicate intent in words alone. We communicate it in how we say the words. The hesitation says "I'm unsure about this part." The laugh says "don't take that literally." The tired voice says "just make it work, don't ask me ten questions." The emphasis says "this word is the one that matters." A text box strips all of that away and hands the agent the thinnest possible version of what you meant — and then the agent has to interrogate you with clarifying questions, which is the very friction intent-based work was supposed to remove.

When you talk to a real person, none of this is a problem. You can think aloud without first organizing every thought into a polished message. You can pause while formulating an idea, change direction in the middle of a sentence, emphasize the important word, laugh, express uncertainty, correct yourself. A good listener absorbs all of it. A transcript box punishes it.

So the gap is not typing speed. It is three separate frictions, and dictation only addresses the first one:

- **Composition overhead.** You must formulate thoughts as explicit written instructions before the agent can do anything.
- **Information loss.** Transcription discards prosody, timing, vocalizations, and other acoustic cues that carried part of your meaning.
- **Interaction overhead.** You must manage messages, submissions, corrections, and context switching, stopping your train of thought every time you hit send.

Native audio interaction has the potential to reduce all three. Dictation reduces only typing.

## The microphone icon lies

One of the most confusing things about the current state of voice is that a microphone icon tells you nothing about what happens to your audio.

The ordinary phone keyboard microphone is dictation. You speak, you get a transcript in the text field, you review it, you edit it, you submit it. Everything after that is text. The model never hears you.

The small microphone in a chat app's message box usually works the same way: audio in, text in the box, review, submit. It is not a conversation. It is typing with extra steps.

A real voice mode is a different feature hiding behind a similar icon. It streams audio to a model that processes the audio directly, and the model responds in audio. The difference is invisible in the UI and enormous in the experience — which is why two microphone experiences in the same app can feel fundamentally different.

The general principle is simple: capturing audio is not the same as reasoning from audio. An application can record your voice and throw it away the moment it has a transcript. Another can send the audio itself to the model. The question that matters is not whether the app has a microphone. It is what representation reaches the model that is supposed to understand you.

## What native audio actually means

The old voice pipeline was speech-to-text, then a language model, then text-to-speech — and information died at every step. The transcript was a bottleneck that only words could pass through.

Native audio models work differently. They don't feed raw waveform samples into a transformer — at 16,000 samples per second, that would be absurd. Instead, a neural audio codec compresses the waveform into discrete audio tokens, a few hundred per second, and the transformer reasons over those tokens directly. The important trick is that the tokens come in two flavors: semantic tokens carry what you said, acoustic tokens carry how you said it — pitch, rhythm, timbre, emphasis. Both streams go through the same model, so the paralinguistic information never has to become a word to survive.

I tested this once without thinking much of it. I asked Gemini Live whether it could tell I was laughing. It said yes. That sounds trivial until you realize what it implies: the laugh reached the model as sound, not as the word "laugh." With dictation, that question would have been unaskable — the transcript would have deleted the laugh before the model ever saw it, so there would have been nothing to ask about.

This is also why native audio does not require a model trained from scratch on audio. A model can combine a pretrained audio encoder with a language model, as long as the reasoning model gets the audio representations rather than only a transcript. The architecture matters less than the information path: does the sound reach the brain, or only the words?

## Three levels, and only the third changes how you work

It helps to separate three levels of capability, because they get conflated constantly:

**Level 1: Speech recognition.** Convert spoken words into text. This is dictation. Solved, and not the interesting problem.

**Level 2: Native audio understanding.** Process audio directly, using information beyond the words — emphasis, hesitation, pauses, non-speech sounds. This is where Gemini Live lives, and where most of the current excitement is.

**Level 3: Natural agent interaction.** Combine audio understanding with conversational context, application state, tool access, and persistent task execution. This is the level that changes how you work, and it is the level that is mostly missing.

A model that transcribes well does not necessarily converse well. A model that converses well does not necessarily do useful work. The levels are separate problems, and the product opportunity is almost entirely at Level 3.

## The coding agent is where this matters most

Coding agents are the strongest case for Level 3, because a developer's workflow is not a sequence of commands. It is a conversation with the codebase, and much of it happens out loud in your head already.

Consider a real moment of technical work. You're looking at an implementation you don't like, and you say something like:

> "I don't really like this implementation. The allocation is correct, but I think we're optimizing the wrong thing. What if we group the tensors by their lifetime first? Actually, we need to consider the memory level too. Can you inspect the current implementation and tell me whether that would make sense?"

Try typing that. To write it, you first have to decide what you think, then compress it into a prompt, then submit it, then wait, then read the answer, then type the follow-up. Every step is a context switch away from the actual thinking.

A voice-native agent could treat that utterance as what it is: an evolving technical discussion. It inspects the repository, analyzes the proposal, and responds with findings — while you keep talking. You correct it mid-sentence. You change your mind. You interrupt. The value is not faster input. It is a more continuous way of working through a hard problem, where the agent keeps up with your thinking instead of making you stop and package it.

## What a voice coding agent actually needs

Building this does not require training a new foundation model. It requires combining an existing audio-capable model with four pieces that most demos skip:

**Streaming audio perception.** Audio arrives as it is spoken, not as a finished transcript. The system preserves timing, pauses, and relevant non-speech sounds. A transcript can still exist for editing and search — but it should not be the only representation the reasoning model gets.

**Conversation and task state.** The agent must distinguish thinking aloud from asking a question, giving an instruction, correcting an earlier instruction, or cancelling a proposed action. Those distinctions depend on context and wording as well as acoustic cues. And the agent must retain the current task and application state so you never have to repeat yourself.

**An agent runtime.** Audio understanding alone does nothing. The agent needs the repository, the terminal output, the diffs, the test results — the whole execution environment — wired into the same conversation.

**A conversational feedback loop.** Responsive turn-taking, interruptions, and a mixture of speech and text. You discuss an implementation while the agent shows you a diff, then interrupt to change the design. The interface is a conversation, not a text box with a microphone taped to it.

One design detail matters more than all the others: **thinking aloud must not authorize action.** In a text interface, pressing send is the authorization boundary — nothing happens until you submit. In a voice interface, that boundary disappears. Discussing an idea, exploring an option, and instructing the agent to modify your files are different acts, and the system must tell them apart without forcing you to adopt unnatural speaking habits. Get this wrong and the agent is either dangerous or useless. Get it right and it is trustworthy.

## Two product directions

There are two ways to build this, and they are worth keeping distinct:

**Approach A: Voice as a universal input layer.** One voice interface that works across existing text boxes — chat apps, coding agents, terminals, issue trackers, email. You speak naturally, and the system turns speech into useful input. This is the more immediately practical approach, and it reduces typing everywhere. But if it just transcribes everything into text, it does not solve the information-loss problem. It is dictation with better manners.

**Approach B: Voice as a native agent interface.** You talk directly to a persistent agent that understands audio, maintains context, observes application state, uses tools, executes tasks, responds conversationally, and accepts corrections and interruptions. Text is still available, but the interaction is no longer organized around a text box.

Approach B is harder and it is the one that matters. It is also the one closest to talking to a real person. My recommendation is to start with B for coding agents — where the workflow rewards it most — and keep A as a complementary input mechanism, not the destination.

## What is still unsolved

Let's be honest about the state of this, because the demos flatter it.

The plumbing is largely solved: native speech-to-speech models, sub-second latency, interruption handling. The listening is not. Today's voice models sound human; they don't yet listen like humans. Prosody interpretation is real but shallow — the model hears the laugh, it doesn't reliably know what the laugh means. True full-duplex conversation, with backchannels and natural overlap, exists in research systems but not in the smartest models. And almost everything runs in the cloud, while the rhythm of real conversation wants to happen close to you, on the device.

The evaluation problem is unsolved too. We measure speech recognition accuracy, but the metrics that matter are different: task completion time, how often the user must repair a misunderstanding, whether the agent distinguishes exploration from instruction from correction, how often users must restate context, whether the work flows without constant switching between typing and speaking, and whether the agent respects authorization boundaries. Nobody has a standard scoreboard for any of that yet.

And there is a privacy question nobody has fully answered: how should raw audio, transcripts, and inferred acoustic information — things like stress or fatigue that the model can now infer from your voice — be stored and handled? Your voice leaks more than your words. Any system that listens at this level needs an answer to that before it earns a place in your daily workflow.

## The point

The next step in AI interaction is not replacing the keyboard with a microphone. It is allowing users to think aloud and collaborate with agents in natural language, while the agents retain context, understand intent, and perform useful work.

Voice is not a convenience feature, not another input method to bolt onto a chat box. For intent-based work, it is the interface. The agent that understands what I mean — not just what I said — will be the one that can hear me.
