---
title: "MetaFam: family relationship prediction"
description: "Comparing knowledge graph embeddings and graph neural networks on a family relationship graph, with attention to evaluation leakage."
type: project
topics: [machine-learning]
status: completed
featured: true
role: "Knowledge graph modeling and evaluation"
context: "Machine learning project"
stack: [Python, PyTorch, PyG, ComplEx, RGCN]
order: 3
visual: graph
related: [leakage-aware-evaluation]
links:
  - label: "Source code"
    url: "https://github.com/AstroDuck17/MetaFam_Knowledge_Graph"
sources:
  - 'D:\college\Resume\personal_web\Yashav_Bhatnagar_CV.pdf'
---

## Problem

Given a graph of people and known family relationships, can a model rank plausible missing relationships? The challenge includes both representing the graph and checking whether a strong score reflects prediction rather than information that slipped across an evaluation split.

## My contribution

I implemented the knowledge graph embedding models TransE, DistMult, ComplEx, and RotatE, alongside an RGCN, using leakage-aware data splitting on a 1,316-node family knowledge graph.

## Approach

Embedding models and graph neural networks offer different ways to represent entities and relationships. I compared their link-prediction behavior and also examined the graph's community structure using Louvain and Leiden community detection.

Related edges can expose information about a held-out relationship. Evaluating the predictions requires checking which edges are available to the model in each split.

## Evidence

My CV reports a ComplEx mean reciprocal rank above 0.87 and near-perfect Hits@10 on this project's evaluation, with community modularity of approximately 0.98 across 50 family clusters. The source repository is linked above.

## Limitations

The reported results apply to this dataset and evaluation setup. Reproduction and comparisons require the dataset construction, candidate ranking and split details; performance on other family graphs has not been established.
