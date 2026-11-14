import type { Activity } from '../types'
import { roundRect, wrapText } from './canvas'
import { activityColor } from './colors'
import { WEEK_DAYS } from './days'
import {
  activityPosition,
  getScheduleRange,
  HOUR_HEIGHT,
  hourMarks,
  MIN_ACTIVITY_HEIGHT,
  positionActivities,
} from './layout'
import { formatHour, formatTimeRange } from './time'

const WIDTH = 1640
const MARGIN = 56
const TIME_AXIS = 104
const HEADER_HEIGHT = 154
const DAY_HEADER = 60
const COLUMN_PADDING = 5
const LANE_GAP = 3
const FOOTER = 56

export async function downloadScheduleImage(
  activities: Activity[],
  title: string,
): Promise<void> {
  const canvas = buildScheduleCanvas(activities, title)
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((value) => {
      if (value) resolve(value)
      else reject(new Error('No pudimos generar la imagen.'))
    }, 'image/png')
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'nottia-actividades.png'
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 2_000)
}

function buildScheduleCanvas(activities: Activity[], title: string): HTMLCanvasElement {
  const range = getScheduleRange(activities)
  const layouts = WEEK_DAYS.map((day) =>
    positionActivities(activities.filter((activity) => activity.day === day.key)),
  )
  const trackX = MARGIN + TIME_AXIS
  const trackWidth = WIDTH - trackX - MARGIN
  const trackTop = HEADER_HEIGHT + DAY_HEADER
  const trackHeight = (range.endHour - range.startHour) * HOUR_HEIGHT
  const canvas = document.createElement('canvas')

  canvas.width = WIDTH
  canvas.height = trackTop + trackHeight + FOOTER

  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('No pudimos generar la imagen.')

  ctx.fillStyle = '#fbf8f0'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  drawHeader(ctx, activities.length, title)
  drawDayHeader(ctx, trackX, trackWidth, HEADER_HEIGHT)
  drawGrid(ctx, range, trackX, trackWidth, trackTop, trackHeight)
  drawTimeAxis(ctx, range, trackX, trackTop, trackHeight)
  drawActivities(ctx, layouts, range, trackX, trackWidth, trackTop, trackHeight)
  drawFooter(ctx, canvas.width, canvas.height, FOOTER)

  return canvas
}

function drawHeader(ctx: CanvasRenderingContext2D, count: number, title: string) {
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = '#b45a39'
  ctx.font = '600 15px system-ui, sans-serif'
  ctx.fillText('NOTTIA · PLANIFICACIÓN SEMANAL', MARGIN, 46)

  ctx.fillStyle = '#29251e'
  ctx.font = '600 38px Georgia, "Times New Roman", serif'
  ctx.fillText(title || 'Mi semana', MARGIN, 96)

  ctx.fillStyle = '#8b8170'
  ctx.font = '16px system-ui, sans-serif'
  const today = new Intl.DateTimeFormat('es', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())
  ctx.fillText(today, MARGIN, 126)

  ctx.fillStyle = '#efe6d5'
  const pillWidth = 154
  roundRect(ctx, WIDTH - MARGIN - pillWidth, 54, pillWidth, 40, 20)
  ctx.fill()
  ctx.fillStyle = '#665014'
  ctx.font = '600 14px system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(`${count} ${count === 1 ? 'actividad' : 'actividades'}`, WIDTH - MARGIN - pillWidth / 2, 80)
  ctx.textAlign = 'left'
}

function drawDayHeader(
  ctx: CanvasRenderingContext2D,
  trackX: number,
  trackWidth: number,
  top: number,
) {
  const dayWidth = trackWidth / WEEK_DAYS.length

  ctx.fillStyle = '#f4efe4'
  ctx.fillRect(0, top, WIDTH, DAY_HEADER)
  ctx.fillStyle = '#f7f2e7'
  ctx.fillRect(0, top, trackX, DAY_HEADER)

  ctx.fillStyle = '#8b8170'
  ctx.font = '600 14px system-ui, sans-serif'
  ctx.textAlign = 'right'
  ctx.fillText('HORA', trackX - 16, top + 35)
  ctx.textAlign = 'center'
  WEEK_DAYS.forEach((day, index) => {
    const center = trackX + index * dayWidth + dayWidth / 2
    ctx.fillStyle = '#29251e'
    ctx.font = '600 20px Georgia, "Times New Roman", serif'
    ctx.fillText(day.label, center, top + 25)

    ctx.fillStyle = '#8b8170'
    ctx.font = '600 12px system-ui, sans-serif'
    ctx.fillText(day.short.toUpperCase(), center, top + 43)

    if (!day.apiDay) {
      ctx.fillStyle = '#b0a794'
      ctx.font = '10px system-ui, sans-serif'
      ctx.fillText('No disponible', center, top + 56)
    }
  })
  ctx.textAlign = 'left'

  ctx.strokeStyle = '#d8cfbd'
  ctx.lineWidth = 1
  for (let index = 0; index <= WEEK_DAYS.length; index += 1) {
    const x = trackX + index * dayWidth
    ctx.beginPath()
    ctx.moveTo(x, top)
    ctx.lineTo(x, top + DAY_HEADER)
    ctx.stroke()
  }

  ctx.beginPath()
  ctx.moveTo(0, top + DAY_HEADER)
  ctx.lineTo(WIDTH, top + DAY_HEADER)
  ctx.stroke()
}

function drawGrid(
  ctx: CanvasRenderingContext2D,
  range: ReturnType<typeof getScheduleRange>,
  trackX: number,
  trackWidth: number,
  top: number,
  height: number,
) {
  const dayWidth = trackWidth / WEEK_DAYS.length

  ctx.strokeStyle = '#e9e2d4'
  ctx.lineWidth = 1

  for (const hour of hourMarks(range)) {
    const percent = (hour - range.startHour) / (range.endHour - range.startHour)
    const y = top + height * percent
    ctx.beginPath()
    ctx.moveTo(trackX, y)
    ctx.lineTo(trackX + trackWidth, y)
    ctx.stroke()
  }

  for (let index = 0; index <= WEEK_DAYS.length; index += 1) {
    const x = trackX + index * dayWidth
    ctx.beginPath()
    ctx.moveTo(x, top)
    ctx.lineTo(x, top + height)
    ctx.stroke()
  }
}

function drawTimeAxis(
  ctx: CanvasRenderingContext2D,
  range: ReturnType<typeof getScheduleRange>,
  trackX: number,
  top: number,
  height: number,
) {
  ctx.fillStyle = '#f7f2e7'
  ctx.fillRect(0, top, trackX, height)

  ctx.strokeStyle = '#d8cfbd'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(trackX, top)
  ctx.lineTo(trackX, top + height)
  ctx.stroke()

  ctx.fillStyle = '#8b8170'
  ctx.font = '600 14px system-ui, sans-serif'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'middle'

  for (const hour of hourMarks(range)) {
    const percent = (hour - range.startHour) / (range.endHour - range.startHour)
    const y = top + height * percent
    const labelY = Math.min(top + height - 8, Math.max(top + 8, y))
    ctx.fillText(formatHour(hour), trackX - 16, labelY)

    ctx.beginPath()
    ctx.moveTo(trackX - 8, y)
    ctx.lineTo(trackX, y)
    ctx.stroke()
  }

  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'
}

function drawActivities(
  ctx: CanvasRenderingContext2D,
  layouts: ReturnType<typeof positionActivities>[],
  range: ReturnType<typeof getScheduleRange>,
  trackX: number,
  trackWidth: number,
  top: number,
  height: number,
) {
  const dayWidth = trackWidth / WEEK_DAYS.length

  layouts.forEach((layout, dayIndex) => {
    const lanes = Math.max(1, layout.lanes)
    const laneWidth = (dayWidth - COLUMN_PADDING * 2) / lanes
    const dayX = trackX + dayIndex * dayWidth

    for (const { activity, lane } of layout.items) {
      const position = activityPosition(activity, range)
      const blockX = dayX + COLUMN_PADDING + lane * laneWidth
      const blockY = top + (position.offset / 100) * height + 2
      const naturalHeight = (position.length / 100) * height - 4
      const blockHeight = Math.max(MIN_ACTIVITY_HEIGHT, naturalHeight)
      const blockWidth = Math.max(16, laneWidth - LANE_GAP)

      drawActivity(ctx, activity, blockX, blockY, blockWidth, blockHeight)
    }
  })
}

function drawActivity(
  ctx: CanvasRenderingContext2D,
  activity: Activity,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const color = activityColor(activity.color)
  roundRect(ctx, x, y, width, height, 7)
  ctx.fillStyle = color.soft
  ctx.fill()
  ctx.strokeStyle = color.border
  ctx.lineWidth = 1.5
  ctx.stroke()

  ctx.save()
  roundRect(ctx, x, y, width, height, 7)
  ctx.clip()

  ctx.fillStyle = color.border
  ctx.fillRect(x, y, width, 4)

  if (height >= 24) {
    ctx.fillStyle = color.ink
    ctx.font = '600 15px system-ui, sans-serif'
    const nameWidth = Math.max(20, width - 20)
    const nameLines = wrapText(ctx, activity.name, nameWidth, 2)

    nameLines.forEach((line, index) => {
      ctx.fillText(line, x + 10, y + 22 + index * 17)
    })

    if (height >= 64 || (height >= 48 && nameLines.length === 1)) {
      ctx.globalAlpha = 0.72
      ctx.font = '600 12px system-ui, sans-serif'
      ctx.fillText(formatTimeRange(activity.start, activity.end), x + 10, y + height - 10)
      ctx.globalAlpha = 1
    }
  }

  ctx.restore()
}

function drawFooter(ctx: CanvasRenderingContext2D, width: number, height: number, footer: number) {
  ctx.fillStyle = '#8b8170'
  ctx.font = '13px system-ui, sans-serif'
  ctx.fillText('Generado con Nottia · Para pensar despacio', MARGIN, height - footer + 32)
  ctx.textAlign = 'right'
  ctx.fillText('nottia', width - MARGIN, height - footer + 32)
  ctx.textAlign = 'left'
}
