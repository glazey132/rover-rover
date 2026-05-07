export interface RoverPhoto {
  id: number
  sol: number
  earth_date: string
  img_src: string
  camera: {
    id: number
    name: string
    rover_id: number
    full_name: string
  }
  rover: {
    id: number
    name: string
    landing_date: string
    launch_date: string
    status: string
  }
}

export interface CMEAnalysis {
  time21_5: string
  latitude: number
  longitude: number
  halfAngle: number
  speed: number
  type: string
  isMostAccurate: boolean
  note?: string
  catalog: string
}

export interface APODResponse {
  title: string
  url: string
  hdurl?: string
  explanation: string
  date: string
  media_type: 'image' | 'video'
  copyright?: string
}

export interface EPICImage {
  identifier: string
  caption: string
  image: string
  date: string
  centroid_coordinates: { lat: number; lon: number }
}

export interface NEOObject {
  id: string
  name: string
  nasa_jpl_url: string
  estimated_diameter: {
    meters: {
      estimated_diameter_min: number
      estimated_diameter_max: number
    }
  }
  is_potentially_hazardous_asteroid: boolean
  close_approach_data: Array<{
    close_approach_date: string
    relative_velocity: { kilometers_per_second: string }
    miss_distance: { kilometers: string }
  }>
}

export interface DONKINotification {
  messageType: string
  messageID: string
  messageURL?: string
  messageIssueTime: string
  messageBody: string
}

export type RoverName = 'curiosity' | 'opportunity' | 'spirit'
export type DateType = 'earth_date' | 'sol'
