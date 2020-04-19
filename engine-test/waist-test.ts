import { expect } from 'chai';
import { Waist, DealCards } from '../arcomage/src/app/engine/model/waist'
import { WaistChecker } from './util/waist-checker';
import _ from 'lodash';
import { CardDTO } from '../arcomage/src/app/engine/dto/card-dto';

describe('Waist', function () {
    describe('#constructor()', function () {
        it('should have 102 cards in waist and empty array of discorded cards', function () {
            const waist = new Waist();
            expect(waist).to.have.property('waist').with.lengthOf(WaistChecker.WaistSize);
            expect(waist).to.have.property('discardedWaist').with.lengthOf(0);
        });
        it('should have 102 unique cards in waist', function () {
            const waist = new Waist();
            WaistChecker.CardsAreUnique(waist);
        });
    });
    describe('#dealCards()', function () {
        it('should be 102 all cards after dealing', function () {
            const waist = new Waist();
            const cardDeal: DealCards = waist.dealCards();
            WaistChecker.ProperAmountOfCard(waist, cardDeal.playerRed, cardDeal.playerBlue);
        });
        it('should be 102 unique cards after dealing', function () {
            const waist = new Waist();
            const cardDeal: DealCards = waist.dealCards();
            WaistChecker.CardsAreUnique(waist, cardDeal.playerRed, cardDeal.playerBlue);
        });
        it('should deal both player six cards', function () {
            const waist = new Waist();
            const cardDeal: DealCards = waist.dealCards();
            expect(cardDeal).to.have.property('playerRed').with.lengthOf(WaistChecker.DeckSize);
            expect(cardDeal).to.have.property('playerBlue').with.lengthOf(WaistChecker.DeckSize);
        });
    });
    describe('#nextCard()', function () {
        it('should shuffle card if waist are empty', function () {
            const waist = new Waist();
            waist.discardedWaist = waist.waist;
            waist.waist = [];
            waist.nextCard();
            expect(waist).to.have.property('waist').with.lengthOf(WaistChecker.WaistSize - 1);
            expect(waist).to.have.property('discardedWaist').with.lengthOf(0);
        });

        describe('should properly give next card', function () {
            const waist = new Waist();
            for (let i: number = 0; i < 2; ++i) {
                expect(waist).to.have.property('waist').with.lengthOf(WaistChecker.WaistSize - i);
                expect(waist).to.have.property('discardedWaist').with.lengthOf(i);
                console.log("waist " + waist.waist.length);
                console.log("discardedWaist " + waist.discardedWaist.length);
                const nextCard: CardDTO = waist.nextCard();
                console.log("next Card");
                expect(waist).to.have.property('waist').with.lengthOf(WaistChecker.WaistSize - 1 - i);
                expect(waist).to.have.property('discardedWaist').with.lengthOf(i);
                console.log("waist " + waist.waist.length);
                console.log("discardedWaist " + waist.discardedWaist.length);
                it((i + 1) + ' card giving', function () {
                    console.log(waist.waist.length);
                    console.log(waist.discardedWaist.length);
                    console.log(waist.waist.length + waist.discardedWaist.length + [nextCard].length + [].length);
                    WaistChecker.ProperAmountOfCard(waist, [nextCard], []);
                    WaistChecker.CardsAreUnique(waist, [nextCard]);
                    expect(waist).to.have.property('waist').with.lengthOf(WaistChecker.WaistSize - (i % WaistChecker.WaistSize + 1));
                });
                waist.discardedWaist.push(nextCard);
            }
        });
    });
});

