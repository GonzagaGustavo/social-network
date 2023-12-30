export type Quality = {
  width: number | 'auto'
  height: number
}

const qvga: Quality = {
  height: 320,
  width: 240
}
export const encoderConfig = {
  ...qvga,
  bitrate: 10e6,
  codec: 'vp09.00.10.08',
  pt: 4,
  hardwareAcceleration: 'prefer-software'
}
