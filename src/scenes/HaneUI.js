import Assets from '../core/AssetManager';
import { Sprite, Text } from 'pixi.js';
import UiObject from './UiObject';

export default class HaneUI extends UiObject {
	/* eslint-disable */
	constructor() {
		super();

		const _sprite = this.createSprite();
		this.kind = 'hane';
		this.price = 1;
	}

	async createSprite() {
		const images = { edge: Assets.images.edge, button: Assets.images.button };

		await Assets.load({ images });
		await Assets.prepareImages(images);

		const sprite = Sprite.from('edge');
		const spriteButton = Sprite.from('button');
		const text = 'SALE EDGE!';

		const richText = new Text(text);
		richText.x = -605;
		richText.y = 275;

		this.onCreating(sprite, richText, spriteButton);
		sprite.x = -550;
		sprite.y = 220;
		sprite.scale.x = 0.2;
		sprite.scale.y = 0.2;

		spriteButton.x = -445;
		spriteButton.y = 265;
		spriteButton.scale.x = 0.45;
		spriteButton.scale.y = 0.45;
		spriteButton.alpha = 0.5;

		this._numeralEdge = sprite.children[0];
		this._numeralEdge.scale.x = 9;
		this._numeralEdge.scale.y = 9;
		this._numeralEdge.x = 350;
		this._numeralEdge.y = -150;
	}
}
