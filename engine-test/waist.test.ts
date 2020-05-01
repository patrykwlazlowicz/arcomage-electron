import { expect } from 'chai';
import { Waist, DealCards } from '../arcomage/src/app/engine/model/waist'
import { WaistChecker } from './util/waist-checker';
import { CardDTO } from '../arcomage/src/app/engine/dto/card-dto';

describe('Waist', function () {
    describe('#constructor()', function () {
        it('expect waist.waist have ' + WaistChecker.WaistSize + ' cards and waist.discardedWaist is empty', function () {
            const waist = new Waist();
            expect(waist).to.have.property('waist').with.lengthOf(WaistChecker.WaistSize);
            expect(waist).to.have.property('discardedWaist').with.lengthOf(0);
        });
        it('expect waist.waist have unique cards', function () {
            const waist = new Waist();
            WaistChecker.CardsAreUnique(waist);
        });
    });
    describe('#dealCards()', function () {
        it('expect after calling function will be ' + WaistChecker.WaistSize + ' together in decks and waist', function () {
            const waist = new Waist();
            const cardDeal: DealCards = waist.dealCards();
            WaistChecker.ProperAmountOfCard(waist, cardDeal.playerRed, cardDeal.playerBlue);
        });
        it('expect after calling function cards in decks and waist will be unique', function () {
            const waist = new Waist();
            const cardDeal: DealCards = waist.dealCards();
            WaistChecker.CardsAreUnique(waist, cardDeal.playerRed, cardDeal.playerBlue);
        });
        it('expect dealCards return six cards for both player', function () {
            const waist = new Waist();
            const cardDeal: DealCards = waist.dealCards();
            expect(cardDeal).to.have.property('playerRed').with.lengthOf(WaistChecker.DeckSize);
            expect(cardDeal).to.have.property('playerBlue').with.lengthOf(WaistChecker.DeckSize);
        });
    });
    describe('#nextCard()', function () {
        it('expect after calling nextCard waist.waist will have one card less and waist.discardedWaist will have no card', function () {
            const waist = new Waist();
            waist.discardedWaist = waist.waist;
            waist.waist = [];
            waist.nextCard();
            expect(waist).to.have.property('waist').with.lengthOf(WaistChecker.WaistSize - 1);
            expect(waist).to.have.property('discardedWaist').with.lengthOf(0);
        });

        describe('Test multiple calling nextCard function', function () {
            const waist = new Waist();
            for (let i = 0; i < WaistChecker.WaistSize * 3 + 1; ++i) {
                it('expect after ' + (i + 1) + ' calling is ' + WaistChecker.WaistSize 
                + ' all cards, all cards are unique and waist.waist have ' 
                + (WaistChecker.WaistSize - (i % WaistChecker.WaistSize + 1)) + ' cards', function () {
                    const nextCard: CardDTO = waist.nextCard();
                    WaistChecker.ProperAmountOfCard(waist, [nextCard], []);
                    WaistChecker.CardsAreUnique(waist, [nextCard]);
                    expect(waist).to.have.property('waist').with.lengthOf(WaistChecker.WaistSize - (i % WaistChecker.WaistSize + 1));
                    expect(waist).to.have.property('discardedWaist').with.lengthOf(i % WaistChecker.WaistSize);
                    waist.discardedWaist.push(nextCard);
                });
            }
        });
    });
});

