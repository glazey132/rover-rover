import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Camera, ChevronLeft, ChevronRight, Download, Search, SlidersHorizontal, X } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { DataCard } from '@/components/ui/DataCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { PageHeader } from '@/components/ui/PageHeader'
import { PhotoSkeleton } from '@/components/ui/Skeleton'
import { getCamerasForRover } from '@/data/cameras'
import { useLatestRoverPhotos, useRoverPhotosByDate } from '@/hooks/useNASA'
import { useRoverStore } from '@/store/roverStore'
import type { RoverName, RoverPhoto } from '@/types/nasa'
import { cn } from '@/lib/utils'

const rovers: Array<{ name: RoverName; label: string; status: 'Active' | 'Mission Complete' }> = [
  { name: 'curiosity', label: 'Curiosity', status: 'Active' },
  { name: 'opportunity', label: 'Opportunity', status: 'Mission Complete' },
  { name: 'spirit', label: 'Spirit', status: 'Mission Complete' },
]

export function RoverPage() {
  const params = useParams()
  const navigate = useNavigate()
  const routeRover = params.rover as RoverName | undefined
  const validRover = rovers.some((rover) => rover.name === routeRover)
  const rover = validRover ? routeRover! : 'curiosity'
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const {
    camera,
    dateType,
    earthDate,
    sol,
    hasSearched,
    setRover,
    setCamera,
    setDateType,
    setEarthDate,
    setSol,
    triggerSearch,
    reset,
  } = useRoverStore()

  useEffect(() => {
    if (!validRover) {
      navigate('/rovers/curiosity', { replace: true })
      return
    }
    setRover(rover)
  }, [navigate, rover, setRover, validRover])

  const searchParams = useMemo(
    () => ({
      earth_date: dateType === 'earth_date' && earthDate ? earthDate : undefined,
      sol: dateType === 'sol' && sol ? Number(sol) : undefined,
      camera: camera || undefined,
    }),
    [camera, dateType, earthDate, sol],
  )

  const latestQuery = useLatestRoverPhotos(rover)
  const dateQuery = useRoverPhotosByDate(rover, searchParams, hasSearched)
  const activeQuery = hasSearched ? dateQuery : latestQuery
  const photos = activeQuery.data ?? []
  const selectedPhoto = selectedIndex === null ? undefined : photos[selectedIndex]

  const retry = () => {
    void activeQuery.refetch()
  }

  return (
    <motion.div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
      <PageHeader title="Mars Rover Explorer - DEPRECATED - NASA API no longer supports rover photos :(" subtitle="Search NASA rover photography by mission, camera, Earth date, or Martian sol." accent="rover" />

      <div className="border-b border-space-border">
        <div className="flex gap-0 overflow-x-auto">
          {rovers.map((item) => (
            <Link
              key={item.name}
              to={`/rovers/${item.name}`}
              className={cn(
                'whitespace-nowrap border-b-2 border-transparent px-6 py-3 text-sm font-medium text-text-secondary transition-colors duration-150 hover:text-text-primary',
                rover === item.name && 'border-accent-rover text-text-primary',
              )}
            >
              <span>{item.label}</span>
              <Badge variant={item.status === 'Active' ? 'success' : 'default'} className="ml-2">
                {item.status}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      <div className="py-6 lg:hidden">
        <Button variant="ghost" onClick={() => setFiltersOpen((value) => !value)}>
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
        <AnimatePresence>
          {filtersOpen ? (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
              <div className="pt-4">
                <RoverFilters rover={rover} />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="flex gap-6 py-6">
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-20">
            <RoverFilters rover={rover} />
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-text-secondary">{activeQuery.isLoading ? 'Searching photos...' : `${photos.length} photos`}</p>
            <div aria-hidden="true" />
          </div>

          {activeQuery.isLoading ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <PhotoSkeleton key={index} />
              ))}
            </div>
          ) : null}

          {activeQuery.isError ? <ErrorState title="Failed to load photos" message="NASA rover photo data is unavailable right now." onRetry={retry} /> : null}

          {!activeQuery.isLoading && !activeQuery.isError && photos.length === 0 ? (
            <EmptyState icon={Camera} title="No photos found" message="No photos found for these parameters. Try a different date or camera." />
          ) : null}

          {!activeQuery.isLoading && !activeQuery.isError && photos.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo, index) => (
                <motion.button
                  key={photo.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.2 }}
                  className="group relative aspect-video overflow-hidden rounded-xl border border-space-border text-left transition-colors duration-200 hover:border-accent-rover/40"
                  aria-label={photo.camera.full_name}
                  onClick={() => setSelectedIndex(index)}
                >
                  <img src={photo.img_src} alt={photo.camera.full_name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="text-xs font-semibold text-white">{photo.camera.full_name}</div>
                      <div className="text-xs text-white/60">{photo.earth_date}</div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : null}
        </section>
      </div>

      <AnimatePresence>
        {selectedPhoto ? (
          <PhotoLightbox
            photo={selectedPhoto}
            hasMultiple={photos.length > 1}
            onClose={() => setSelectedIndex(null)}
            onNext={() => setSelectedIndex((index) => (index === null ? 0 : (index + 1) % photos.length))}
            onPrevious={() => setSelectedIndex((index) => (index === null ? 0 : (index - 1 + photos.length) % photos.length))}
          />
        ) : null}
      </AnimatePresence>
    </motion.div>
  )

  function RoverFilters({ rover }: { rover: RoverName }) {
    const cameras = getCamerasForRover(rover)

    return (
      <DataCard className="p-5">
        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Camera</div>
          <div className="grid grid-cols-2 gap-2">
            <CameraButton active={!camera} code="All" name="All Cameras" onClick={() => setCamera('')} className="col-span-2" />
            {cameras.map((item) => (
              <CameraButton key={item.code} active={camera === item.code} code={item.code} name={item.name} onClick={() => setCamera(item.code)} />
            ))}
          </div>
        </div>

        <div className="my-5 border-t border-space-border" />

        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Date</div>
          <div className="flex rounded-lg border border-space-border bg-space-bg p-1">
            <button
              className={cn('flex-1 rounded-md py-1.5 text-center text-xs font-medium transition-all duration-150', dateType === 'earth_date' ? 'bg-accent-rover/15 text-accent-rover' : 'text-text-muted hover:text-text-secondary')}
              onClick={() => setDateType('earth_date')}
            >
              Earth Date
            </button>
            <button
              className={cn('flex-1 rounded-md py-1.5 text-center text-xs font-medium transition-all duration-150', dateType === 'sol' ? 'bg-accent-rover/15 text-accent-rover' : 'text-text-muted hover:text-text-secondary')}
              onClick={() => setDateType('sol')}
            >
              Sol
            </button>
          </div>

          {dateType === 'earth_date' ? (
            <input
              type="date"
              value={earthDate}
              onChange={(event) => setEarthDate(event.target.value)}
              className="mt-3 w-full rounded-lg border border-space-border bg-space-bg px-3 py-2 text-sm text-text-primary focus:border-space-border-strong focus:outline-none focus:ring-1 focus:ring-accent-rover/30"
            />
          ) : (
            <input
              type="number"
              min={0}
              placeholder="Sol number"
              value={sol}
              onChange={(event) => setSol(event.target.value)}
              className="mt-3 w-full rounded-lg border border-space-border bg-space-bg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-space-border-strong focus:outline-none focus:ring-1 focus:ring-accent-rover/30"
            />
          )}

          <Button className="mt-3 w-full" onClick={triggerSearch}>
            <Search className="h-4 w-4" />
            Search Photos
          </Button>
          <button className="mt-2 w-full text-center text-xs text-text-muted underline transition-colors duration-150 hover:text-text-secondary" onClick={reset}>
            Reset to latest
          </button>
        </div>
      </DataCard>
    )
  }
}

function CameraButton({ active, code, name, onClick, className }: { active: boolean; code: string; name: string; onClick: () => void; className?: string }) {
  return (
    <button
      aria-pressed={active}
      className={cn(
        'rounded-lg border p-2.5 text-left transition-all duration-150',
        active ? 'border-accent-rover/60 bg-accent-rover/10' : 'border-space-border bg-transparent hover:border-space-border-strong hover:bg-white/[0.03]',
        className,
      )}
      onClick={onClick}
    >
      <div className={cn('font-mono text-xs font-semibold', active ? 'text-accent-rover' : 'text-text-secondary')}>{code}</div>
      <div className={cn('mt-0.5 text-xs leading-tight', active ? 'text-accent-rover/70' : 'text-text-muted')}>{name}</div>
    </button>
  )
}

function PhotoLightbox({ photo, hasMultiple, onClose, onNext, onPrevious }: { photo: RoverPhoto; hasMultiple: boolean; onClose: () => void; onNext: () => void; onPrevious: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onNext()
      if (event.key === 'ArrowLeft') onPrevious()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, onNext, onPrevious])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      role="dialog"
      aria-label="Photo viewer"
      onMouseDown={onClose}
    >
      <motion.div
        className="flex w-full max-w-5xl flex-col gap-6 md:flex-row"
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="relative flex-1">
          <img src={photo.img_src} alt={photo.camera.full_name} className="max-h-[70vh] w-full rounded-xl object-contain" />
          {hasMultiple ? (
            <>
              <Button variant="icon" className="absolute left-2 top-1/2 -translate-y-1/2 bg-space-elevated/80 backdrop-blur-sm" onClick={onPrevious} aria-label="Previous photo">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="icon" className="absolute right-2 top-1/2 -translate-y-1/2 bg-space-elevated/80 backdrop-blur-sm" onClick={onNext} aria-label="Next photo">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          ) : null}
        </div>

        <DataCard className="flex w-full shrink-0 flex-col gap-4 p-4 md:w-64">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-text-primary">Photo Details</h2>
            <Button variant="icon" onClick={onClose} aria-label="Close photo viewer">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <Detail label="Earth Date" value={photo.earth_date} />
          <Detail label="Sol" value={String(photo.sol)} />
          <Detail label="Camera" value={photo.camera.name} />
          <Detail label="Full Camera Name" value={photo.camera.full_name} />
          <Detail label="Rover" value={photo.rover.name} />
          <Detail label="Status" value={photo.rover.status} />

          <a href={photo.img_src} download target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-space-border px-4 py-2 text-sm font-medium text-text-secondary transition-all duration-150 hover:border-space-border-strong hover:bg-white/[0.06] hover:text-text-primary">
            <Download className="h-4 w-4" />
            Download Original
          </a>
          <a href={photo.img_src} target="_blank" rel="noreferrer" className="text-xs text-accent-blue hover:underline">
            View on NASA -&gt;
          </a>
        </DataCard>
      </motion.div>
    </motion.div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-text-muted">{label}</div>
      <div className="mt-0.5 text-sm text-text-primary">{value}</div>
    </div>
  )
}
