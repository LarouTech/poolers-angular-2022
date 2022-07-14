import {
  GoalieStatsEnum,
  SkaterStatsEnum,
} from 'src/app/nhl/enum/playerStas.enum';

export interface NavigationState {
  name: string;
  state: boolean;
  sorter: string;
  descending: boolean;
}

export const SKATER_INIT_STATE: NavigationState[] = [
  {
    name: 'points' as never,
    state: true,
    sorter: SkaterStatsEnum.points,
    descending: true,
  },
  {
    name: 'goals' as never,
    state: false,
    sorter: SkaterStatsEnum.goals,
    descending: true,
  },
  {
    name: 'assists' as never,
    state: false,
    sorter: SkaterStatsEnum.assists,
    descending: true,
  },
];

export const DEFENSEMEN_INIT_STATE: NavigationState[] = [
  {
    name: 'points' as never,
    state: true,
    sorter: SkaterStatsEnum.points,
    descending: true,
  },
  {
    name: 'goals' as never,
    state: false,
    sorter: SkaterStatsEnum.goals,
    descending: true,
  },
  {
    name: 'assists' as never,
    state: false,
    sorter: SkaterStatsEnum.assists,
    descending: true,
  },
];

export const GOALIE_INIT_STATE: NavigationState[] = [
  {
    name: 'gaa' as never,
    state: true,
    sorter: GoalieStatsEnum.goalAgainstAverage,
    descending: false,
  },
  {
    name: 'sv%' as never,
    state: false,
    sorter: GoalieStatsEnum.savePercentage,
    descending: true,
  },
  {
    name: 'shutouts' as never,
    state: false,
    sorter: GoalieStatsEnum.shutouts,
    descending: true,
  },
];

export const ROOKIE_INIT_STATE: NavigationState[] = [
  {
    name: 'points' as never,
    state: true,
    sorter: SkaterStatsEnum.points,
    descending: true,
  },
  {
    name: 'goals' as never,
    state: false,
    sorter: SkaterStatsEnum.goals,
    descending: true,
  },
  {
    name: 'assists' as never,
    state: false,
    sorter: SkaterStatsEnum.assists,
    descending: true,
  },
];
