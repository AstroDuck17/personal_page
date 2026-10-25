---
title: "Network file system"
description: "A distributed document system with sentence-level locking, checkpoints and storage replication."
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

Concurrent edits need coordination when documents are stored across multiple servers. The system also needs to retain earlier document states and recover from failed operations.

## My contribution

I designed and implemented a modular distributed document system in C with sentence-level locking, real-time file streaming, and structured fault logging. I also worked on Git-inspired checkpoints, revert functionality, and asynchronous replication across storage servers.

## Approach

Sentence-level locking makes the unit of coordination smaller than an entire document. Checkpoints retain recoverable states, while replication copies data across storage servers. Naming and storage responsibilities are separated so that capacity can be expanded by adding servers.

## Evidence

The repository contains the implementation. The work involved socket programming, POSIX threads and shared state across naming and storage servers.

## Limitations

Adding servers is part of the design; scaling without downtime has not been benchmarked. Replication is asynchronous, so copies may lag. Formal consistency guarantees and recovery timings have not been measured.
