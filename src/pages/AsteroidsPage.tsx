import { useMemo } from 'react'
import { AlertTriangle, ArrowDownToLine, ExternalLink, Gauge, Orbit, Target } from 'lucide-react'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { DataCard } from '@/components/ui/DataCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { PageHeader } from '@/components/ui/PageHeader'
import { Skeleton } from '@/components/ui/Skeleton'
import { StatCard } from '@/components/ui/StatCard'
import { useNEOs } from '@/hooks/useNASA'
import { formatNumber } from '@/lib/utils'
import type { NEOObject } from '@/types/nasa'

const lunarDistanceKm = 384_400

export function AsteroidsPage() {
  const neo = useNEOs()
  const asteroids = useMemo(() => Object.values(neo.data ?? {}).flat().sort((a, b) => missDistance(a) - missDistance(b)), [neo.data])
  const largestDiameter = Math.max(...asteroids.map((item) => item.estimated_diameter.meters.estimated_diameter_max), 1)
  const hazardousCount = asteroids.filter((item) => item.is_potentially_hazardous_asteroid).length
  const closest = asteroids[0]
  const fastest = asteroids.reduce<NEOObject | undefined>((current, item) => (velocity(item) > (current ? velocity(current) : 0) ? item : current), undefined)

  return (
    <motion.div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
      <PageHeader title="Asteroid Tracker" subtitle="Monitor near-Earth objects passing by today, sorted by closest approach." accent="asteroid" />

      {neo.isLoading ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-40 rounded-xl" />
          ))}
        </div>
      ) : null}

      {neo.isError ? <ErrorState title="Asteroid data unavailable" message="NASA near-Earth object data could not be loaded." onRetry={() => void neo.refetch()} /> : null}

      {!neo.isLoading && !neo.isError && asteroids.length === 0 ? <EmptyState icon={Orbit} title="No near-Earth objects" message="No near-Earth objects tracked today." /> : null}

      {!neo.isLoading && !neo.isError && asteroids.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard icon={Orbit} value={asteroids.length} label="Near-Earth Objects Today" accent="asteroid" />
            <StatCard icon={AlertTriangle} value={hazardousCount} label="Potentially Hazardous" accent="danger" valueClassName={hazardousCount > 0 ? 'text-status-danger' : undefined} />
            <StatCard icon={Target} value={closest ? `${formatNumber(missDistance(closest))} km` : '-'} label="Closest Miss Distance" accent="asteroid">
              {closest ? <div className="text-xs text-text-muted">{(missDistance(closest) / lunarDistanceKm).toFixed(2)} lunar distances</div> : null}
            </StatCard>
            <StatCard icon={Gauge} value={fastest ? `${velocity(fastest).toFixed(2)} km/s` : '-'} label="Fastest Velocity" accent="asteroid" />
          </div>

          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-text-primary">Today's Near-Earth Objects</h2>
              <span className="text-xs text-text-muted">Sorted by miss distance ascending</span>
            </div>
            <div className="flex flex-col gap-3">
              {asteroids.map((asteroid, index) => (
                <AsteroidCard key={asteroid.id} asteroid={asteroid} largestDiameter={largestDiameter} index={index} />
              ))}
            </div>
          </section>
        </>
      ) : null}
    </motion.div>
  )
}

function AsteroidCard({ asteroid, largestDiameter, index }: { asteroid: NEOObject; largestDiameter: number; index: number }) {
  const approach = asteroid.close_approach_data[0]
  const distance = missDistance(asteroid)
  const speed = velocity(asteroid)
  const min = asteroid.estimated_diameter.meters.estimated_diameter_min
  const max = asteroid.estimated_diameter.meters.estimated_diameter_max
  const sizePercent = Math.max(6, Math.min(100, (max / largestDiameter) * 100))

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04, duration: 0.2 }}>
      <DataCard className={asteroid.is_potentially_hazardous_asteroid ? 'border-l-[3px] border-l-status-danger p-5' : 'border-l-[3px] border-l-space-border-strong p-5'}>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-text-primary">{asteroid.name}</h3>
              {asteroid.is_potentially_hazardous_asteroid ? <Badge variant="danger">POTENTIALLY HAZARDOUS</Badge> : null}
            </div>

            <div className="mt-1 flex items-center gap-2 text-xs text-text-secondary">
              <span>
                ~{min.toFixed(1)}m - {max.toFixed(1)}m
              </span>
              <span className="h-1.5 w-24 overflow-hidden rounded-full bg-space-elevated">
                <span className="block h-full rounded-full bg-accent-asteroid/60" style={{ width: `${sizePercent}%` }} />
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="inline-flex items-center gap-2">
                <ArrowDownToLine className="h-3.5 w-3.5 text-text-muted" />
                <span className="font-mono text-sm text-text-primary">{formatNumber(distance)} km</span>
                <span className="text-xs text-text-muted">{(distance / lunarDistanceKm).toFixed(2)} lunar distances</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <Gauge className="h-3.5 w-3.5 text-text-muted" />
                <span className="text-xs text-text-secondary">{speed.toFixed(2)} km/s</span>
              </span>
            </div>
          </div>

          <div className="shrink-0 text-left sm:text-right">
            <div className="text-xs text-text-muted">{approach ? format(new Date(approach.close_approach_date), 'MMM dd, yyyy') : 'No date'}</div>
            <a href={asteroid.nasa_jpl_url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs text-accent-blue hover:underline">
              JPL Data -&gt;
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </DataCard>
    </motion.div>
  )
}

function missDistance(asteroid: NEOObject) {
  return Number(asteroid.close_approach_data[0]?.miss_distance.kilometers ?? Number.POSITIVE_INFINITY)
}

function velocity(asteroid: NEOObject) {
  return Number(asteroid.close_approach_data[0]?.relative_velocity.kilometers_per_second ?? 0)
}
