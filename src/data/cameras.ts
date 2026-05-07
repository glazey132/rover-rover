import type { RoverName } from '@/types/nasa'

export type CameraCode = 'FHAZ' | 'RHAZ' | 'MAST' | 'CHEMCAM' | 'MAHLI' | 'MARDI' | 'NAVCAM' | 'PANCAM' | 'MINITES'

export interface Camera {
  code: CameraCode
  name: string
  rovers: RoverName[]
}

export const CAMERAS: Camera[] = [
  { code: 'FHAZ', name: 'Front Hazard Avoidance', rovers: ['curiosity', 'opportunity', 'spirit'] },
  { code: 'RHAZ', name: 'Rear Hazard Avoidance', rovers: ['curiosity', 'opportunity', 'spirit'] },
  { code: 'NAVCAM', name: 'Navigation Camera', rovers: ['curiosity', 'opportunity', 'spirit'] },
  { code: 'MAST', name: 'Mast Camera', rovers: ['curiosity'] },
  { code: 'CHEMCAM', name: 'Chemistry & Camera', rovers: ['curiosity'] },
  { code: 'MAHLI', name: 'Hand Lens Imager', rovers: ['curiosity'] },
  { code: 'MARDI', name: 'Descent Imager', rovers: ['curiosity'] },
  { code: 'PANCAM', name: 'Panoramic Camera', rovers: ['opportunity', 'spirit'] },
  { code: 'MINITES', name: 'Mini-TES Spectrometer', rovers: ['opportunity', 'spirit'] },
]

export function getCamerasForRover(rover: RoverName): Camera[] {
  return CAMERAS.filter((camera) => camera.rovers.includes(rover))
}
