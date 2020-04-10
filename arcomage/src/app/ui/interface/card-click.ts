import { MouseButton } from '../enum/mouse-button.enum';

export interface CardClick {
    button: MouseButton;
    cardIdx: number;
}