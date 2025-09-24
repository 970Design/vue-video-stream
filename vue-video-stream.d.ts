declare module '@970design/vue-video-stream' {
  import { DefineComponent } from 'vue'

  interface VideoStreamProps {
    src?: string
    autoplay?: boolean
    controls?: boolean
    muted?: boolean
    width?: string | number
    height?: string | number
  }

  const VueVideoStream: DefineComponent<VideoStreamProps>
  export default VueVideoStream
}