<template>
	<div class="list">
		<ul>
			<li v-for="item in list" ref="name" :class="{active:isActive}" :key="item.index">{{item.name}}</li>
		</ul>
	</div>
</template>

<script>
// import { mapState } from 'vuex'
// import { player } from '../player'
import { mapState } from 'vuex'
export default {
	name: 'PlayList',
	computed: {
		...mapState(['itemList', 'current']),
		isActive() {
			return true;

		},
		play() {
			return this.current.slice(0, this.current.length - 4);
		},
	},
	data() {
		return {
			list: [],

			active: false

		}
	},
	watch: {
		itemList() {
			this.list = []
			this.itemList.forEach((item, index) => {
				this.list.push({ name: item.name.slice(0, item.name.length - 4), index: index });
			});
		},
		play() {
			// TODO 播放列表选中正在播放的歌曲 
		}
	},

}
</script>

<style lang="less" scoped>
.list {
	height: 200px;
	width: 200px;
	position: absolute;
	background-color: white;
	border-radius: 10px;
	top: 100%;
	left: 0;

	box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12),
		0 20px 20px rgba(95, 23, 101, 0.2);
	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		padding: 10px 0;
		li {
			color: #aaa;
			width: 80%;
			height: 20px;
			padding: 5px 0;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			border-bottom: 1px solid #eee;
		}
	}
	.active {
		color: #444;
	}
}
</style>