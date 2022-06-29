export interface MenuData {
  name: string;
  route: string;
  icon?: string;
}

export const MENU_DATA: MenuData[] = [
  {
    name: 'lobby',
    route: 'lobby',
  },
  {
    name: 'my leagues',
    route: 'leagues',
  },
  {
    name: 'press gallery',
    route: 'press-gallery',
  },
  {
    name: 'schedule',
    route: 'schedule',
  },
];
