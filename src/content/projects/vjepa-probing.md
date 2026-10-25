---
title: "Probing time in V-JEPA2 video representations"
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

I am working on layer-wise probing of frozen V-JEPA2 representations at Precog, advised by Prof. Ponnurangam Kumaraguru. The probes use features from the model's intermediate layers while its parameters stay fixed.

## Approach

A frozen model extracts features from video clips. Smaller probes learn to predict a target property from those features, and comparisons across layers help examine where the property becomes accessible.

Temporal-shuffling controls ask whether changing the order of frames changes the information a probe can recover. Cross-context controls ask whether a result carries beyond the particular appearance or setting seen during probe training.

A probe may use appearance cues or other dataset shortcuts to predict a label. The controls help check whether its predictions depend on the temporal property being studied.

## Evidence and current status

The work is ongoing. Results and evaluation details will be added when they are ready to share.

## Limitations

Recovering a label shows that information is accessible to a particular probe under its evaluation setup. Establishing physical understanding, or whether the original model uses that information in its own predictions, requires further evidence.
