import { useQuery } from '@tanstack/react-query'
import * as api from '@/api/nasa'
import type { RoverName } from '@/types/nasa'

export const useAPOD = () =>
  useQuery({
    queryKey: ['apod'],
    queryFn: api.fetchAPOD,
    staleTime: 1000 * 60 * 60,
  })

export const useLatestRoverPhotos = (rover: RoverName) =>
  useQuery({
    queryKey: ['rover', rover, 'latest'],
    queryFn: () => api.fetchLatestRoverPhotos(rover),
  })

export const useRoverPhotosByDate = (
  rover: RoverName,
  params: { earth_date?: string; sol?: number; camera?: string },
  enabled: boolean,
) =>
  useQuery({
    queryKey: ['rover', rover, 'date', params],
    queryFn: () => api.fetchRoverPhotosByDate(rover, params),
    enabled,
  })

export const useCMEAnalysis = (startDate: string, endDate: string) =>
  useQuery({
    queryKey: ['cme', startDate, endDate],
    queryFn: () => api.fetchCMEAnalysis(startDate, endDate),
    staleTime: 1000 * 60 * 30,
  })

export const useEPICImages = () =>
  useQuery({
    queryKey: ['epic'],
    queryFn: api.fetchEPICImages,
    staleTime: 1000 * 60 * 60,
  })

export const useNEOs = () =>
  useQuery({
    queryKey: ['neo'],
    queryFn: api.fetchNEOs,
    staleTime: 1000 * 60 * 60,
  })

export const useDONKINotifications = (days = 7) =>
  useQuery({
    queryKey: ['donki', days],
    queryFn: () => api.fetchDONKINotifications(days),
    staleTime: 1000 * 60 * 15,
  })
