<template>
	<div class="control" :class="{controlPlaying:isPlaying}">
		<div class="control-btn control-btn-side" @click="handlePrev">
			<i class="fa fa-backward"></i>
		</div>
		<div class="control-btn" @click="handlePlay">
			<!-- <span class="play-btn"></span> -->
			<i :class="isPlaying?'fa fa-pause':'fa fa-play'"></i>
		</div>
		<div class="control-btn control-btn-side" @click="handleNext">
			<i class="fa fa-forward" aria-hidden="true"></i>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { player } from '../player'
export default {
	name: 'Control',
	computed: {
		...mapState(['isPlaying']),

	},
	methods: {
		handlePlay() {
			if (!player.isEmpty) {
				if (!this.isPlaying) {
					player.play();
				}
				else {
					player.pause()
				}
			}
		},
		handlePrev() {
			if (this.isPlaying) {
				player.prev();
			}
		},
		handleNext() {
			if (this.isPlaying) {
				player.next();
			}

		}
	},
}
</script>
<style lang="less" scoped>
.control {
	display: flex;
	height: 100%;
	.control-btn {
		display: flex;
		margin: 2px;
		align-items: center;
		justify-content: center;
		flex: 1;
		background-origin: 4px;
		color: #ccc;
		font-size: 16px;
		transition: background-color 0.6s ease;
		&:hover {
			background-color: #ddd;
			color: white;
		}

		.play-btn {
			position: relative;
			width: 20px;
			height: 20px;
			&::before {
				content: '';
				position: absolute;
				left: 11px;
				top: 50%;
				margin-left: -4px;
				margin-top: -10px;
				width: 0;
				height: 0;
				border: 12px solid transparent;
				border-left-color: #ccc;
				border-top-width: 10px;
				border-bottom-width: 10px;
				transition: all 0.2s ease;
			}
			&::after {
				content: '';
				position: absolute;
				right: 5px;
				top: 50%;
				margin-right: -4px;
				margin-top: -10px;
				width: 0;
				height: 0;
				border: 0 solid transparent;
				border-width: 0 0 0 6px;
				border-left-color: #ccc;
				opacity: 0;
				transform: scale(0);
				transition: all 0.2s ease;
			}
		}
	}
	.control-btn-side {
		font-size: 14px;
	}
}

.controlPlaying .play-btn::before {
	border-width: 0 0 0 6px;
	height: 20px;
	left: 5px;
}
.controlPlaying .play-btn::after {
	opacity: 1;
	transform: scale(1);
}
.control-btn:hover .play-btn::before {
	border-left-color: white;
}

.control-btn:hover .play-btn::after {
	border-color: white;
}
</style>