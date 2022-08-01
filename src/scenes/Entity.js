import Assets from '../core/AssetManager';
import { Container, Ticker } from 'pixi.js';

export default class Entity extends Container {
	/* eslint-disable */
	constructor() {
		super();
	}

	onCreating(sprite) {
		this.sprite = sprite;

		this.sprite.anchor.set(0.5);

		this.addChild(this.sprite);

		this.sprite.interactive = true;
		this.sprite.dragging = false;

		this.sprite
			.on('pointerdown', this.onDragStart)
			.on('pointerup', this.onDragEnd)
			.on('pointerupoutside', this.onDragEnd)
			.on('pointermove', this.onDragMove);

		this.sprite.installed = false;
		this.currentTime = 0;

		let play = this.sprite.parent.parent.parent;

		this.ticker = new Ticker();
		this.ticker.autoStart = true;
		this.update = function (time) {
			if (this.installed && !this.sprite.stopGrown) {
				this.currentTime += time / 60;
				this.sprite.children[0].alpha = this.currentTime / sprite.timeGrown;
				if (this.currentTime > this.sprite.timeGrown) {
					this.sprite.grainLeft -= 1;
					if (this.sprite.grainLeft < 1) this.sprite.stopGrown = true;
					this.sprite.productReady = true;
					this.currentTime = 0;
					play.emit('product_ready', this.sprite.kind, this.sprite.numberField);
				}
			}
		};
		this.update = this.update.bind(this);
		this.ticker.add(this.update);
	}

	onDragStart(event) {
		this.data = event.data;
		this.alpha = 0.5;
		this.dragging = true;
		this._beginX = this.x;
		this._beginY = this.y;
	}

	onDragEnd() {
		this.alpha = 1;
		this.dragging = false;
		this.data = null;

		if (this.x > -290 && this.x < 290 && this.y > -310 && this.y < 270) {
			this.constX = -290 + Math.floor((this.x + 290) / 72.5) * 72.5 + 36.25;
			this.constY = -310 + Math.floor((this.y + 310) / 72.5) * 72.5 + 36.25;
			this.numberCage = (this.constX + 253.75) / 72.5 + (8 * (this.constY + 273.75)) / 72.5;
			if (this.parent.parent.isCageFree(this.numberCage, this)) {
				this.x = this.constX;
				this.y = this.constY;
				this.numberField = this.numberCage;
				this.off('pointerdown', this.onDragStart)
					.off('pointerup', this.onDragEnd)
					.off('pointerupoutside', this.onDragEnd)
					.off('pointermove', this.onDragMove);
				this.parent.installed = true;
				return;
			}
		}
		this.x = this._beginX;
		this.y = this._beginY;
	}

	onDragMove() {
		if (this.dragging) {
			const newPosition = this.data.getLocalPosition(this.parent);
			this.x = newPosition.x;
			this.y = newPosition.y;
		}
	}
}
