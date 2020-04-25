<template>
	<div class="progress" :class="{progressPlaying:isPlaying}">
		<div class="wrapper">
			<h2 :class="[{'title-scroll':canScroll},'progress-title']">{{name | formatName }}</h2>
		</div>
		<p class="progress-text">{{position | formatTime}} / {{duration | formatTime}}</p>

		<div class="progress-line">
			<span :style="{width:progress}" />
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { player } from '../player'
export default {
	data() {
		return {
			name: '',
			position: 0,
			duration: 0.001,
			progress: ''
		}
	},
	computed: {
		...mapState(['isPlaying']),
		canScroll() {
			if (this.name) {
				return this.name.length > 18
			}
			else
				return false;
		}
	},
	watch: {
		name() {
			this.$store.state.current = this.name;
		}
	},
	filters: {
		formatTime(val) {
			const min = Math.floor(val / 60)
			const sec = Math.floor(val % 60)
			return `${min}:${sec < 10 ? '0' : ''}${sec}`
		},
		formatName(val) {
			return val.replace(/\.mp3$/, '')
		}
	},
	mounted() {
		const draw = () => {
			requestAnimationFrame(draw)
			const progress = player.position / player.duration
			this.progress = `${(progress * 100).toFixed(2)}%`
			this.position = player.position
			this.duration = player.duration
			this.name = player.current.file ? player.current.file.name : ''
		}
		this.$nextTick(() => {
			draw()
		})

	},
}
</script>

<style lang="less" scoped>
.progress {
	padding-left: 120px;
	padding-right: 15px;
	height: 100%;
	border-radius: 6px 6px 0 0;
	background-color: rgba(255, 255, 255, 0.5);
	transition: all 0.6s ease;
	position: relative;
	bottom: 30px;
	.wrapper {
		height: 25px;
		width: 100%;
		overflow: hidden;
	}
	.progress-title {
		height: 100%;
		padding-top: 6px;
		font-size: 12px;
		font-weight: bold;
	}

	.title-scroll {
		width: fit-content;
		animation: wordsLoop 6s linear infinite normal;
		white-space: nowrap;
	}
	.progress-text {
		padding: 6px 2px 0 2px;
		font-size: 12px;
		font-weight: bold;
		color: #ccc;
		transform: scale(0.6);
		transform-origin: left top;
	}
	.progress-line {
		height: 3px;
		border-radius: 3px;
		overflow: hidden;
		background-color: #ddd;
		span {
			display: block;
			height: 100%;
			background-color: #ec51a5;
		}
	}
}

.progressPlaying {
	transform: translateY(-32px);
}
@keyframes wordsLoop {
	0% {
		transform: translateX(100%);
		-webkit-transform: translateX(100%);
	}
	100% {
		transform: translateX(-100%);
		-webkit-transform: translateX(-100%);
	}
}
</style>