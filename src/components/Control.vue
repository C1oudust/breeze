<template>
	<div class="control" :class="{controlPlaying:isPlaying}">
		<div class="control-btn control-btn-side" @click="handlePrev">
			<i class="fa fa-backward"></i>
		</div>
		<div class="control-btn" @click="handlePlay">
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
		transition: color 0.6s linear ease;
		&:active {
			color: white;
		}
	}
	.control-btn-side {
		font-size: 14px;
	}
}
</style>