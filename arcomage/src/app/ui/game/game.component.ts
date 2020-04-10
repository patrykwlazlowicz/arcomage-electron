import { Component, OnInit } from '@angular/core';
import { ResourcesSide } from '../enum/resources-side.enum';
import { GameImages } from '../enum/game-images.enum';
import { TableService } from 'src/app/engine/service/table.service';
import { AIService } from 'src/app/engine/service/ai.service';
import { GameDTO } from 'src/app/engine/dto/game-dto';
import { CardClick } from '../interface/card-click';
import { MouseButton } from '../enum/mouse-button.enum';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  
  RESOURCES_SIDE: typeof ResourcesSide = ResourcesSide;
  GAME_IMAGES: typeof GameImages = GameImages;

  game: GameDTO;

  constructor(private tableService: TableService, private aiService: AIService) { }

  ngOnInit(): void {
    this.game = this.tableService.createGame(25, 10, 15, 1, 50);
  }

  playCard(event: CardClick) {
    if (event.button === MouseButton.LEFT) {
      this.game = this.tableService.playerPlayCard(event.cardIdx, this.game);
    } else {
      this.game = this.tableService.playerDiscardCard(event.cardIdx, this.game);
    }
    if (!this.game.playerRed.isMyTurn) {
      this.game = this.aiService.playPoorAI(this.game);
    }
  }

}
