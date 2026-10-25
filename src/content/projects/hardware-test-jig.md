---
title: "One workbench, seven hardware interfaces"
description: "A Raspberry Pi test jig that brings sensor checks, low-level protocol controls, and live diagnostics into one workbench."
type: project
topics: [embedded, systems]
status: completed
featured: true
role: "Hardware validation platform development"
context: "Smart City Living Lab · IIIT Hyderabad"
dateLabel: "2025–2026"
stack: [Python, Raspberry Pi 3, FastAPI, Tkinter, SSE, Modbus RTU]
order: 1
visual: hardware
related: [audio-guided-microbot]
links:
  - label: "Source code"
    url: "https://github.com/AstroDuck17/Hardware_Test_Jig"
sources:
  - 'D:\college\Resume\personal_web\Yashav_Bhatnagar_CV.pdf'
  - 'D:\college\SCRC\Hardware_Test_Jig\README.md'
  - 'D:\college\SCRC\project_details.md'
---

## Problem

A sensor that does not respond can leave a lot of suspects: the wiring, the bus configuration, a device address, the protocol, or the application reading it. Testing a collection of different devices adds another complication: each often comes with its own script and setup instructions.

The Hardware Test Jig brings these checks together on a Raspberry Pi 3. The aim is to make protocol-level debugging accessible from a terminal, a desktop interface, or another device on the same network.

## My contribution

At the Smart City Living Lab, I developed the Python-based validation platform and its CLI, Tkinter GUI, and FastAPI web interfaces. My work included live diagnostic output through Server-Sent Events, non-blocking hardware checks, and RS485 Modbus RTU communication for sensor integration.

The platform covers seven interface categories: I2C, SPI, UART, PWM, GPIO, ADC, and RS485. These are practical testing categories rather than seven equivalent wire protocols; for example, analog readings use an external ADS1115 ADC connected over I2C.

## Approach

### Keep device operations reusable

Device modules hold the hardware-specific work. The interface layer selects a device and presents its results. This lets the same sensor support a terminal workflow, a local desktop session, and a browser without maintaining three separate hardware implementations.

The documented device pattern separates a continuous CLI activation loop from a single-reading method used by the GUI and web interface. That distinction matters: an operation that is convenient in a terminal should not block an interface that needs to remain responsive.

### Offer a quick check and a lower-level escape hatch

Preconfigured tests cover devices such as a BH1750 light sensor, an OLED display, an SDS011 particulate sensor, servos, and an ultrasonic distance sensor. When a preset is not enough, custom controls expose I2C scans and register operations, SPI transfers, configurable UART communication, and PWM frequency and duty cycle.

RS485 testing provides configurable Modbus RTU transmit and receive modes. Keeping these controls in the same workbench helps move from “the sensor is silent” to a more specific question about configuration or communication.

### Make long-running checks visible

The web interface streams diagnostic output through Server-Sent Events. Threading and asynchronous execution keep hardware interaction from tying up the interface, while logs provide a record to inspect when a check fails.

## Evidence

The repository documents the device modules, protocol controls, interface entry points, and wiring references. The platform was showcased at Research Fest @IIITH in Spring 2026, as recorded in my current CV.

This is an implemented validation tool. I do not have a published benchmark for its throughput, time saved, or reliability across every supported sensor configuration.

## Limitations

The tool still depends on correct wiring, enabled Raspberry Pi interfaces, suitable permissions, and compatible devices. Some functions share GPIO pins, so a wiring plan matters before running checks together.

The documented web application has no authentication and is intended for a trusted network. It is a local hardware workbench; deploying it as a public service would require additional access controls and operational work.
