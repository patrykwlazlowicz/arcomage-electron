import { Injectable } from '@angular/core';
import CARDS from '../../../assets/cards.json';
import { Card } from '../model/card';
import { Player } from '../model/player';
import * as _ from 'lodash';

@Injectable()
export class TableService {

  private waist: Card[] = [];
  private discardedWaist: Card[] = [];
  private playerRed: Player;
  private playerBlue: Player;

  constructor() {
    this.waist = _.map(CARDS, (card) => <Card>card);
  }
}
