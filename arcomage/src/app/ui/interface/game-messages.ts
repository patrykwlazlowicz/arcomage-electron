import { UsedBySide } from 'src/app/engine/enum/used-by-side.enum';
import { UsedAction } from 'src/app/engine/enum/used-action.enum';

const MessagesMap = {
    gameMsgPlayerRedPlay: 'game.msg.player.red.play',
    gameMsgPlayerRedDiscard: 'game.msg.player.red.discard',
    gameMsgPlayerRedHaveToDiscard: 'game.msg.player.red.have.to.discard',
    gameMsgPlayerBluePlay: 'game.msg.player.blue.play',
    gameMsgPlayerBlueDiscard: 'game.msg.player.blue.discard',
    mapBySideAndAction(side: UsedBySide, action: UsedAction): string {
        switch (side) {
            case UsedBySide.PLAYER_RED: switch (action) {
                case UsedAction.PLAY: return this.gameMsgPlayerRedPlay;
                case UsedAction.DISCARD: return this.gameMsgPlayerRedDiscard;
            }
            case UsedBySide.PLAYER_BLUE: switch (action) {
                case UsedAction.PLAY: return this.gameMsgPlayerBluePlay;
                case UsedAction.DISCARD: return this.gameMsgPlayerBlueDiscard;
            }
        }
    }
};
export { MessagesMap };

export interface GameMessage {
    messageKey: string;
    messageImageName?: string;
}
