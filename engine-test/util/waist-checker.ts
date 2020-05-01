import { expect } from 'chai';
import { Waist } from '../../arcomage/src/app/engine/model/waist';
import { CardDTO } from '../../arcomage/src/app/engine/dto/card-dto';

export class WaistChecker {
    static WaistSize: number = 102;
    static DeckSize: number = 6;
    static ProperAmountOfCard(waist: Waist, deckOne: CardDTO[], deckTwo: CardDTO[]) {
        expect(WaistChecker.AllCardsAmount(waist, deckOne, deckTwo)).to.equal(WaistChecker.WaistSize);
    };
    static CardsAreUnique(waist: Waist, deckOne: CardDTO[] = [], deckTwo: CardDTO[] = []) {
        const cardSet: Set<CardDTO> = new Set<CardDTO>();
        for (let card of waist.waist) {
            cardSet.add(card);
        }
        for (let card of waist.discardedWaist) {
            cardSet.add(card);
        }
        for (let card of deckOne) {
            cardSet.add(card);
        }
        for (let card of deckTwo) {
            cardSet.add(card);
        }
        expect(cardSet).lengthOf(WaistChecker.WaistSize);
    };
    private static AllCardsAmount(waist: Waist, deckOne: CardDTO[], deckTwo: CardDTO[]): number {
        return waist.waist.length + waist.discardedWaist.length + deckOne.length + deckTwo.length;
    }
}