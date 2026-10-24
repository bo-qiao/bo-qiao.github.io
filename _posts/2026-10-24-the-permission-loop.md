---
layout: post
title: "The Permission Loop: Personal Agents Are Where Coding Agents Were in 2025"
date: 2026-10-24
tags: [agents, AI, permissions, productivity]
---

What we just did is very funny. A simple task — create a pull request and merge it — and the agent asked me for permission at least four times along the way. Then it told me the prompts cannot be skipped.

It reminded me of the early days of coding agents.

In 2025, when I first started using GitHub Copilot, and in 2026, when I first used Cursor and Claude Code, there was no auto mode. The "dangerously skip permissions" option existed, but it was not encouraged. So people sat there in the loop, approving every step, one prompt after another.

At some point, Claude Code realized this does not make sense. A human who is asked for permission fifty times a day will not pay attention anymore. They will click approve on autopilot, which means the prompts have stopped being safety checks and become pure friction. So it is better to let the agent decide and run in auto mode.

Fast forward to today. When people use coding agents, nobody sits in the approval loop anymore. Everybody just goes with auto or yolo mode by default. And the agent is smart about it too — it asks about the genuinely consequential things and handles the rest. That is what enables long-running tasks without human input, and it improves productivity drastically.

Personal agents today are in the early age. People are afraid to give them permission, and the software is also not confident in taking auto decisions. So we are back in the loop: a simple, explicitly authorized task still gets interrupted four times for confirmation.

The long-term direction seems obvious to me. Personal agents will follow the same curve coding agents did. The permission loop will collapse into standing trust and auto mode, because it has to — the alternative is an agent that cannot do anything long-running at all.

There is one real difference, though, and it is probably why personal agents are a cycle behind. Code is revertible and testable. A bad auto-merge can be reverted; a bad auto-edit gets caught by tests. A personal agent touches money, messages to real people, and posts under your name. There is no git revert for an email.

So the end state for personal agents probably is not pure yolo mode. It is scoped standing trust: approve the task once, and let the agent carry that intent across all the steps inside it, instead of re-asking at every tool boundary. Add cheap previews and undo for the rest. The mode toggle is the easy part. The trust infrastructure — what is in scope, what is reversible, what gets logged — is the actual work.

But the direction of travel is the same. Coding agents went from "approve everything" to "approve the task, automate the steps." Personal agents will get there too. We are just living through their 2025 right now.
