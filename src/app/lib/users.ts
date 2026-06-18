import {CharacterId} from './tasks'

export type Character = {
  id: CharacterId;
  name: string;
  avatar: string;
  emoji: string,
  colorPrimary: string;
  role: string;
}

export const master: Character[] = [
  {
    id: 'splinter',
    name: 'Splinter',
    avatar: '/kanban_tnmt/avatars//splinter.jpg',
    emoji: ' 🐀',
    colorPrimary: '#be251ace',
    role: 'Master'
  }
]
export const turtles: Character[] = [
  {
    id: 'leo',
    name: 'Leonardo',
    avatar: '/kanban_tnmt/avatars//leo.jpg',
    emoji:  '🐢',
    colorPrimary: '#3B82F6',
    role: 'Leader'
  },
  {
    id: 'raph', 
    name: 'Raphael',
    avatar: '/kanban_tnmt/avatars//raph.jpg',
    emoji:  '🐢',
    colorPrimary: '#EF4444',
    role: 'Fighter'
  },
  {
    id: 'don',
    name: 'Donatello',
    avatar: '/kanban_tnmt/avatars//don.jpg',
    emoji:  '🐢',
    colorPrimary: '#8B5CF6',
    role: 'Tech'
  },
  {
    id: 'mike',
    name: 'Michelangelo',
    avatar: '/kanban_tnmt/avatars//mike.jpg', 
    emoji:  '🐢',
    colorPrimary: '#F59E0B',
    role: 'Fun'
  }
];
