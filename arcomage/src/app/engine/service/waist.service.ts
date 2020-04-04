import { Injectable } from '@angular/core';
import { Card } from '../model/card';
import * as _ from 'lodash';
import { DealCards, NextCardFromWaist } from '../util/waist-dealings';
import { CARD_IDX } from '../enum/card-idx.enum';


import CARDS from '../../../assets/cards.json';

@Injectable()
export class WaistService {

  private static BASE_WAIST: Card[] = _.map(CARDS, (card) => <Card>card);

  createWaist(): Card[] {
    return _.shuffle(WaistService.BASE_WAIST);
  }

  dealCards(waist: Card[]): DealCards {
    const playerRed: Card[] = [];
    const playerBlue: Card[] = [];
    let newWaist: Card[] = _.slice(waist);
    for (let i = 0, nextCardFromWaist; i < CARD_IDX.LENGTH; ++i) {
      nextCardFromWaist = this.nextCardFromWaist(newWaist, []);
      playerRed.push(nextCardFromWaist.card);
      newWaist = nextCardFromWaist.waist;
      nextCardFromWaist = this.nextCardFromWaist(newWaist, []);
      playerRed.push(nextCardFromWaist.card);
      newWaist = nextCardFromWaist.waist;
    }
    return {
      playerRed,
      playerBlue,
      waist: newWaist
    }
  }

  nextCardFromWaist(waist: Card[], discardedWaist: Card[]): NextCardFromWaist {
    let newWaist = _.slice(waist);
    let newDiscardedWaist = _.slice(discardedWaist);
    if (_.isEmpty(waist)) {
      newWaist = _.shuffle(newDiscardedWaist);
      newDiscardedWaist = [];
    }
    return {
      card: _.head(newWaist),
      waist: _.tail(newWaist),
      discardedWaist: newDiscardedWaist
    };
  }

}
