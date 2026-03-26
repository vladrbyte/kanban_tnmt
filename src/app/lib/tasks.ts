export type CharacterId = 'leo' | 'don' | 'raph' | 'mike' | 'splinter';
export type TaskStatus = 'todo' | 'progress' | 'done';
export type TurtleStatusMap = Partial<Record<CharacterId, TaskStatus>>;

export type Task = {
  id: number;
  title: string;
  suitableFor: CharacterId[];
  crewSize: { min: number; max: number; };
  assignees: CharacterId[];
  status: Partial<Record<CharacterId, TaskStatus>>;
};

const createDefaultFields = () => ({
  assignees: [] as CharacterId[],
  status: {} as TurtleStatusMap,
});

export const tasks: Task[] = [
  {
    id: 1,
    title: 'Roof patrol',
    suitableFor: ['leo', 'raph'],
    crewSize: { min: 1, max: 2 },
    ...createDefaultFields()
  },
  {
    id: 2,
    title: 'Pizza supply check',
    suitableFor: ['mike', 'don'],
    crewSize: { min: 1, max: 3 },
    ...createDefaultFields()
  },
  {
    id: 3,
    title: 'Workshop cleanup',
    suitableFor: ['don', 'mike'],
    crewSize: { min: 1, max: 4 },
    ...createDefaultFields()
  },
  {
    id: 4,
    title: 'Mutagen trace scan',
    suitableFor: ['don'],
    crewSize: { min: 1, max: 2 },
    ...createDefaultFields()
  },
  {
    id: 5,
    title: 'Dock surveillance',
    suitableFor: ['leo', 'raph'],
    crewSize: { min: 2, max: 4 },
    ...createDefaultFields()
  },
  {
    id: 6,
    title: 'Sparring warm-up',
    suitableFor: ['leo', 'raph', 'mike'],
    crewSize: { min: 2, max: 4 },
    ...createDefaultFields()
  },
  {
    id: 7,
    title: 'Sewer route check',
    suitableFor: ['leo', 'don'],
    crewSize: { min: 1, max: 2 },
    ...createDefaultFields()
  },
  {
    id: 8,
    title: 'Rescue stray animals',
    suitableFor: ['mike', 'leo'],
    crewSize: { min: 1, max: 3 },
    ...createDefaultFields()
  },
  {
    id: 9,
    title: 'Train med-bot sensors',
    suitableFor: ['don'],
    crewSize: { min: 1, max: 1 },
    ...createDefaultFields()
  },
  {
    id: 10,
    title: 'Calm alley dispute',
    suitableFor: ['leo', 'mike'],
    crewSize: { min: 1, max: 2 },
    ...createDefaultFields()
  },
  {
    id: 11,
    title: 'Silent recon run',
    suitableFor: ['leo', 'raph'],
    crewSize: { min: 1, max: 2 },
    ...createDefaultFields()
  },
  {
    id: 12,
    title: 'Arcade machine repair',
    suitableFor: ['don', 'mike'],
    crewSize: { min: 1, max: 2 },
    ...createDefaultFields()
  },
  {
    id: 13,
    title: 'Night watch rotation',
    suitableFor: ['leo', 'raph', 'don'],
    crewSize: { min: 2, max: 4 },
    ...createDefaultFields()
  },
  {
    id: 14,
    title: 'Meditation hall setup',
    suitableFor: ['leo', 'don', 'mike'],
    crewSize: { min: 1, max: 4 },
    ...createDefaultFields()
  },
  {
    id: 15,
    title: 'Emergency tunnel drill',
    suitableFor: ['leo', 'raph', 'don', 'mike'],
    crewSize: { min: 2, max: 4 },
    ...createDefaultFields()
  },
];
