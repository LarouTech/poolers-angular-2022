export interface SelectFilter {
  name: string;
  icon: string;
  options?: any[];
}

export const PlayerFilterData: SelectFilter[] = [
  {
    name: 'position',
    icon: 'matchup',
  },
  {
    name: 'nationality',
    icon: 'flag',
  },
  {
    name: 'team',
    icon: 'team',
  },
  {
    name: 'hand',
    icon: 'side',
    options: ['Left', 'Right'],
  },
  {
    name: 'rookie',
    icon: 'baby',
    options: ['No', 'Yes'],
  },
];
