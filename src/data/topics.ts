export const topics = {
  'machine-learning': { name: 'Machine learning', description: 'Video representations, knowledge graphs and keyword spotting on microcontrollers.' },
  'systems': { name: 'Systems', description: 'Operating systems, networked file storage and Unix process management.' },
  'embedded': { name: 'Embedded', description: 'Hardware communication, sensor testing and software for microcontrollers.' },
  'security': { name: 'Security', description: 'Threat assessment using asset graphs, telemetry and analyst review.' },
  'quantum-computing': { name: 'Quantum computing', description: "I'm starting to study quantum computing. I'll collect notes and experiments here as I work through the foundations." }
} as const;
export const topicName = (id: string) => topics[id as keyof typeof topics]?.name ?? id;
