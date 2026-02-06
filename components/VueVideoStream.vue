<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Hls from 'hls.js'

const props = defineProps(['video']);
const videoRef = ref(null);
const muted = Boolean(Number(props.video.muted));
const autoplay = Boolean(Number(props.video.autoplay));
const controls = Boolean(Number(props.video.controls));
const loop = Boolean(Number(props.video.loop));
const play_scrolled_into_view = Boolean(Number(props.video.play_scrolled_into_view));

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
    if (autoplay && play_scrolled_into_view === false) el.play().catch(console.error);

    if(play_scrolled_into_view) {
      function handleIntersection(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.play().catch(console.error);
          } else {
            entry.target.pause();
          }
        });
      }

      const options = {
        root: null,
        rootMargin: "0px",
        scrollMargin: "0px",
        threshold: 0.5,
      };

      const observer = new IntersectionObserver(handleIntersection, options);

      observer.observe(el);
    }
  }

  el.addEventListener('loadeddata', onLoad);

  if (Hls.isSupported()) {
    hlsInstance = new Hls({
      enableWorker: false
    });
    hlsInstance.loadSource(source);
    hlsInstance.attachMedia(el);

    hlsInstance.on(Hls.Events.ERROR, (event, data) => {
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