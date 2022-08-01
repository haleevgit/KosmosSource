import Assets from '../core/AssetManager';
import { Container, Sprite } from 'pixi.js';
import Entity from './Entity';

export default class Grain extends Entity {
	/* eslint-disable */
	constructor() {
		super();

		const _sprite = this.createSprite();
	}

	async createSprite() {
		const images = { grain: Assets.images.field_ready, grain_ready: Assets.images.stog };

		await Assets.load({ images });
		await Assets.prepareImages(images);

		const sprite = Sprite.from('grain');
		const sprite_ready = Sprite.from('grain_ready');
		sprite_ready.scale.x = 20;
		sprite_ready.scale.y = 20;
		sprite_ready.anchor.x = 0.5;
		sprite_ready.anchor.y = 0.5;
		sprite_ready.x = 0;
		sprite_ready.y = 0;
		this.onCreating(sprite);
		sprite_ready.alpha = 0;
		sprite.addChild(sprite_ready);
		sprite.x = 500;
		sprite.y = 30;
		sprite.scale.x = -0.02;
		sprite.scale.y = 0.02;
		sprite.kind = 'grain';
		sprite.timeGrown = 10;
		sprite.productReady = false;
		sprite.stopGrown = false;
		sprite.isFoodEnough = true;
		sprite.grainLeft = 1;
	}
}
