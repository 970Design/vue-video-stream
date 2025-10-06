<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Hls from 'hls.js/dist/hls.light.min.js'

const props = defineProps(['video']);
const videoRef = ref(null);

const muted = Boolean(Number(props.video.muted));
const autoplay = Boolean(Number(props.video.autoplay));
const controls = Boolean(Number(props.video.controls));
const loop = Boolean(Number(props.video.loop));

function validateUrl(url) {
  if (!url) return null;
  try {
    new URL(url);
    return url;
  } catch {
    return null;
  }
}

const hls = validateUrl(props.video.hls);
const thumbnail = validateUrl(props.video.thumbnail);

function setupVideo(el) {
  if (!el) return;

  const source = hls;
  if (!source) return;

  let hlsInstance = null;

  const onLoad = () => {
    if (autoplay) el.play().catch(console.error);
  }

  el.addEventListener('loadeddata', onLoad);

  if (Hls.isSupported()) {
    hlsInstance = new Hls();
    hlsInstance.loadSource(source);
    hlsInstance.attachMedia(el);

    hlsInstance.on(Hls.Events.ERROR, (event, data) => {
      if (data.type === 'otherError'  && !data.fatal) {
        return;
      }
      console.error('HLS error:', data);
    });
  } else if (el.canPlayType('application/vnd.apple.mpegurl')) {
    el.src = source;
  }

  el.controls = controls;

  // Cleanup function
  return () => {
    el.removeEventListener('loadeddata', onLoad);
    if (hlsInstance) {
      hlsInstance.destroy();
    }
  }
}

onMounted(() => {
  const cleanup = setupVideo(videoRef.value);
  if (cleanup) {
    onUnmounted(cleanup);
  }
});

</script>

<template>
  <video
      v-if="hls"
      ref="videoRef"
      class="vue-stream-video"
      :poster="thumbnail"
      :muted="muted"
      :loop="loop"
      playsinline
  ></video>
</template>