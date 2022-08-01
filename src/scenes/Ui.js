import Assets from '../core/AssetManager';
import { Container, Ticker } from 'pixi.js';
import GrainUI from './GrainUI';
import CowUI from './CowUI';
import HaneUI from './HaneUI';
import GoldUI from './GoldUI';

export default class Ui extends Container {
	/* eslint-disable */
	constructor() {
		super();

		this.stopCheckingGrain = false;

		this._start();

		this.on('product_ready', this.onProductReady)
			.on('grain_harvested', this.onGrainHarvested)
			.on('animals_fed', this.onAnimalsFed)
			.on('button_pressed', this.onButtonPressed);
	}

	_start() {
		this.grainUI = new GrainUI();
		this.addChild(this.grainUI);

		this.cowUI = new CowUI();
		this.addChild(this.cowUI);

		this.haneUI = new HaneUI();
		this.addChild(this.haneUI);

		this.goldUI = new GoldUI();
		this.addChild(this.goldUI);

		this.ticker = new Ticker();
		this.ticker.autoStart = true;
		this.update = function () {
			const numeralGrain = this.grainUI.numeralProduct;
			const play = this.parent;
			if (numeralGrain > 0 && !this.stopCheckingGrain) {
				this.stopCheckingGrain = true;
				play.emit('feed_animals', numeralGrain);
			}
		};
		this.update = this.update.bind(this);
		this.ticker.add(this.update);
	}

	onButtonPressed(kindButton) {
		switch (kindButton) {
			case 'cow':
				this.cowUI.switchButton(false);
				this.goldUI.increaseProduct(this.cowUI.numeralProduct * this.cowUI.price);
				this.cowUI.increaseProduct(-this.cowUI.numeralProduct);
				break;
			case 'hane':
				this.haneUI.switchButton(false);
				this.goldUI.increaseProduct(this.haneUI.numeralProduct * this.haneUI.price);
				this.haneUI.increaseProduct(-this.haneUI.numeralProduct);
				break;
		}
	}

	onAnimalsFed(grainTaken) {
		this.grainUI.increaseProduct(-grainTaken);
		this.stopCheckingGrain = false;
	}

	onGrainHarvested(numeralGrain) {
		this.grainUI.increaseProduct(numeralGrain);
		this.grainUI.switchButton(false);
	}

	onProductReady(kindProduct) {
		switch (kindProduct) {
			case 'grain':
				this.grainUI.switchButton(true);
				break;
			case 'cow':
				this.cowUI.increaseProduct();
				this.cowUI.switchButton(true);
				break;
			case 'hane':
				this.haneUI.increaseProduct();
				this.haneUI.switchButton(true);
				break;
		}
	}
}
