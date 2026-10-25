export const resume = {
  name: 'Yashav Bhatnagar',
  title: 'Computer Science & Engineering student',
  email: 'yashav.bhatnagar@students.iiit.ac.in',
  github: 'https://github.com/AstroDuck17',
  linkedin: 'https://www.linkedin.com/in/yashav-bhatnagar-973853320/',
  education: {
    institution: 'International Institute of Information Technology, Hyderabad',
    degree: 'B.Tech in Computer Science and Engineering',
    period: '2024–2028',
    grade: 'CGPA: 8.01',
    coursework: [
      'Machine, Data and Learning',
      'Advanced NLP (ongoing in September 2026 CV)',
      'Probability & Statistics',
      'Linear Algebra',
      'Statistical Methods in AI (self-study)',
    ],
  },
  experience: [
    {
      organization: 'Precog Research Group · IIIT Hyderabad',
      role: 'Undergraduate Researcher',
      period: 'April 2026–present',
      bullets: [
        'Advised by Prof. Ponnurangam Kumaraguru.',
        'Investigating temporal and physical reasoning in frozen V-JEPA2 representations through layer-wise probing of intuitive physics, temporal order, recurrence, and periodic structure.',
        'Probing whether recurrence, period, phase, repetition count, and tempo are recoverable from intermediate representations, using temporal-shuffling and cross-context controls.',
      ],
    },
    {
      organization: 'NJSecure.org · client: Satya Vithala',
      role: 'Software Engineer',
      period: 'January–May 2026',
      bullets: [
        'Led a five-person team building ORBIT Node, a cybersecurity orchestration platform designed for community banks, with analyst approval before mitigation through Wazuh.',
        'Developed the Gemini MCP orchestrator and AI reasoning layer, and designed the Neo4j asset–threat knowledge graph.',
        'Co-engineered the Presidio PII risk-scoring pipeline and Wazuh telemetry integration to refresh graph context for assessments.',
      ],
    },
    {
      organization: 'Smart City Living Lab · IIIT Hyderabad',
      role: 'Undergraduate Researcher',
      period: 'April 2025–January 2026',
      bullets: [
        'Developed a Raspberry Pi hardware validation platform covering seven interface categories, with CLI, Tkinter GUI, and FastAPI web access.',
        'Implemented real-time SSE diagnostics, non-blocking hardware checks, and RS485 Modbus RTU communication for sensor integration.',
        'Hardware Test Jig work showcased at Research Fest @IIITH, Spring 2026.',
      ],
    },
  ],
  skills: [
    { label: 'Languages', items: ['C/C++', 'Python', 'JavaScript', 'Assembly', 'SQL'] },
    { label: 'AI, ML & data', items: ['PyTorch', 'scikit-learn', 'NumPy', 'pandas', 'TinyML', 'CNNs', 'GNNs'] },
    { label: 'Web & databases', items: ['Node.js', 'Express.js', 'React.js', 'FastAPI', 'MongoDB', 'MySQL', 'Neo4j', 'Tailwind CSS', 'Socket.io'] },
    { label: 'Systems & embedded', items: ['POSIX Threads', 'Socket Programming', 'ESP32', 'Raspberry Pi', 'I2C/SPI/UART', 'BLE/LoRa'] },
    { label: 'Tools & cloud', items: ['Linux', 'Git', 'AWS', 'Docker', 'Postman', 'Wazuh', 'Presidio'] },
  ],
  achievements: [
    'JEE Advanced 2024: All India Rank 3949.',
    'JEE Main 2024: All India Rank 1189; 99.93 percentile.',
  ],
  snapshot: '15 September 2026',
} as const;
