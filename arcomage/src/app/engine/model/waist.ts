import { WaistDTO } from '../dto/waist-dto';
import { CardDTO } from '../dto/card-dto';
import _ from 'lodash';
import { CARD_IDX } from '../enum/card-idx.enum';

import CARDS from '../../../assets/cards.json';

export interface DealCards {
    playerRed: CardDTO[];
    playerBlue: CardDTO[];
}

export class Waist implements WaistDTO {

    private static BASE_WAIST: CardDTO[] = _.map(CARDS, (card) => <CardDTO>card);

    waist: CardDTO[];
    discardedWaist: CardDTO[];

    constructor() {
        this.waist = _.shuffle(Waist.BASE_WAIST);;
        this.discardedWaist = [];
    }

    dealCards(): DealCards {
        const dealedCards: DealCards = {
            playerRed: [],
            playerBlue: []
        }
        for (let i = 0; i < CARD_IDX.LENGTH; ++i) {
            dealedCards.playerRed.push(this.nextCard());
            dealedCards.playerBlue.push(this.nextCard());
        }
        return dealedCards;
    }

    nextCard(): CardDTO {
        if (_.isEmpty(this.waist)) {
            this.waist = _.shuffle(this.discardedWaist);
            this.discardedWaist = [];
        }
        const nextCard: CardDTO = _.head(this.waist);
        this.waist = _.tail(this.waist);
        return nextCard;
    }
}
