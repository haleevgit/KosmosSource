export default {
	view: {
		width: window.innerWidth,
		height: window.innerHeight,
		backgroundColor: 0xffffff,
		worldWidth: 1280,
		worldHeight: 720,
		resizeTo: window,
		centerOnResize: true,
	},
	game: {
		width: 1280,
		height: 720,
		drag: false,
		pinch: true,
		decelerate: true,
		wheel: true,
	},
	scenes: {
		Splash: {
			hideDelay: 0,
		},
	},
	assets: {
		root: '/',
	},
};
