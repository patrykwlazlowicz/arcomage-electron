import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameDTO } from 'src/app/engine/dto/game-dto';
import { TableService } from 'src/app/engine/service/table.service';

@Component({
  selector: 'game-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

  @Input() game: GameDTO;

  @Output() playCard: EventEmitter<number> = new EventEmitter();

  constructor(private tableService: TableService) { }

  ngOnInit(): void {
  }

  canAffordCard(idx: number): boolean {
    return this.tableService.playerCanPlayThisCard(idx, this.game);
  }

}
