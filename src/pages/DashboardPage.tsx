import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Activity, Bell, Globe, Radar, Telescope, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/Badge'
import { DataCard } from '@/components/ui/DataCard'
import { Skeleton } from '@/components/ui/Skeleton'
import { StatCard } from '@/components/ui/StatCard'
import { useAPOD, useCMEAnalysis, useDONKINotifications } from '@/hooks/useNASA'
import { cn, toISODate } from '@/lib/utils'

const today = toISODate(new Date())
const thirtyDaysAgo = toISODate(new Date(Date.now() - 30 * 864e5))

export function DashboardPage() {
  const apod = useAPOD()
  const cme = useCMEAnalysis(thirtyDaysAgo, today)
  const notifications = useDONKINotifications(7)
  const [expanded, setExpanded] = useState(false)

  const latestCME = [...(cme.data ?? [])].sort((a, b) => new Date(b.time21_5).getTime() - new Date(a.time21_5).getTime())[0]
  const latestNotification = [...(notifications.data ?? [])].sort(
    (a, b) => new Date(b.messageIssueTime).getTime() - new Date(a.messageIssueTime).getTime(),
  )[0]

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
      <section
        className={cn(
          'relative border-b border-space-border',
          apod.data?.media_type === 'video'
            ? 'overflow-visible bg-space-bg py-10'
            : 'min-h-[480px] overflow-hidden lg:aspect-[16/7] lg:max-h-[680px]',
        )}
      >
        {apod.isLoading ? <Skeleton className="absolute inset-0 rounded-none bg-space-surface" /> : null}

        {apod.isError ? (
          <div className="flex min-h-[480px] items-center justify-center bg-space-surface text-sm text-text-muted">Today's image is unavailable</div>
        ) : null}

        {apod.data?.media_type === 'image' ? (
          <>
            <img src={apod.data.hdurl ?? apod.data.url} alt={apod.data.title} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-space-bg/10 via-space-bg/40 to-space-bg" />
            <Badge className="absolute right-4 top-4 md:right-8 md:top-8">{apod.data.date}</Badge>
            <div className="absolute bottom-0 left-0 max-w-3xl p-8 md:p-12">
              <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-muted">Astronomy Picture of the Day</div>
              <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">{apod.data.title}</h1>
              <p className={expanded ? 'text-sm leading-relaxed text-white/70' : 'line-clamp-3 text-sm leading-relaxed text-white/70'}>
                {apod.data.explanation}
              </p>
              {apod.data.explanation.length > 180 ? (
                <button className="mt-2 text-xs text-accent-blue underline" onClick={() => setExpanded((value) => !value)}>
                  {expanded ? 'Show less' : 'Read more'}
                </button>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-text-muted">
                <span>{apod.data.date}</span>
                {apod.data.copyright ? <span>© {apod.data.copyright}</span> : null}
              </div>
            </div>
          </>
        ) : null}

        {apod.data?.media_type === 'video' ? (
          <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-text-primary">{apod.data.title}</h1>
            <APODVideo url={apod.data.url} title={apod.data.title} />
            <DataCard>
              <p className="text-sm leading-relaxed text-text-secondary">{apod.data.explanation}</p>
            </DataCard>
          </div>
        ) : null}
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCard icon={Telescope} value="3" label="Active Missions" accent="rover">
            <div className="flex flex-wrap gap-2">
              {(['curiosity', 'opportunity', 'spirit'] as const).map((rover) => (
                <Link key={rover} to={`/rovers/${rover}`}>
                  <Badge variant="rover" className="capitalize">
                    {rover}
                  </Badge>
                </Link>
              ))}
            </div>
          </StatCard>

          <StatCard icon={Zap} value={cme.isLoading ? <Skeleton className="h-9 w-24" /> : latestCME ? `${Math.round(latestCME.speed)} km/s` : 'No recent events'} label="Latest CME Speed" accent="weather">
            {latestCME ? <div className="text-xs text-text-muted">{format(new Date(latestCME.time21_5), 'MMM dd, yyyy')}</div> : null}
          </StatCard>

          <StatCard icon={Bell} value={notifications.isLoading ? <Skeleton className="h-9 w-24" /> : latestNotification?.messageType ?? 'No alerts'} label="Latest Notification" accent="weather">
            {latestNotification ? <div className="line-clamp-1 text-xs text-text-muted">{format(new Date(latestNotification.messageIssueTime), 'MMM dd, yyyy HH:mm')} UTC</div> : null}
          </StatCard>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <SectionCard to="/rovers/curiosity" icon={Telescope} accent="rover" title="Mars Rover Explorer (DEPRECATED)" description="Browse photos from Curiosity, Opportunity, and Spirit filtered by camera and date." />
          <SectionCard to="/space-weather" icon={Activity} accent="weather" title="CME & Solar Events" description="Visualize coronal mass ejection data and track DONKI space weather alerts." />
          <SectionCard to="/earth" icon={Globe} accent="earth" title="Earth from Space" description="Browse Earth imagery captured by NASA's EPIC satellite from 1.5 million km away." />
          <SectionCard to="/asteroids" icon={Radar} accent="asteroid" title="Asteroid Tracker" description="Monitor near-Earth objects passing by today, including potentially hazardous asteroids." />
        </section>
      </div>
    </motion.div>
  )
}

function APODVideo({ url, title }: { url: string; title: string }) {
  if (isDirectVideo(url)) {
    return <video src={url} title={title} className="aspect-video w-full rounded-xl border border-space-border bg-black object-contain" controls preload="metadata" />
  }

  if (isEmbeddableVideo(url)) {
    return <iframe src={url} title={title} className="aspect-video w-full rounded-xl border border-space-border" allowFullScreen />
  }

  return (
    <DataCard className="flex aspect-video flex-col items-center justify-center gap-3 text-center">
      <div className="text-base font-semibold text-text-primary">NASA video cannot be embedded</div>
      <p className="max-w-md text-sm text-text-secondary">
        Today's APOD video is hosted on a NASA page that blocks iframe playback. Open it directly to view the media.
      </p>
      <a href={url} target="_blank" rel="noreferrer" className="rounded-lg border border-space-border px-4 py-2 text-sm font-medium text-accent-blue transition-colors duration-150 hover:border-space-border-strong hover:bg-white/[0.06]">
        Open NASA video -&gt;
      </a>
    </DataCard>
  )
}

function isDirectVideo(url: string) {
  return /\.(mp4|webm|ogg)(?:\?.*)?$/i.test(url)
}

function isEmbeddableVideo(url: string) {
  return /youtube\.com\/embed|player\.vimeo\.com/i.test(url)
}

function SectionCard({
  to,
  icon: Icon,
  accent,
  title,
  description,
}: {
  to: string
  icon: typeof Telescope
  accent: 'rover' | 'weather' | 'earth' | 'asteroid'
  title: string
  description: string
}) {
  const accentClasses = {
    rover: 'bg-accent-rover/10 text-accent-rover hover:border-accent-rover/30',
    weather: 'bg-accent-weather/10 text-accent-weather hover:border-accent-weather/30',
    earth: 'bg-accent-earth/10 text-accent-earth hover:border-accent-earth/30',
    asteroid: 'bg-accent-asteroid/10 text-accent-asteroid hover:border-accent-asteroid/30',
  }

  return (
    <Link to={to}>
      <DataCard clickable className={`flex items-start gap-5 ${accentClasses[accent]}`}>
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${accentClasses[accent]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-text-primary">{title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-text-secondary">{description}</p>
          <div className="mt-3 text-xs font-medium">Explore -&gt;</div>
        </div>
      </DataCard>
    </Link>
  )
}
