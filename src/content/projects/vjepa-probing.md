---
title: "What does a video model know about time?"
description: "An ongoing investigation of temporal and physical information in frozen V-JEPA2 representations."
type: research
topics: [machine-learning]
status: ongoing
featured: true
role: "Undergraduate Researcher · advised by Prof. Ponnurangam Kumaraguru"
context: "Precog Research Group · IIIT Hyderabad"
dateLabel: "April 2026–present"
stack: [V-JEPA2, PyTorch, Representation probing, Video models]
order: 2
visual: physics
related: []
links: []
sources:
  - 'D:\college\Resume\personal_web\Yashav_Bhatnagar_CV.pdf'
  - 'D:\college\Precog\VJEPA\vjepa_temporal_rule_probing.md'
  - 'D:\college\Precog\VJEPA\layerwise_probing_design.md'
---

## Research question

Video models encounter motion, repeated actions, and physical events during training. I am investigating what information about those events is accessible in their internal representations: temporal order, recurrence, period, phase, repetition count, tempo, and intuitive physics.

## My contribution

I am working on layer-wise probing of frozen V-JEPA2 representations at Precog, advised by Prof. Ponnurangam Kumaraguru. The work examines intermediate representations rather than fine-tuning the video model to solve each target task.

## Approach

A frozen model extracts features from video clips. Smaller probes learn to predict a target property from those features, and comparisons across layers help examine where the property becomes accessible.

Temporal-shuffling controls ask whether changing the order of frames changes the information a probe can recover. Cross-context controls ask whether a result carries beyond the particular appearance or setting seen during probe training.

These controls matter because success on one dataset can have several explanations. A probe may exploit appearance cues or other shortcuts instead of information about the temporal property of interest.

## Evidence and current status

This is ongoing research. The current public description covers the questions and methodology recorded in my CV. I am not presenting a completed benchmark, a finding that the model understands physical rules, or a publication here.

## Limitations

Recovering a label from a representation is evidence about accessibility under a particular probe and evaluation setup. It does not, on its own, establish human-like understanding or prove that the original model uses that information when making predictions. Further results and supporting material will be added when they are ready to share.
