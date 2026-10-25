---
title: "Files, locks, and checkpoints"
description: "A distributed document system exploring concurrent edits, recovery, and storage replication."
type: project
topics: [systems]
status: completed
role: "Distributed systems design and implementation"
context: "Network File System project"
stack: [C, POSIX Threads, Sockets, Concurrency]
order: 7
visual: network
related: [xv6-kernel, c-shell]
links:
  - label: "Source code"
    url: "https://github.com/AstroDuck17/Network_File_system"
sources:
  - 'D:\college\Resume\personal_web\Yashav_Bhatnagar_CV.pdf'
  - 'D:\college\Resume\personal_web\bigCV.pdf'
---

## Problem

Concurrent document access becomes a coordination problem when files live across multiple servers. An editor needs a useful locking boundary, while the system needs a way to preserve earlier states and recover when work goes wrong.

## My contribution

I designed and implemented a modular distributed document system in C with sentence-level locking, real-time file streaming, and structured fault logging. I also worked on Git-inspired checkpoints, revert functionality, and asynchronous replication across storage servers.

## Approach

Sentence-level locking makes the unit of coordination smaller than an entire document. Checkpoints retain recoverable states, while replication copies data across storage servers. Naming and storage responsibilities are separated so that capacity can be expanded by adding servers.

## Evidence

The source repository is available above, and the features are recorded in my CV. The project provided a practical setting for socket programming, POSIX threads, and coordinating shared state across server boundaries.

## Limitations

Horizontal expansion is a design goal, not a benchmarked claim of uninterrupted scaling. Asynchronous replication also leaves questions about the timing and consistency of copies; no formal consistency guarantee or quantified failure-recovery result is claimed on this page.
