/**
 * Convierte una imagen elegida por el usuario en un data URL ligero
 * (reescalada a `maxWidth` y comprimida en JPEG) para usarla como portada.
 */
export async function fileToCover(file: File, maxWidth = 1600): Promise<string> {
  const bitmap = await createImageBitmap(file)

  try {
    const scale = Math.min(1, maxWidth / bitmap.width)
    const width = Math.max(1, Math.round(bitmap.width * scale))
    const height = Math.max(1, Math.round(bitmap.height * scale))

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')
    if (!context) throw new Error('No se pudo procesar la imagen.')

    context.drawImage(bitmap, 0, 0, width, height)
    return canvas.toDataURL('image/jpeg', 0.82)
  } finally {
    bitmap.close()
  }
}
