<script lang="ts">
import CharacterDrawer from '../code/character-drawer';
import CharacterBuilder from '../code/character-builder';
import BackgroundDrawer from '../code/background-drawer';
import { Character } from '../types/character';
import getRandomArrayElement from '../code/get-random-array-element';
import { BackgroundType } from '../types/background-type.d.ts';
import Clipper from '../code/clipper';
import ColorSet from '../code/color-set';

export default {
	data() {
		return {
			avatarContext: null as (CanvasRenderingContext2D | null),
			character: null as (Character<HTMLImageElement> | null),
			characterBuilder: new CharacterBuilder(),
			characterDrawer: new CharacterDrawer(),
			backgroundDrawer: new BackgroundDrawer(),
			isCircle: false,
			backgroundType: BackgroundType.solid,
			backgroundColor: '',
			clipper: new Clipper(),
		}
	},

	methods: {
		generateAvatar() {
			this.characterBuilder.buildRandomCharacter().then((character) => {
				this.character = character;
				this.backgroundType = this.getRandomBackgroundType();
				this.backgroundColor = this.getRandomColor();

				this.draw();
			});
		},

		draw() {
			if (this.avatarContext !== null && this.character !== null) {
				this.avatarContext.clearRect(0, 0, this.avatarContext.canvas.width, this.avatarContext.canvas.height);

				this.drawBackground();
				this.characterDrawer.drawCharacter(this.avatarContext, this.character);
			}
		},

		getRandomBackgroundType() {
			const backgrounds = [
				BackgroundType.boom,
				BackgroundType.solid,
				BackgroundType.pattern,
			];

			return getRandomArrayElement(backgrounds);
		},

		getRandomColor() {
			const colorArray: string[] = Object.entries(ColorSet.color).map((keyAndValue) => keyAndValue[1]);
			return getRandomArrayElement(colorArray);
		},

		drawBackground() {
			if (this.avatarContext) {
				switch (this.backgroundType) {
					case BackgroundType.boom:
						this.backgroundDrawer.drawBoom(this.avatarContext);
						break;
					case BackgroundType.pattern:
						this.backgroundDrawer.drawFourColorBackgroundAndCirclePattern(this.avatarContext);
						break;
					case BackgroundType.solid:
						this.backgroundColor = this.backgroundDrawer.fillSolid(this.avatarContext, this.backgroundColor)
						break;
				}
			}
		},

		saveImage() {
			if (this.avatarContext !== null) {
				if (this.isCircle) {
					this.clipper.clipCircle(this.avatarContext);
				}

				(this.$refs.downloadButton as HTMLLinkElement).href = this.avatarContext.canvas.toDataURL('image/png', 1);

				if (this.isCircle) {
					this.draw();
				}
			}
		},

		switchAvatarFormat() {
			this.isCircle = !this.isCircle;
		}
	},

	computed: {
		canvasFormatModifier() {
			return this.isCircle ? 'avatar__canvas_circle' : 'avatar__canvas_rounded';
		},

		formatButtonModifier() {
			return this.isCircle ? 'avatar__format-button_circle' : '';
		},
	},

	mounted() {
		const canvas = this.$refs.avatarCanvas as HTMLCanvasElement;
		const ctx = canvas.getContext('2d');

		if (ctx) {
			this.avatarContext = ctx;
			this.generateAvatar();
		} else if (ctx === null && canvas) {
			alert("Whops! Your browser doesn't support canvas. Please, update it");
		} else if (canvas === null) {
			console.error('Felid to find canvas node');
		}
	},
}
</script>

<template>
	<article class="avatar">
		<canvas class="avatar__canvas" :class="canvasFormatModifier" height="440" width="440" ref="avatarCanvas"></canvas>
		<div class="avatar__controllers avatar__controllers_position_bottom-center">
			<a ref="downloadButton" @click="saveImage" class="button button_center" title="Save" href="#"
				download="Lego Character.png">
				<svg class="button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
					<path
						d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
				</svg>
			</a>
			<button @click="generateAvatar" class="button button_center" title="Regenerate">
				<svg class="button__icon" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
					<path
						d="M386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H464c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z" />
				</svg>
			</button>
			<button @click="switchAvatarFormat" class="avatar__format-button button button_center"
				:class="formatButtonModifier" title="Change format"></button>
		</div>
	</article>
</template>

<style scoped lang="scss">
.avatar {
	position: relative;

	&__canvas {
		aspect-ratio: 1 / 1;
		box-sizing: content-box;
		border: 6px solid var(--color-black-kilimanjaro);
		transition: border-radius ease-in-out .4s;

		&_rounded {
			border-radius: 25rem;
		}

		&_circle {
			border-radius: 50%;
		}
	}

	&__controllers {
		display: flex;
		gap: 15rem;
		position: absolute;

		&_position_bottom-center {
			bottom: 40rem;
			right: 50%;
			transform: translate(50%);
		}
	}

	&__format-button {
		$default-border-radius: 4rem;
		$circle-border-radius: 50%;

		&::before {
			content: '';
			display: block;
			width: 18rem;
			height: 18rem;
			background-color: var(--color-black-kilimanjaro);
			transition: border-radius ease-in-out .4s;
		}

		@media (pointer: fine) {
			&:not(&_circle) {
				&::before {
					border-radius: $default-border-radius;
				}

				&:hover::before {
					border-radius: $circle-border-radius;
				}
			}

			&_circle {
				&::before {
					border-radius: $circle-border-radius;
				}

				&:hover::before {
					border-radius: $default-border-radius;
				}
			}
		}

		@media (pointer: coarse) {
			&:not(&_circle) {
				&::before {
					border-radius: $circle-border-radius;
				}
			}

			&_circle {
				&::before {
					border-radius: $default-border-radius;
				}
			}
		}
	}
}
</style>
