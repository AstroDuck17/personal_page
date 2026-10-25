---
title: "Raspberry Pi hardware test jig"
description: "A test jig for multiple hardware protocols, with configurable communication and a browser interface for running tests and viewing live results."
type: project
topics: [embedded, systems]
status: completed
featured: true
role: "Protocol implementation, custom communication controls and browser interface"
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
  - 'D:\college\SCRC\Hardware_Test_Jig\web_test_jig\lib\CUSTOM\custom_i2c.py'
  - 'D:\college\SCRC\Hardware_Test_Jig\web_test_jig\lib\CUSTOM\custom_spi.py'
  - 'D:\college\SCRC\Hardware_Test_Jig\web_test_jig\lib\CUSTOM\custom_uart.py'
  - 'D:\college\SCRC\Hardware_Test_Jig\web_test_jig\lib\CUSTOM\custom_pwm.py'
---

## Problem

A sensor test often needs its own wiring, communication settings and device-specific commands. Testing several kinds of hardware means working with different buses and checking that each device can send or receive data correctly.

I built a Raspberry Pi 3 test jig to run these checks across multiple protocols. It supports preset sensor tests and custom communication for devices that need different settings or commands.

## My contribution

At the Smart City Living Lab, my main work was implementing the protocol support and configurable communication controls. I worked on I2C and SPI operations, serial communication, PWM control and RS485 Modbus RTU testing.

I also built the FastAPI browser interface, including protocol selection, custom settings and live diagnostic output through Server-Sent Events. The jig can also be accessed through a CLI and a Tkinter GUI.

The supported testing categories are I2C, SPI, UART, PWM, GPIO, ADC and RS485. Analog readings use an external ADS1115 ADC connected over I2C.

## Approach

### Configurable protocol communication

The custom controls expose settings and operations appropriate to each protocol:

- I2C: select the bus and device address, scan for devices, and read or write bytes, registers and blocks.
- SPI: select the bus, chip-select device, mode and clock speed, then run transfers or separate read/write operations.
- UART: select the serial port, baud rate, data bits, parity, stop bits and timeout. Send strings or bytes, read responses and inspect or clear buffers.
- PWM: select a supported pin and adjust frequency, duty cycle or pulse width.
- RS485: configure Modbus RTU communication, including serial settings, slave IDs and register addresses, with transmit and receive modes.

### Preset device tests

Preset tests cover devices such as a BH1750 light sensor, an OLED display, an SDS011 particulate sensor, servos and an ultrasonic distance sensor. These provide a starting point for checking known hardware. The custom controls allow communication with devices outside those presets.

Device modules contain the hardware operations and are reused by the browser, CLI and GUI. They support continuous terminal tests and single-reading calls for the graphical interfaces.

### Browser interface and live diagnostics

The browser interface lets a user select a protocol, choose a preset test or configure custom communication, and inspect results from another device on the same network. I implemented the FastAPI routes and Server-Sent Events output for these tests.

Threading and asynchronous execution keep hardware checks from blocking the interface. Diagnostic logs help trace failed operations and inspect responses.

## Evidence

The source repository contains the protocol implementations, custom communication modules and browser routes, with device and wiring documentation. The test jig was shown at Research Fest @IIITH in Spring 2026.

Throughput, time saved and reliability across all supported sensor configurations have not been benchmarked.

## Limitations

Tests require correct wiring, enabled Raspberry Pi interfaces, suitable permissions and compatible devices. Some functions share GPIO pins and need an appropriate wiring configuration.

The browser application has no authentication and is intended for a trusted network. Public deployment would require access controls.
