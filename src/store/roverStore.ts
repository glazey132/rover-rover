import { create } from 'zustand'
import type { DateType, RoverName } from '@/types/nasa'

interface RoverStore {
  rover: RoverName
  camera: string
  dateType: DateType
  earthDate: string
  sol: string
  hasSearched: boolean
  setRover: (rover: RoverName) => void
  setCamera: (camera: string) => void
  setDateType: (type: DateType) => void
  setEarthDate: (date: string) => void
  setSol: (sol: string) => void
  triggerSearch: () => void
  reset: () => void
}

export const useRoverStore = create<RoverStore>((set) => ({
  rover: 'curiosity',
  camera: '',
  dateType: 'earth_date',
  earthDate: '',
  sol: '',
  hasSearched: false,
  setRover: (rover) => set({ rover, camera: '', earthDate: '', sol: '', hasSearched: false }),
  setCamera: (camera) => set({ camera }),
  setDateType: (dateType) => set({ dateType }),
  setEarthDate: (earthDate) => set({ earthDate }),
  setSol: (sol) => set({ sol }),
  triggerSearch: () => set({ hasSearched: true }),
  reset: () => set({ camera: '', earthDate: '', sol: '', hasSearched: false }),
}))
