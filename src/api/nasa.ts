import type { APODResponse, CMEAnalysis, DONKINotification, EPICImage, NEOObject, RoverName, RoverPhoto } from '@/types/nasa'
import { toISODate } from '@/lib/utils'

const API_KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY'
const BASE = 'https://api.nasa.gov'

export class NASAApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message)
    this.name = 'NASAApiError'
  }
}

async function nasaFetch<T>(url: string): Promise<T> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new NASAApiError(`NASA API error: ${response.status} ${response.statusText}`, response.status)
  }

  return response.json() as Promise<T>
}

export async function fetchAPOD(): Promise<APODResponse> {
  return nasaFetch(`${BASE}/planetary/apod?api_key=${API_KEY}`)
}

export async function fetchLatestRoverPhotos(rover: RoverName): Promise<RoverPhoto[]> {
  const data = await nasaFetch<{ latest_photos: RoverPhoto[] }>(
    `${BASE}/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=${API_KEY}`,
  )

  return data.latest_photos
}

export async function fetchRoverPhotosByDate(
  rover: RoverName,
  params: { earth_date?: string; sol?: number; camera?: string },
): Promise<RoverPhoto[]> {
  const query = new URLSearchParams({ api_key: API_KEY })

  if (params.earth_date) query.set('earth_date', params.earth_date)
  if (params.sol !== undefined) query.set('sol', String(params.sol))
  if (params.camera) query.set('camera', params.camera)

  const data = await nasaFetch<{ photos: RoverPhoto[] }>(
    `${BASE}/mars-photos/api/v1/rovers/${rover}/photos?${query.toString()}`,
  )

  return data.photos
}

export async function fetchCMEAnalysis(startDate: string, endDate: string): Promise<CMEAnalysis[]> {
  const query = new URLSearchParams({
    startDate,
    endDate,
    catalog: 'ALL',
    api_key: API_KEY,
  })

  return nasaFetch(`${BASE}/DONKI/CMEAnalysis?${query.toString()}`)
}

export async function fetchEPICImages(): Promise<EPICImage[]> {
  return nasaFetch(`${BASE}/EPIC/api/natural?api_key=${API_KEY}`)
}

export function getEPICImageUrl(image: EPICImage): string {
  const date = image.date.split(' ')[0]?.replaceAll('-', '/') ?? ''
  return `https://epic.gsfc.nasa.gov/archive/natural/${date}/png/${image.image}.png`
}

export async function fetchNEOs(): Promise<Record<string, NEOObject[]>> {
  const today = toISODate(new Date())
  const data = await nasaFetch<{ near_earth_objects: Record<string, NEOObject[]> }>(
    `${BASE}/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${API_KEY}`,
  )

  return data.near_earth_objects
}

export async function fetchDONKINotifications(days = 7): Promise<DONKINotification[]> {
  const end = toISODate(new Date())
  const start = toISODate(new Date(Date.now() - days * 864e5))
  const query = new URLSearchParams({
    startDate: start,
    endDate: end,
    type: 'all',
    api_key: API_KEY,
  })

  return nasaFetch(`${BASE}/DONKI/notifications?${query.toString()}`)
}
