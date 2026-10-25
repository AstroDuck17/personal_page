export const topics = {
  'machine-learning': { name: 'Machine learning', description: 'Representations, learning on graphs, and small models running close to the hardware.' },
  'systems': { name: 'Systems', description: 'Processes, memory, networks, and the details that make software work.' },
  'embedded': { name: 'Embedded', description: 'Software meeting the physical world: sensors, microcontrollers, and useful diagnostics.' },
  'security': { name: 'Security', description: 'Connecting telemetry, graph context, and human decisions in security workflows.' },
  'quantum-computing': { name: 'Quantum computing', description: 'An emerging learning interest. I plan to use this space to document the foundations I study, the questions I ask, and the experiments I eventually build. No completed quantum projects or published notes yet.' }
} as const;
export const topicName = (id: string) => topics[id as keyof typeof topics]?.name ?? id;
