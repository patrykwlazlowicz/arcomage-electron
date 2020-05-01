import { Component, OnInit } from '@angular/core';
import { MessagesMap } from '../../shared/util/messages-map';

@Component({
  selector: 'app-how-to-play',
  templateUrl: './how-to-play.component.html',
  styleUrls: ['./how-to-play.component.css']
})
export class HowToPlayComponent implements OnInit {

  MESSAGES_MAP: typeof MessagesMap = MessagesMap;
  BACK_PATH: string = '/menu';
  
  constructor() { }

  ngOnInit(): void {
  }

}
