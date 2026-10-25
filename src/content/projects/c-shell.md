---
title: "Building a Unix shell in C"
description: "Following a command from parsing to processes, pipes, signals, and job control."
type: project
topics: [systems]
status: completed
role: "Shell implementation in C"
context: "Unix systems programming project"
stack: [C, POSIX, Unix, Process management]
order: 8
visual: shell
related: []
links:
  - label: "Source code"
    url: "https://github.com/AstroDuck17/C_Shell"
sources:
  - 'D:\college\Resume\personal_web\Yashav_Bhatnagar_CV.pdf'
  - 'D:\college\Sem 3\Operating Systems and Networks\Project\C_Shell\README.md'
---

## Problem

A shell makes launching a program look simple. Building one reveals the work behind that interaction: interpreting commands, connecting file descriptors, tracking children, and deciding how terminal signals reach a job.

## My contribution

I implemented a Unix shell in C with pipelines, I/O redirection, signal handling, foreground and background processes, and job control.

## Approach

The implementation separates prompting, parsing, built-in commands, and execution. It supports sequential commands, background execution, persistent history, and built-ins for directory navigation and process activity.

Redirection and pipes connect program inputs and outputs; foreground/background controls and signals manage the lifetime of the processes those programs create.

## Evidence

The repository documents the modular source structure, build instructions, supported commands, and process-management features. This project made the relationship between shell syntax and operating-system calls concrete.

## Limitations

This is an educational shell with a defined feature set. It should not be assumed to implement every shell expansion, scripting construct, or compatibility guarantee of a full POSIX shell or Bash.
