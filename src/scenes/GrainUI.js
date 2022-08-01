import Assets from '../core/AssetManager';
import { Sprite, Text } from 'pixi.js';
import UiObject from './UiObject';

export default class GrainUI extends UiObject {
	/* eslint-disable */
	constructor() {
		super();

		const _sprite = this.createSprite();
		this.kind = 'grain';
	}

	async createSprite() {
		const images = { grain_ready: Assets.images.stog, button: Assets.images.button };

		await Assets.load({ images });
		await Assets.prepareImages(images);

		const sprite = Sprite.from('grain_ready');
		const spriteButton = Sprite.from('button');
		const text = 'TAKE GRAIN';

		const richText = new Text(text);
		richText.x = -605;
		richText.y = -55;

		this.onCreating(sprite, richText, spriteButton);
		sprite.x = -550;
		sprite.y = -125;
		sprite.scale.x = 0.45;
		sprite.scale.y = 0.45;

		spriteButton.x = -445;
		spriteButton.y = -65;
		spriteButton.scale.x = 0.45;
		spriteButton.scale.y = 0.45;
		spriteButton.alpha = 0.5;

		this._numeralGrain = sprite.children[0];
		this._numeralGrain.scale.x = 4;
		this._numeralGrain.scale.y = 4;
		this._numeralGrain.x = 170;
		this._numeralGrain.y = -50;
	}
}
