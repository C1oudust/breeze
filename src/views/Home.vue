<template>
	<div class="home">
		<player />
	</div>
</template>

<script>
import Player from '../components/Player'
export default {
	name: 'Home',
	components: {
		Player
	}

}
</script>

<style lang="less" scoped>
.home {
	position: relative;
	z-index: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: #ffedff;
}
</style>
