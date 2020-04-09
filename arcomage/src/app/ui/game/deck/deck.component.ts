import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Game } from 'src/app/engine/model/game';
import { TableService } from 'src/app/engine/service/table.service';

@Component({
  selector: 'game-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

  @Input() game: Game;

  @Output() playCard: EventEmitter<number> = new EventEmitter();

  constructor(private tableService: TableService) { }

  ngOnInit(): void {
  }

  canAffordCard(idx: number): boolean {
    return this.tableService.playerCanPlayThisCard(idx, this.game);
  }

}
