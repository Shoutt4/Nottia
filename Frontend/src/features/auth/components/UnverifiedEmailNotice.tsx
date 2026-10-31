import { MailIcon } from '@/components/ui/icons'

interface UnverifiedEmailNoticeProps {
  email: string
}

/** Contexto cuando se llega desde el login con una cuenta sin verificar. */
export function UnverifiedEmailNotice({ email }: UnverifiedEmailNoticeProps) {
  return (
    <div className="flex items-start gap-3 rounded-[4px] border border-paper-accent/30 bg-paper-accent/[0.06] px-3.5 py-3">
      <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-paper-accent" />
      <p className="text-xs leading-relaxed text-paper-muted">
        La cuenta <span className="break-all font-semibold text-paper-ink">{email}</span> todavía
        no está verificada. Envía un enlace nuevo para activarla.
      </p>
    </div>
  )
}
