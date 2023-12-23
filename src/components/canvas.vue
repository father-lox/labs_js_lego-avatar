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
  <canvas height="440" width="440" ref="avatarCanvas"></canvas>
  <button>Download</button>
  <button>Refresh</button>
</template>

<style scoped></style>
