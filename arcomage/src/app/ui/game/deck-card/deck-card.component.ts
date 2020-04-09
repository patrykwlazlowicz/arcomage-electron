import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameImages } from '../../enum/game-images.enum';


@Component({
  selector: 'game-deck-card',
  templateUrl: './deck-card.component.html',
  styleUrls: ['./deck-card.component.css']
})
export class DeckCardComponent implements OnInit {
  
  GAME_IMAGES = GameImages;

  @Input() imgName: string;
  @Input() cardIdx: number;
  @Input() canAfford: boolean;

  @Output() playCard: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
