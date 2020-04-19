import { expect } from 'chai';
import { Game } from '../arcomage/src/app/engine/model/game'
import { PlayerMock } from './util/mock/player-mock'
import { GameState } from '../arcomage/src/app/engine/enum/game-state.enum';
import { GameSide } from '../arcomage/src/app/engine/enum/game-side.enum';

describe('Game', function () {
    describe('#changeGameStateIfWin()', function () {
        it('expect changeGameStateIfWin set to GameState.END and whoWin set null if both player have tower >= towerHeightForWin', function () {
            const playerRed = PlayerMock.EmptyPlayer();
            playerRed.castle.tower = 11;
            const playerBlue = PlayerMock.EmptyPlayer();
            playerBlue.castle.tower = 10;
            const game = new Game(null, playerRed, playerBlue, 10);
            game['changeGameStateIfWin']();
            expect(game.gameState).to.be.equal(GameState.END);
            expect(game.whoWin).to.be.null;
        });
        it('expect changeGameStateIfWin set to GameState.END and playerRed as winner if playerRed have tower >= towerHeightForWin and playerBlue have tower < towerHeightForWin', function () {
            const playerRed = PlayerMock.EmptyPlayer();
            playerRed.castle.tower = 11;
            const playerBlue = PlayerMock.EmptyPlayer();
            playerBlue.castle.tower = 9;
            const game = new Game(null, playerRed, playerBlue, 10);
            game['changeGameStateIfWin']();
            expect(game.gameState).to.be.equal(GameState.END);
            expect(game.whoWin).to.be.equal(GameSide.PLAYER_RED);
        });
        it('expect changeGameStateIfWin set to GameState.END and playerBlue as winner if playerBlue have tower >= towerHeightForWin and playerRed have tower < towerHeightForWin', function () {
            const playerRed = PlayerMock.EmptyPlayer();
            playerRed.castle.tower = 9;
            const playerBlue = PlayerMock.EmptyPlayer();
            playerBlue.castle.tower = 11;
            const game = new Game(null, playerRed, playerBlue, 10);
            game['changeGameStateIfWin']();
            expect(game.gameState).to.be.equal(GameState.END);
            expect(game.whoWin).to.be.equal(GameSide.PLAYER_BLUE);
        });
        it('expect changeGameStateIfWin set to GameState.END and whoWin set null if both player have tower == 0', function () {
            const playerRed = PlayerMock.EmptyPlayer();
            playerRed.castle.tower = 0;
            const playerBlue = PlayerMock.EmptyPlayer();
            playerBlue.castle.tower = 0;
            const game = new Game(null, playerRed, playerBlue, 10);
            game['changeGameStateIfWin']();
            expect(game.gameState).to.be.equal(GameState.END);
            expect(game.whoWin).to.be.null;
        });
        it('expect changeGameStateIfWin set to GameState.END and playerRed as winner if playerRed have tower > 0 and playerBlue have tower == 0', function () {
            const playerRed = PlayerMock.EmptyPlayer();
            playerRed.castle.tower = 4;
            const playerBlue = PlayerMock.EmptyPlayer();
            playerBlue.castle.tower = 0;
            const game = new Game(null, playerRed, playerBlue, 10);
            game['changeGameStateIfWin']();
            expect(game.gameState).to.be.equal(GameState.END);
            expect(game.whoWin).to.be.equal(GameSide.PLAYER_RED);
        });
        it('expect changeGameStateIfWin set to GameState.END and playerBlue as winner if playerBlue have tower > 0 and playerRed have tower == 0', function () {
            const playerRed = PlayerMock.EmptyPlayer();
            playerRed.castle.tower = 0;
            const playerBlue = PlayerMock.EmptyPlayer();
            playerBlue.castle.tower = 11;
            const game = new Game(null, playerRed, playerBlue, 10);
            game['changeGameStateIfWin']();
            expect(game.gameState).to.be.equal(GameState.END);
            expect(game.whoWin).to.be.equal(GameSide.PLAYER_BLUE);
        });
        it('expect changeGameStateIfWin don\'t change gameState to GameState.END if both player have tower > 0 and < towerHeightForWin', function () {
            const playerRed = PlayerMock.EmptyPlayer();
            playerRed.castle.tower = 5;
            const playerBlue = PlayerMock.EmptyPlayer();
            playerBlue.castle.tower = 3;
            const game = new Game(null, playerRed, playerBlue, 10);
            game['changeGameStateIfWin']();
            expect(game.gameState).to.be.equal(GameState.PLAY);
            expect(game.whoWin).to.be.null;
        });
    });
});

