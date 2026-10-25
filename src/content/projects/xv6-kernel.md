---
title: "Inside a teaching kernel"
description: "Extending xv6-riscv with scheduler choices, demand paging, disk swap, and small observability tools."
type: project
topics: [systems]
status: completed
role: "Kernel extensions and systems programming"
context: "Operating systems project · MIT xv6-riscv"
stack: [C, xv6-riscv, RISC-V, QEMU]
order: 6
visual: kernel
related: []
links:
  - label: "Source code"
    url: "https://github.com/AstroDuck17/xv6-kernel"
sources:
  - 'D:\college\Resume\personal_web\Yashav_Bhatnagar_CV.pdf'
  - 'D:\college\Sem 3\Operating Systems and Networks\Resume_proj\xv6-kernel\README.md'
---

## Problem

Scheduling and virtual memory are easier to reason about when the policy decisions are visible in code. I used MIT's xv6-riscv teaching kernel to explore which process runs next, when a page is loaded, and what happens when memory needs to move to disk.

## My contribution

I extended the kernel with FCFS and Linux-inspired CFS scheduling alongside xv6's default round robin. I also worked on demand-paged virtual memory with FIFO disk swap, lazy ELF loading, and per-page dirty-bit tracking, and added `getreadcount` and `memstat` system calls.

## Approach

Scheduler selection happens at compile time. FCFS chooses the earliest-created runnable process, while CFS tracks weighted virtual runtime and selects a process with a low value. The virtual-memory extension separates reserving an address range from bringing its contents into physical memory.

The additional system calls expose information useful for observing memory behavior and system-wide read activity. The read counter is protected by a spinlock.

## Evidence

The linked repository contains the kernel and documents its build requirements, scheduling choices, virtual-memory changes, and system calls. These are concrete teaching-kernel extensions rather than a new operating system built from scratch.

## Limitations

The CFS policy is Linux-inspired, not a reproduction of Linux's scheduler. xv6 is a deliberately small teaching system, and these implementations should not be assumed to have production-kernel performance or robustness. No comparative benchmark is claimed here.
