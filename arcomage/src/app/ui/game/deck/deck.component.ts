import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameDTO } from '../../../engine/dto/game-dto';
import { TableService } from '../../../engine/service/table.service';
import { CardClick } from '../../interface/card-click';

@Component({
  selector: 'game-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

  @Input() game: GameDTO;

  @Output() playCard: EventEmitter<CardClick> = new EventEmitter<CardClick>();

  constructor(private tableService: TableService) { }

  ngOnInit(): void {
  }

  canAffordCard(idx: number): boolean {
    return this.tableService.playerCanPlayThisCard(idx, this.game);
  }

}
