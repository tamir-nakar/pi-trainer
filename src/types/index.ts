export type GameState = 'idle' | 'playing' | 'gameover';

export interface Digit {
  value: string;
  status: 'idle' | 'correct' | 'incorrect';
  attempted: boolean;
}