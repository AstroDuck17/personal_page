---
title: "ORBIT Node security orchestration"
description: "A cybersecurity orchestration project connecting threat context, an asset graph, and AI-assisted assessments with analyst approval."
type: project
topics: [security, systems]
status: completed
role: "Software Engineer · five-person team lead"
context: "NJSecure.org · client: Satya Vithala"
dateLabel: "January–May 2026"
stack: [Gemini, MCP, Neo4j, Wazuh, Presidio]
order: 5
visual: orbit
related: []
links: []
sources:
  - 'D:\college\Resume\personal_web\Yashav_Bhatnagar_CV.pdf'
  - 'D:\college\Resume\personal_web\bigCV.pdf'
---

## Problem

A threat report becomes more useful when it can be connected to the assets and telemetry of the environment being protected. ORBIT Node explored this connection in a cybersecurity orchestration platform designed for community banks.

## My contribution

I led a five-person team and developed the Gemini MCP orchestrator and AI reasoning layer. I designed the Neo4j asset–threat knowledge graph and co-engineered the Presidio PII risk-scoring pipeline and Wazuh telemetry integration.

## Approach

The system connects incoming threat information with local asset relationships and telemetry. That graph context feeds an AI-assisted assessment, which an analyst reviews before Wazuh is signaled to perform a mitigation.


## Evidence

The integration work took place in a simulated environment from January to May 2026. My CV records the project and my responsibilities. There is no public code or client demonstration linked here.

## Limitations

Production deployment, bank adoption and threat-detection performance have not been independently verified. The assessments depend on the quality and freshness of the supplied information and require analyst review.
