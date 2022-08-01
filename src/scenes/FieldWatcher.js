import Assets from '../core/AssetManager';
import { Container, Sprite } from 'pixi.js';
import Cow from './Cow';
import Hane from './Hane';
import Grain from './Grain';

export default class FieldWatcher extends Container {
	/* eslint-disable */
	constructor() {
		super();

		this.on('product_ready', this.onProductReady).on('button_pressed', this.onButtonPressed).on('feed_animals', this.onFeedAnimals);

		this._startFiling();
	}

	_startFiling() {
		this._cow = new Cow();
		this.addChild(this._cow);

		this._hane = new Hane();
		this.addChild(this._hane);

		this._grain = new Grain();
		this.addChild(this._grain);

		this.field = [];

		for (let i = 0; i < 64; i += 1) {
			this.field[i] = 0;
		}
	}

	_hideReadySprite(kind, numberField) {
		const spriteToHide = this.field[numberField].children[0];
		spriteToHide.alpha = 0;
	}

	isCageFree(number, entity) {
		if (this.field[number] === 0) {
			this.field[number] = entity;
			switch (entity.kind) {
				case 'cow': {
					this._cow = new Cow();
					this.addChild(this._cow);
					break;
				}
				case 'hane': {
					this._hane = new Hane();
					this.addChild(this._hane);
					break;
				}
				case 'grain': {
					this._grain = new Grain();
					this.addChild(this._grain);
					break;
				}
			}
			return true;
		}
		return false;
	}

	onFeedAnimals(numeralGrain) {
		let grainTaken = 0;
		this.field.forEach((element) => {
			if (
				(element.kind === 'cow' || element.kind === 'hane') &&
				element.stopGrown === true &&
				grainTaken < numeralGrain &&
				element.grainLeft < 1
			) {
				element.stopGrown = false;
				grainTaken += 1;
				element.grainLeft = element.productForOneGrain;
			}
		});
		const play = this.parent;
		play.emit('animals_fed', grainTaken);
	}

	onButtonPressed() {
		let numeralGrain = this.field.reduce((accumulator, element) => {
			if (element.kind === 'grain' && element.productReady) {
				element.productReady = false;
				element.stopGrown = false;
				element.children[0].alpha = 0;
				return (accumulator += 1);
			} else {
				return accumulator;
			}
		}, 0);
		const play = this.parent;
		play.emit('grain_harvested', numeralGrain);
	}

	onProductReady(kindProduct, numberField) {
		switch (kindProduct) {
			case 'cow':
			case 'hane':
				this._hideReadySprite(kindProduct, numberField);
				break;
		}
	}
}
