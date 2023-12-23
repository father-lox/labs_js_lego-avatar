<script lang="ts">
import Drawer from '../code/drawer';

export default {
  mounted() {
    const canvas = this.$refs.avatarCanvas as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const drawer = new Drawer();
      drawer.drawCharacter(ctx);
    }

  },
}
</script>

<template>
  <canvas class="avatar" height="440" width="440" ref="avatarCanvas"></canvas>
  <button>Download</button>
  <button>Refresh</button>
</template>

<style scoped>
.avatar {
  aspect-ratio: 1 / 1;
  border-radius: 25px;
  box-sizing: content-box;
  border: 6px solid #383434;
}

</style>
