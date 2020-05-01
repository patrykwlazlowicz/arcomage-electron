import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameMessage } from '../../interface/game-messages';
import _ from 'lodash';
import { GameImages } from '../../enum/game-images.enum';

@Component({
  selector: 'game-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {

  SHOW_OVERLAY_DELAY:number = 10;
  HIDE_OVERLAY_DELAY:number = 1000;
  TRANSITION_PROPERY_NAME:string = 'visibility';
  GAME_IMAGES: typeof GameImages = GameImages;

  hideOverlay: boolean = false;
  showOverlay: boolean = false;
  messages: GameMessage[] = [];
  currentMessage: GameMessage = null;

  @Output() allMessagesShowed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set newMessages(newMessages: GameMessage[]) {
    this.messages = newMessages;
    if (!_.isEmpty(this.messages)) {
      this.showOverlayWithOldestMessage();
    }
  }

  overlayClosed(event: TransitionEvent): void {
    if (_.isEqual(event.propertyName, this.TRANSITION_PROPERY_NAME)) {
      this.showOverlay = false;
      this.hideOverlay = false;
      if (!_.isEmpty(this.messages)) {
        this.showOverlayWithOldestMessage();
      } else {
          this.currentMessage = null;
          this.allMessagesShowed.emit(true);
      }
    }
  }

  private showOverlayWithOldestMessage(): void {
    this.currentMessage = _.head(this.messages);
    this.messages = _.tail(this.messages);
    setTimeout(() => this.showOverlay = true, this.SHOW_OVERLAY_DELAY);
    setTimeout(() => this.hideOverlay = true, this.HIDE_OVERLAY_DELAY);
  }

}
