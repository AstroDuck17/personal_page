---
title: "Unix shell in C"
description: "A shell with pipelines, I/O redirection, signal handling and foreground/background job control."
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

This project implements the steps a Unix shell takes to run commands, connect file descriptors and manage child processes, including how terminal signals reach a job.

## My contribution

I implemented a Unix shell in C with pipelines, I/O redirection, signal handling, foreground and background processes, and job control.

## Approach

The implementation separates prompting, parsing, built-in commands, and execution. It supports sequential commands, background execution, persistent history, and built-ins for directory navigation and process activity.

Redirection and pipes connect program inputs and outputs; foreground/background controls and signals manage the lifetime of the processes those programs create.

## Evidence

The repository documents the source structure, build instructions, supported commands and process-management features.

## Limitations

This educational shell supports the documented commands and process controls. Shell expansions, scripting features and full POSIX or Bash compatibility are outside its scope.
