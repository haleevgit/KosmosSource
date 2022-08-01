import Assets from '../core/AssetManager';
import { Container, Text, TextStyle } from 'pixi.js';

export default class UiObject extends Container {
	/* eslint-disable */
	constructor() {
		super();

		this.numeralProduct = 0;
	}

	switchButton(isOn) {
		if (isOn) {
			this.button.alpha = 1;
			this.button.interactive = true;
		} else {
			this.button.alpha = 0.5;
			this.button.interactive = false;
		}
	}

	increaseProduct(numeral = 1) {
		let numeralProduct = Number(this.sprite.children[0].text);
		numeralProduct += numeral;
		this.numeralProduct = numeralProduct;
		this.sprite.children[0].text = numeralProduct;
	}

	onCreating(sprite, text = false, spriteButton = false) {
		this.button = spriteButton;
		this.sprite = sprite;

		this.sprite.anchor.set(0.5);

		this.addChild(this.sprite);

		this.sprite.interactive = false;
		this.sprite.dragging = false;
		this.sprite.number = 0;

		const style = new TextStyle({
			fontFamily: 'Arial',
			fontSize: 20,
			fontStyle: 'italic',
			fontWeight: 'bold',
			fill: ['#ffffff', '#00ff99'], // gradient
			stroke: '#4a1850',
			strokeThickness: 5,
			dropShadow: true,
			dropShadowColor: '#000000',
			dropShadowBlur: 4,
			dropShadowAngle: Math.PI / 6,
			dropShadowDistance: 6,
			wordWrap: true,
			wordWrapWidth: 440,
			lineJoin: 'round',
		});

		const numberObject = new Text(sprite.number, style);
		this.sprite.addChild(numberObject);
		numberObject.x = 150;
		numberObject.y = 0;

		if (this.button) {
			this.button.interactive = true;
			this.button.on('pointerdown', this.onPointerDown, this);
			this.addChild(this.button);
		}

		if (text) this.addChild(text);
	}

	onPointerDown() {
		const play = this.sprite.parent.parent.parent;
		const kindOfProducts = this.sprite.parent.kind;
		this.button.alpha = 0.5;
		play.emit('button_pressed', kindOfProducts);
	}
}
