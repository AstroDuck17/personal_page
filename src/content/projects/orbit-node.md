---
title: "ORBIT Node: context for security decisions"
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

The graph and telemetry integrations make the assessment specific to the modeled environment. Analyst approval remains part of the decision flow.

## Evidence

The project and my responsibilities are recorded in my current CV. The longer CV describes the integration in a simulated environment. This page summarizes the completed engineering work from January to May 2026; no public code or client demonstration is linked.

## Limitations

This description does not establish production deployment, bank adoption, or independently measured threat-detection performance. AI reasoning and graph context still depend on the quality and freshness of the supplied information, and the workflow includes human review.
