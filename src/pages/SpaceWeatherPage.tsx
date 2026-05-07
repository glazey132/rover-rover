import { useMemo, useState } from 'react'
import { Activity, ExternalLink } from 'lucide-react'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { DataCard } from '@/components/ui/DataCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { PageHeader } from '@/components/ui/PageHeader'
import { Skeleton } from '@/components/ui/Skeleton'
import { useCMEAnalysis, useDONKINotifications } from '@/hooks/useNASA'
import { toISODate } from '@/lib/utils'
import type { CMEAnalysis, DONKINotification } from '@/types/nasa'
import { cn } from '@/lib/utils'

type ChartTab = 'speed' | 'angle' | 'position'

export function SpaceWeatherPage() {
  const [startDate, setStartDate] = useState(toISODate(new Date(Date.now() - 30 * 864e5)))
  const [endDate, setEndDate] = useState(toISODate(new Date()))
  const [activeTab, setActiveTab] = useState<ChartTab>('speed')
  const cme = useCMEAnalysis(startDate, endDate)
  const notifications = useDONKINotifications(7)

  const chartData = useMemo(
    () =>
      [...(cme.data ?? [])]
        .filter((item) => Number.isFinite(item.speed) && item.time21_5)
        .sort((a, b) => new Date(a.time21_5).getTime() - new Date(b.time21_5).getTime())
        .map((item) => ({ ...item, label: format(new Date(item.time21_5), 'MMM dd') })),
    [cme.data],
  )

  const sortedNotifications = useMemo(
    () => [...(notifications.data ?? [])].sort((a, b) => new Date(b.messageIssueTime).getTime() - new Date(a.messageIssueTime).getTime()),
    [notifications.data],
  )

  return (
    <motion.div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
      <PageHeader title="Space Weather" subtitle="Track coronal mass ejections and official DONKI notifications from NASA." accent="weather" />

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-xs font-medium text-text-muted">
          From
          <input className="rounded-lg border border-space-border bg-space-bg px-3 py-2 text-sm text-text-primary focus:border-space-border-strong focus:outline-none focus:ring-1 focus:ring-accent-weather/30" type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
        </label>
        <label className="flex items-center gap-2 text-xs font-medium text-text-muted">
          To
          <input className="rounded-lg border border-space-border bg-space-bg px-3 py-2 text-sm text-text-primary focus:border-space-border-strong focus:outline-none focus:ring-1 focus:ring-accent-weather/30" type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
        </label>
        <Button className="px-3 py-1.5 text-xs" onClick={() => void cme.refetch()}>
          Update
        </Button>
      </div>

      <DataCard>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base font-semibold text-text-primary">Coronal Mass Ejection Data</h2>
          <Badge>{chartData.length} events</Badge>
        </div>

        <div className="mt-6 flex border-b border-space-border">
          <TabButton active={activeTab === 'speed'} onClick={() => setActiveTab('speed')}>
            Speed
          </TabButton>
          <TabButton active={activeTab === 'angle'} onClick={() => setActiveTab('angle')}>
            Half Angle
          </TabButton>
          <TabButton active={activeTab === 'position'} onClick={() => setActiveTab('position')}>
            Lat / Long
          </TabButton>
        </div>

        <div className="mt-6">
          {cme.isLoading ? <Skeleton className="h-80 w-full rounded-xl" /> : null}
          {cme.isError ? <ErrorState title="CME data unavailable" message="Space weather chart data could not be loaded." onRetry={() => void cme.refetch()} /> : null}
          {!cme.isLoading && !cme.isError && chartData.length === 0 ? <EmptyState icon={Activity} title="No CME events" message="No CME events in this date range." /> : null}
          {!cme.isLoading && !cme.isError && chartData.length > 0 ? <CMEChart tab={activeTab} data={chartData} /> : null}
        </div>
      </DataCard>

      <section className="mt-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-text-primary">Space Weather Notifications</h2>
          <Badge>{sortedNotifications.length} in last 7 days</Badge>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {notifications.isLoading
            ? Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-24 rounded-xl" />)
            : null}
          {notifications.isError ? <ErrorState title="Notifications unavailable" message="DONKI notifications could not be loaded." onRetry={() => void notifications.refetch()} /> : null}
          {!notifications.isLoading && !notifications.isError && sortedNotifications.map((notification, index) => <NotificationCard key={notification.messageID} notification={notification} index={index} />)}
        </div>
      </section>
    </motion.div>
  )
}

function TabButton({ active, children, onClick }: { active: boolean; children: string; onClick: () => void }) {
  return (
    <button className={cn('border-b-2 border-transparent px-6 py-3 text-sm font-medium text-text-secondary transition-colors duration-150 hover:text-text-primary', active && 'border-accent-weather text-text-primary')} onClick={onClick}>
      {children}
    </button>
  )
}

function CMEChart({ tab, data }: { tab: ChartTab; data: Array<CMEAnalysis & { label: string }> }) {
  if (tab === 'position') {
    return (
      <>
        <ResponsiveContainer width="100%" height={320}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="longitude" name="Longitude" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis dataKey="latitude" name="Latitude" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'var(--space-border)' }} />
            <Scatter data={data}>
              {data.map((item) => (
                <Cell key={`${item.time21_5}-${item.longitude}`} fill={speedColor(item.speed)} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div className="mt-3 flex flex-wrap gap-4 text-xs text-text-muted">
          <LegendDot color="bg-status-danger" label="Fast (>1200)" />
          <LegendDot color="bg-status-warning" label="Moderate (600-1200)" />
          <LegendDot color="bg-status-success" label="Slow (<600)" />
        </div>
      </>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="label" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} tickLine={false} axisLine={false} />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
        <Bar dataKey={tab === 'speed' ? 'speed' : 'halfAngle'} fill={tab === 'speed' ? 'var(--accent-weather)' : '#6d28d9'} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

function ChartTooltip({ active, label, payload }: { active?: boolean; label?: string | number; payload?: Array<{ value?: unknown; payload?: CMEAnalysis }> }) {
  if (!active || !payload?.length) return null
  const item = payload[0]?.payload
  if (!item) return null

  return (
    <div className="rounded-lg border border-space-border bg-space-elevated px-4 py-3 text-sm">
      <div className="mb-2 text-xs text-text-muted">{label}</div>
      <div className="font-semibold text-text-primary">{Math.round(item.speed)} km/s</div>
      <div className="text-text-secondary">Half angle: {item.halfAngle}°</div>
      <div className="text-text-secondary">
        Lat {item.latitude}, Lon {item.longitude}
      </div>
      <div className="text-xs text-text-muted">{item.catalog}</div>
    </div>
  )
}

function speedColor(speed: number) {
  if (speed > 1200) return 'var(--status-danger)'
  if (speed >= 600) return 'var(--status-warning)'
  return 'var(--status-success)'
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={cn('h-2 w-2 rounded-full', color)} />
      {label}
    </span>
  )
}

function NotificationCard({ notification, index }: { notification: DONKINotification; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const style = notificationStyle(notification.messageType)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04, duration: 0.2 }}>
      <DataCard className="p-4">
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <span className={cn('mt-1.5 h-2 w-2 rounded-full', style.dot)} />
            <span className="mt-2 w-px flex-1 bg-space-border" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={style.badge}>{notification.messageType}</Badge>
              <span className="text-xs text-text-muted">{format(new Date(notification.messageIssueTime), "MMM dd, yyyy 'at' HH:mm 'UTC'")}</span>
            </div>
            <p className={cn('mt-2 text-sm leading-relaxed text-text-secondary', !expanded && 'line-clamp-4')}>{notification.messageBody}</p>
            {notification.messageBody.length > 260 ? (
              <button className="mt-1 text-xs text-accent-blue" onClick={() => setExpanded((value) => !value)}>
                {expanded ? 'Collapse' : 'Expand'}
              </button>
            ) : null}
            {notification.messageURL ? (
              <a href={notification.messageURL} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs text-accent-blue hover:underline">
                <ExternalLink className="h-3 w-3" />
                View official notification -&gt;
              </a>
            ) : null}
          </div>
        </div>
      </DataCard>
    </motion.div>
  )
}

function notificationStyle(type: string): { dot: string; badge: 'default' | 'danger' | 'warning' | 'info' } {
  if (type === 'Report') return { dot: 'bg-status-info', badge: 'info' }
  if (type === 'Alert') return { dot: 'bg-status-danger', badge: 'danger' }
  if (type === 'Warning') return { dot: 'bg-status-warning', badge: 'warning' }
  return { dot: 'bg-text-muted', badge: 'default' }
}
