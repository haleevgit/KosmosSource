import Assets from '../core/AssetManager';
import { Sprite, Text } from 'pixi.js';
import UiObject from './UiObject';

export default class Grain extends UiObject {
	/* eslint-disable */
	constructor() {
		super();

		this.kind = 'cow';
		this.price = 2;
		const _sprite = this.createSprite();
	}

	async createSprite() {
		const images = { milk: Assets.images.milk, button: Assets.images.button };

		await Assets.load({ images });
		await Assets.prepareImages(images);

		const sprite = Sprite.from('milk');
		const spriteButton = Sprite.from('button');
		const text = 'SALE MILK!';

		const richText = new Text(text);
		richText.x = -605;
		richText.y = 100;

		this.onCreating(sprite, richText, spriteButton);
		sprite.x = -550;
		sprite.y = 50;
		sprite.scale.x = 0.05;
		sprite.scale.y = 0.05;

		spriteButton.x = -445;
		spriteButton.y = 90;
		spriteButton.scale.x = 0.45;
		spriteButton.scale.y = 0.45;
		spriteButton.alpha = 0.5;

		this._numeralMilk = sprite.children[0];
		this._numeralMilk.scale.x = 35;
		this._numeralMilk.scale.y = 35;
		this._numeralMilk.x = 1500;
		this._numeralMilk.y = -650;
	}
}
