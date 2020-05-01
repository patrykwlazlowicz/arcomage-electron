import { GameSide } from '../../engine/enum/game-side.enum';
import { GameAction } from '../../engine/enum/game-action.enum';

export namespace MessagesMap {
    export const gameMenuHowToPlay = 'game.menu.how.to.play';
    export const gameMenuNewGame = 'game.menu.new.game';
    export const gameMenuExit = 'game.menu.exit';
    export const gameInitResourcesState = 'game.init.resources.state';
    export const gameInitResourcesGrowth = 'game.init.resources.growth';
    export const gameInitTower = 'game.init.tower';
    export const gameInitWall = 'game.init.wall';
    export const gameInitTowerToWin = 'game.init.tower.to.win';
    export const gameInitBack = 'game.init.back';
    export const gameInitStart = 'game.init.start';
    export const gameResourcesStatePrefix = 'game.resources.state.';
    export const gameResourcesGrowthPrefix = 'game.resources.growth.';
    export const gameResourcesKindBricks = 'bricks';
    export const gameResourcesKindGems = 'gems';
    export const gameResourcesKindRecruits = 'recruits';
    export const gameCastleTower = 'game.castle.tower';
    export const gameCastleWall = 'game.castle.wall';
    export const gameMsgPlayerRedPlay = 'game.msg.player.red.play';
    export const gameMsgPlayerRedDiscard = 'game.msg.player.red.discard'
    export const gameMsgPlayerRedHaveToDiscard = 'game.msg.player.red.have.to.discard';
    export const gameMsgPlayerBluePlay = 'game.msg.player.blue.play';
    export const gameMsgPlayerBlueDiscard = 'game.msg.player.blue.discard';
    export const gameMsgGameEndPlayerRedWin = 'game.msg.game.end.player.red.win';
    export const gameMsgGameEndPlayerBlueWin = 'game.msg.game.end.player.blue.win';
    export const gameMsgGameEndDraw = 'game.msg.game.end.draw';
    export function mapBySideAndAction(side: GameSide, action: GameAction): string {
        switch (side) {
            case GameSide.PLAYER_RED: switch (action) {
                case GameAction.PLAY: return gameMsgPlayerRedPlay;
                case GameAction.DISCARD: return gameMsgPlayerRedDiscard;
            }
            case GameSide.PLAYER_BLUE: switch (action) {
                case GameAction.PLAY: return gameMsgPlayerBluePlay;
                case GameAction.DISCARD: return gameMsgPlayerBlueDiscard;
            }
        }
    }
    export function mapGameEnd(winner: GameSide): string {
        switch (winner) {
            case GameSide.PLAYER_RED: return gameMsgGameEndPlayerRedWin;
            case GameSide.PLAYER_BLUE: return gameMsgGameEndPlayerBlueWin;
            default: return gameMsgGameEndDraw;
        }
    }
};