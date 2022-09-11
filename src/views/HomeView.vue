<template>
  <GameBoard class="gameboard"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GameBoard from '@/components/GameBoard/GameBoard.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    GameBoard,
  },
});
</script>

<style lang="scss" scoped>

</style>
