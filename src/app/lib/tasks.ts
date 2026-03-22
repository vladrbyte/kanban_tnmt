export type CharacterId = 'leo' | 'don' | 'raph' | 'mike';

export type Task = {
  id: number;
  title: string;
  suitableFor: CharacterId[];
  assignees: CharacterId[];
  crewSize: {
    min: number;
    max: number;
  };
};

export const tasks: Task[] = [
  {
    id: 1,
    title: 'Roof patrol',
    suitableFor: ['leo', 'raph'],
    assignees: [],
    crewSize: { min: 1, max: 2 },
  },
  {
    id: 2,
    title: 'Pizza supply check',
    suitableFor: ['mike', 'don'],
    assignees: [],
    crewSize: { min: 1, max: 3 },
  },
  {
    id: 3,
    title: 'Workshop cleanup',
    suitableFor: ['don', 'mike'],
    assignees: [],
    crewSize: { min: 1, max: 4 },
  },
  {
    id: 4,
    title: 'Mutagen trace scan',
    suitableFor: ['don'],
    assignees: [],
    crewSize: { min: 1, max: 2 },
  },
  {
    id: 5,
    title: 'Dock surveillance',
    suitableFor: ['leo', 'raph'],
    assignees: [],
    crewSize: { min: 2, max: 4 },
  },
  {
    id: 6,
    title: 'Sparring warm-up',
    suitableFor: ['leo', 'raph', 'mike'],
    assignees: [],
    crewSize: { min: 2, max: 4 },
  },
  {
    id: 7,
    title: 'Sewer route check',
    suitableFor: ['leo', 'don'],
    assignees: [],
    crewSize: { min: 1, max: 2 },
  },
  {
    id: 8,
    title: 'Rescue stray animals',
    suitableFor: ['mike', 'leo'],
    assignees: [],
    crewSize: { min: 1, max: 3 },
  },
  {
    id: 9,
    title: 'Train med-bot sensors',
    suitableFor: ['don'],
    assignees: [],
    crewSize: { min: 1, max: 1 },
  },
  {
    id: 10,
    title: 'Calm alley dispute',
    suitableFor: ['leo', 'mike'],
    assignees: [],
    crewSize: { min: 1, max: 2 },
  },
  {
    id: 11,
    title: 'Silent recon run',
    suitableFor: ['leo', 'raph'],
    assignees: [],
    crewSize: { min: 1, max: 2 },
  },
  {
    id: 12,
    title: 'Arcade machine repair',
    suitableFor: ['don', 'mike'],
    assignees: [],
    crewSize: { min: 1, max: 2 },
  },
  {
    id: 13,
    title: 'Night watch rotation',
    suitableFor: ['leo', 'raph', 'don'],
    assignees: [],
    crewSize: { min: 2, max: 4 },
  },
  {
    id: 14,
    title: 'Meditation hall setup',
    suitableFor: ['leo', 'don', 'mike'],
    assignees: [],
    crewSize: { min: 1, max: 4 },
  },
  {
    id: 15,
    title: 'Emergency tunnel drill',
    suitableFor: ['leo', 'raph', 'don', 'mike'],
    assignees: [],
    crewSize: { min: 2, max: 4 },
  },
];
