import { Component, OnInit } from '@angular/core';
import { ResourcesSide } from '../enum/resources-side.enum';
import { GameImages } from '../enum/game-images.enum';
import { TableService } from 'src/app/engine/service/table.service';
import { GameDTO } from 'src/app/engine/dto/game-dto';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  
  RESOURCES_SIDE: typeof ResourcesSide = ResourcesSide;
  GAME_IMAGES: typeof GameImages = GameImages;

  game: GameDTO;

  constructor(private tableService: TableService ) { }

  ngOnInit(): void {
    this.game = this.tableService.createGame(25, 10, 15, 1, 50);
  }

  playCard(event: number) {
    console.log(event); 
    this.game = this.tableService.playerPlayCard(event, this.game);
    this.game.playerRed.isMyTurn = !(this.game.playerBlue.isMyTurn = false);
  }

}
