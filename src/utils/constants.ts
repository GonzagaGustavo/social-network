export type Quality = {
  width: number | 'auto'
  height: number
}

const config144: Quality = {
  height: 144,
  width: 192
}
const config480 = {
  height: 480,
  width: 854
}
const config720 = {
  width: 1280,
  height: 720
}
const config1080 = {
  width: 1920,
  height: 1080
}

export const encoderConfig144 = {
  ...config144,
  bitrate: 10e6,
  codec: 'vp09.00.10.08',
  pt: 4,
  hardwareAcceleration: 'prefer-software'
}
export const encoderConfig480 = {
  ...config480,
  bitrate: 10e6,
  codec: 'vp09.00.10.08',
  pt: 4,
  hardwareAcceleration: 'prefer-software'
}
export const encoderConfig720 = {
  ...config720,
  bitrate: 10e6,
  codec: 'vp09.00.10.08',
  pt: 4,
  hardwareAcceleration: 'prefer-software'
}
export const encoderConfig1080 = {
  ...config1080,
  bitrate: 10e6,
  codec: 'vp09.00.10.08',
  pt: 4,
  hardwareAcceleration: 'prefer-software'
}
