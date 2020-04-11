import { GameSide } from 'src/app/engine/enum/game-side.enum';
import { GameAction } from 'src/app/engine/enum/game-action.enum';

const MessagesMap = {
    gameMsgPlayerRedPlay: 'game.msg.player.red.play',
    gameMsgPlayerRedDiscard: 'game.msg.player.red.discard',
    gameMsgPlayerRedHaveToDiscard: 'game.msg.player.red.have.to.discard',
    gameMsgPlayerBluePlay: 'game.msg.player.blue.play',
    gameMsgPlayerBlueDiscard: 'game.msg.player.blue.discard',
    gameMsgGameEndPlayerRedWin: 'game.msg.game.end.player.red.win',
    gameMsgGameEndPlayerBlueWin: 'game.msg.game.end.player.blue.win',
    gameMsgGameEndDraw: 'game.msg.game.end.draw',
    mapBySideAndAction(side: GameSide, action: GameAction): string {
        switch (side) {
            case GameSide.PLAYER_RED: switch (action) {
                case GameAction.PLAY: return this.gameMsgPlayerRedPlay;
                case GameAction.DISCARD: return this.gameMsgPlayerRedDiscard;
            }
            case GameSide.PLAYER_BLUE: switch (action) {
                case GameAction.PLAY: return this.gameMsgPlayerBluePlay;
                case GameAction.DISCARD: return this.gameMsgPlayerBlueDiscard;
            }
        }
    },
    mapGameEnd(winner: GameSide): string {
        switch (winner) {
            case GameSide.PLAYER_RED: return this.gameMsgGameEndPlayerRedWin;
            case GameSide.PLAYER_BLUE: return this.gameMsgGameEndPlayerBlueWin;
            default: return this.gameMsgGameEndDraw;
        }
    }
};
export { MessagesMap };

export interface GameMessage {
    messageKey: string;
    messageImageName?: string;
}
