import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Globe } from 'lucide-react'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { getEPICImageUrl } from '@/api/nasa'
import { Button } from '@/components/ui/Button'
import { DataCard } from '@/components/ui/DataCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { PageHeader } from '@/components/ui/PageHeader'
import { Skeleton } from '@/components/ui/Skeleton'
import { useEPICImages } from '@/hooks/useNASA'

interface Coordinates {
  lat: number
  lon: number
}

export function EarthPage() {
  const epic = useEPICImages()
  const [index, setIndex] = useState(0)
  const [coords, setCoords] = useState<Coordinates | null>(null)
  const images = epic.data ?? []
  const image = images[index]

  useEffect(() => {
    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
      },
      () => undefined,
      { enableHighAccuracy: false, timeout: 5000 },
    )
  }, [])

  useEffect(() => {
    if (index >= images.length) setIndex(0)
  }, [images.length, index])

  const previous = () => setIndex((value) => (value - 1 + images.length) % images.length)
  const next = () => setIndex((value) => (value + 1) % images.length)

  return (
    <motion.div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
      <PageHeader title="Earth Watch" subtitle="Browse latest natural color images from NASA's EPIC camera aboard DSCOVR." accent="earth" />

      {epic.isLoading ? (
        <div className="flex flex-col gap-6 lg:flex-row">
          <Skeleton className="aspect-square flex-1 rounded-xl" />
          <Skeleton className="h-96 w-full rounded-xl lg:w-80" />
        </div>
      ) : null}

      {epic.isError ? <ErrorState title="EPIC imagery unavailable" message="Earth imagery could not be loaded." onRetry={() => void epic.refetch()} /> : null}

      {!epic.isLoading && !epic.isError && images.length === 0 ? <EmptyState icon={Globe} title="No Earth images" message="NASA EPIC returned no natural color images." /> : null}

      {image ? (
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-xl border border-space-border bg-space-surface">
              <img src={getEPICImageUrl(image)} alt={image.caption} className="aspect-square w-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="line-clamp-2 text-xs text-white/70">{image.caption}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <Button variant="ghost" onClick={previous} disabled={images.length < 2}>
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="text-xs text-text-muted">
                {index + 1} of {images.length}
              </span>
              <Button variant="ghost" onClick={next} disabled={images.length < 2}>
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <DataCard className="w-full shrink-0 lg:w-80">
            <h2 className="text-base font-semibold text-text-primary">Image Details</h2>
            <div className="mt-5 space-y-4">
              <Detail label="Captured" value={format(new Date(`${image.date}Z`), "MMM dd, yyyy - HH:mm 'UTC'")} />
              <Detail label="Identifier" value={image.identifier} mono />
              <Detail label="Centroid Lat" value={image.centroid_coordinates.lat.toFixed(4)} />
              <Detail label="Centroid Lon" value={image.centroid_coordinates.lon.toFixed(4)} />
            </div>

            <div className="my-5 border-t border-space-border" />

            <h3 className="text-base font-semibold text-text-primary">About EPIC</h3>
            <p className="mt-2 text-xs leading-relaxed text-text-secondary">
              This image was captured by NASA's EPIC (Earth Polychromatic Imaging Camera) camera aboard the DSCOVR satellite,
              positioned 1.5 million km from Earth at the Lagrange point L1.
            </p>

            {coords ? (
              <>
                <div className="my-5 border-t border-space-border" />
                <h3 className="text-xs font-medium uppercase tracking-wider text-text-muted">Your Location</h3>
                <div className="mt-2 font-mono text-sm text-text-primary">
                  {coords.lat.toFixed(4)}, {coords.lon.toFixed(4)}
                </div>
                <p className="mt-2 text-xs text-text-muted">EPIC captures the full Earth disk. Your location may be visible in daytime images.</p>
              </>
            ) : null}
          </DataCard>
        </div>
      ) : null}
    </motion.div>
  )
}

function Detail({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-text-muted">{label}</div>
      <div className={mono ? 'mt-0.5 font-mono text-xs text-text-primary' : 'mt-0.5 text-sm text-text-primary'}>{value}</div>
    </div>
  )
}
