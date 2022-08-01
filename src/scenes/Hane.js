import Assets from '../core/AssetManager';
import { Container, Sprite } from 'pixi.js';
import Entity from './Entity';

export default class Hane extends Entity {
	/* eslint-disable */
	constructor() {
		super();

		const _sprite = this.createSprite();
	}

	async createSprite() {
		const images = { hane: Assets.images.hane_ready, edge: Assets.images.edge };

		await Assets.load({ images });
		await Assets.prepareImages(images);

		const sprite = Sprite.from('hane');

		const sprite_ready = Sprite.from('edge');
		sprite_ready.scale.x = 4;
		sprite_ready.scale.y = 4;
		sprite_ready.anchor.x = 0.5;
		sprite_ready.anchor.y = 0.5;
		sprite_ready.x = 0;
		sprite_ready.y = 0;
		this.onCreating(sprite);
		sprite_ready.alpha = 0;
		sprite.addChild(sprite_ready);
		sprite.x = 500;
		sprite.y = -70;
		sprite.scale.x = -0.03;
		sprite.scale.y = 0.03;
		sprite.kind = 'hane';
		sprite.timeGrown = 10;
		sprite.productReady = false;
		sprite.stopGrown = true;
		sprite.isFoodEnough = false;
		sprite.productForOneGrain = 3;
		sprite.grainLeft = 0;
	}
}
