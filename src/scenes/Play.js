import { Sprite } from 'pixi.js';
import Scene from './Scene';
import FieldWatcher from './FieldWatcher';
import Ui from './Ui';
import gsap from 'gsap';

export default class Play extends Scene {
	async onCreated() {
		const sprite = Sprite.from('gamepad');

		this.addChild(sprite);
		sprite.anchor.set(0.5);
		sprite.scale.x = 0.415;
		sprite.scale.y = 0.415;

		this._fieldWatcher = new FieldWatcher();
		this.addChild(this._fieldWatcher);

		this._ui = new Ui();
		this.addChild(this._ui);

		this.on('product_ready', this.onProductReady)
			.on('button_pressed', this.onButtonPressed)
			.on('grain_harvested', this.onGrainHarvested)
			.on('feed_animals', this.onFeedAnimals)
			.on('animals_fed', this.onAnimalsFed);
	}

	/**
	 * Hook called by the application when the browser window is resized.
	 * Use this to re-arrange the game elements according to the window size
	 *
	 * @param  {Number} width  Window width
	 * @param  {Number} height Window height
	 */
	onResize(width, height) {
		// eslint-disable-line no-unused-vars
	}

	onAnimalsFed(grainTaken) {
		this._ui.emit('animals_fed', grainTaken);
	}

	onFeedAnimals(numeralGrain) {
		this._fieldWatcher.emit('feed_animals', numeralGrain);
	}

	onGrainHarvested(numeralGrain) {
		this._ui.emit('grain_harvested', numeralGrain);
	}

	onProductReady(kindProduct, numberField) {
		this._ui.emit('product_ready', kindProduct);
		this._fieldWatcher.emit('product_ready', kindProduct, numberField);
	}

	onButtonPressed(kindButton) {
		switch (kindButton) {
			case 'grain':
				this._fieldWatcher.emit('button_pressed');
				break;
			case 'cow':
			case 'hane':
				this._ui.emit('button_pressed', kindButton);
				break;
		}
	}
}
