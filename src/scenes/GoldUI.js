import Assets from '../core/AssetManager';
import { Sprite, Text } from 'pixi.js';
import UiObject from './UiObject';

export default class GoldUI extends UiObject {
	/* eslint-disable */
	constructor() {
		super();

		const _sprite = this.createSprite();
	}

	async createSprite() {
		const images = { gold: Assets.images.gold };

		await Assets.load({ images });
		await Assets.prepareImages(images);

		const sprite = Sprite.from('gold');

		this.onCreating(sprite);
		sprite.x = -550;
		sprite.y = -250;
		sprite.scale.x = 0.42;
		sprite.scale.y = 0.42;

		this._numeralGold = sprite.children[0];
		this._numeralGold.scale.x = 5.5;
		this._numeralGold.scale.y = 5.5;
		this._numeralGold.x = 280;
		this._numeralGold.y = -80;
	}
}
