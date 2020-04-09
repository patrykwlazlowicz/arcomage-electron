import { Component, OnInit } from '@angular/core';
import { ResourcesSide } from '../enum/resources-side.enum';
import { GameImages } from '../enum/game-images.enum';
import { TableService } from 'src/app/engine/service/table.service';
import { Game } from 'src/app/engine/model/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  
  RESOURCES_SIDE: typeof ResourcesSide = ResourcesSide;
  GAME_IMAGES: typeof GameImages = GameImages;

  game: Game;

  constructor(private tableService: TableService ) { }

  ngOnInit(): void {
    this.game = this.tableService.createGame(25, 10, 5, 1, 50);
  }

  playCard(event: any) {
    console.log(event);    
  }

}
