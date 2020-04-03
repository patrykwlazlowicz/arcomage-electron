import { Card } from './card';
import { Resources } from './resources';
import { Castle } from './castle';

export class Player {
	bricks: Resources;
	gems: Resources;
	recruits: Resources;
	castle: Castle;
	isMyTurn: boolean;
	cards: Card[];

	constructor(bricksState: number, bricksGrowth: number, gemsState: number, gemsGrowth: number, recruitsState: number, recruitsGrowth: number, towerHeight: number, wallHeight: number) {
		this.bricks.state = bricksState;
		this.bricks.growth = gemsState;
		this.gems.state = recruitsState;
		this.gems.growth = bricksGrowth;
		this.recruits.state = gemsGrowth;
		this.recruits.growth = recruitsGrowth;
		this.castle.tower = towerHeight;
		this.castle.wall = wallHeight;
	}
}
