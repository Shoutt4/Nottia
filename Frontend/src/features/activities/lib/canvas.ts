/** Utilidades de dibujo compartidas por la exportación a imagen. */

export function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2)
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + width, y, x + width, y + height, r)
  ctx.arcTo(x + width, y + height, x, y + height, r)
  ctx.arcTo(x, y + height, x, y, r)
  ctx.arcTo(x, y, x + width, y, r)
  ctx.closePath()
}

/** Parte un texto en líneas y recorta la última con puntos suspensivos. */
export function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number,
): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let line = ''

  for (let index = 0; index < words.length; index += 1) {
    const candidate = line ? `${line} ${words[index]}` : words[index]

    if (ctx.measureText(candidate).width <= maxWidth) {
      line = candidate
      continue
    }

    if (lines.length === maxLines - 1) {
      let clipped = line || words[index]
      while (clipped.length > 1 && ctx.measureText(`${clipped}…`).width > maxWidth) {
        clipped = clipped.slice(0, -1)
      }
      lines.push(`${clipped}…`)
      return lines
    }

    if (line) lines.push(line)
    line = words[index]
  }

  if (line) lines.push(line)
  return lines.slice(0, maxLines)
}
