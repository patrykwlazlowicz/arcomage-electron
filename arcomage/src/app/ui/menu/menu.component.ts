import { Component, OnInit } from '@angular/core';
import { MessagesMap } from '../../shared/util/messages-map';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  MESSAGES_MAP: typeof MessagesMap = MessagesMap;
  HOW_TO_PLAY_PATH: string = '/howtoplay';
  NEW_GAME_PATH: string = '/game/init';

  constructor() { }

  ngOnInit(): void {
  }

  exit(): void {
    window.close()
  }

}
