declare module '@970design/vue-video-stream' {
  import { DefineComponent } from 'vue'

  interface VideoStreamProps {
    hls: string
    thumbnail?: string
    autoplay?: boolean
    controls?: boolean
    muted?: boolean
    loop?: boolean
    playScrolledIntoView?: boolean

  }

  const VueVideoStream: DefineComponent<VideoStreamProps>
  export default VueVideoStream
}