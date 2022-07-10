export interface SelectFilter {
  name: PlayerFilterType;
  icon: string;
  options?: any[];
}

export enum PlayerFilterType {
  'POSITION' = 'position',
  'NATIONALITY' = 'nationality',
  'TEAM' = 'team',
  'HAND' = 'hand',
  'ROOKIE_STATUS' = 'rookie',
}

export const PlayerFilterData: SelectFilter[] = [
  {
    name: PlayerFilterType.POSITION,
    icon: 'matchup',
    options: ['Please Choose...'],
  },
  {
    name: PlayerFilterType.NATIONALITY,
    icon: 'flag',
    options: ['Please Choose...'],
  },
  {
    name: PlayerFilterType.TEAM,
    icon: 'team',
    options: ['Please Choose...'],
  },
  {
    name: PlayerFilterType.HAND,
    icon: 'side',
    options: ['Please Choose...', 'Left', 'Right'],
  },
  {
    name: PlayerFilterType.ROOKIE_STATUS,
    icon: 'baby',
    options: ['Please Choose...', 'No', 'Yes'],
  },
];
