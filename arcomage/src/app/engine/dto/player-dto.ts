import { CardDTO } from './card-dto';
import { ResourcesDTO } from './resources-dto';
import { CastleDTO } from './castle-dto';

export interface PlayerDTO {
	bricks: ResourcesDTO;
	gems: ResourcesDTO;
	recruits: ResourcesDTO;
	castle: CastleDTO;
	isMyTurn: boolean;
	haveCardToDiscard: number;
	cards: CardDTO[];
}
