# Vue Video Stream Component

A Vue 3 component that provides HLS (HTTP Live Streaming) video playback functionality using `hls.js`.

## Features

- HLS video streaming support
- Fallback for native HLS support (Safari)
- Configurable video controls
- Thumbnail support
- Auto-cleanup on component unmount

## Installation

```bash
npm install @970design/vue-video-stream
```

## Usage
```vue
<script setup>
  import VueVideoStream from '@970design/vue-video-stream';
</script>
<template>
  <VueVideoStream
    :video="{
      hls: 'https://example.com/stream.m3u8',
      thumbnail: 'https://example.com/thumbnail.jpg',
      muted: '1',
      autoplay: '1',
      controls: '1',
      loop: '0'
    }"
  />
</template>
```

## Props

| Property    | Type     | Description                           | Format    |
|------------|----------|---------------------------------------|-----------|
| hls        | String   | URL to HLS stream                     | Valid URL |
| thumbnail  | String   | Video poster image URL                | Valid URL |
| muted      | String   | Mute video playback ('0' or '1')     | '0'/'1'   |
| autoplay   | String   | Enable autoplay ('0' or '1')         | '0'/'1'   |
| controls   | String   | Show video controls ('0' or '1')      | '0'/'1'   |
| loop       | String   | Enable video loop ('0' or '1')        | '0'/'1'   |

## Integrations

If you're using this package in a headless WordPress project with ACF, check out the companion [ACF Field Plugin](https://github.com/970Design/nsz-design-video-field) that makes it easy to integrate Cloudflare Stream videos with your Vue front-end.

## Browser Support

Works in all modern browsers that support HLS playback either natively or through hls.js.

## More Information

The development of this package is sponsored by [970 Design](https://970design.com), a creative agency based in Vail, Colorado.  If you need help with your headless WordPress project, please don't hesitate to [reach out](https://970design.com/reach-out/).