---
title: "Audio-guided microbot"
description: "Offline voice control on an ESP32-S3, combining a compact keyword-spotting model with practical signal checks."
type: project
topics: [embedded, machine-learning]
status: completed
role: "On-device keyword spotting and speech-gate development · team project"
context: "Embedded Systems Workshop · Team Sensodyne"
dateLabel: "December 2025"
stack: [ESP32-S3, Embedded C/C++, TinyML, CNN, BLE]
order: 4
visual: audio
related: [hardware-test-jig]
links:
  - label: "Source code"
    url: "https://github.com/AstroDuck17/Audio_Guided_Microbot"
sources:
  - 'D:\college\Resume\personal_web\Yashav_Bhatnagar_CV.pdf'
  - 'D:\college\Sem 3\Embedded Systems Workshop\final-codes-17_sensodyne\Report\report.md'
  - 'D:\college\Sem 3\Embedded Systems Workshop\final-codes-17_sensodyne\README.md'
---

## Problem

We wanted a small robot to respond to directional voice commands without sending audio to a cloud service. Running recognition on the microcontroller makes memory, compute, noise, and false triggers part of the design problem.

## My contribution

This was a four-person Team Sensodyne project. I worked on deploying the on-device CNN keyword-spotting pipeline and implementing a multi-metric speech gate. The robot, communication and supervision features were team outcomes.

## Approach

An 8-bit quantized CNN runs on the ESP32-S3. A speech gate uses signal-to-noise ratio, RMS energy, and zero-crossing rate to avoid unnecessary processing during silence or noise. Confidence checks and a cooldown help control repeated triggers.

The team system combines voice commands with obstacle checks, BLE feedback, and manual override through a desktop interface. BLE is the main control link; the project documentation also describes optional LoRa communication.

## Evidence

The project report documents a model of approximately 81 kB and voice-decision latency of approximately 102 ms. My CV reports accuracy above 93.87% for the project's evaluation. Code and project documentation are available in the repository.

## Limitations

The reported accuracy belongs to the project's evaluation conditions; it is not a guarantee for unfamiliar voices or arbitrary background noise. The documentation uses several latency descriptions, so the 102 ms figure should not be treated as a rigorously isolated end-to-end speech-to-motion measurement. The robot was designed for a small command vocabulary and indoor use.
