import type { ComponentType } from 'react'

import {
  AlertIcon,
  BellIcon,
  CalendarIcon,
  KanbanIcon,
  LinkIcon,
  ListIcon,
  LockIcon,
  MapIcon,
  NoteIcon,
  NotebookIcon,
  SearchIcon,
  ShieldIcon,
  SparkleIcon,
  UsersIcon,
} from '@/components/ui/icons'
import type { IconProps } from '@/components/ui/icons'

export interface Feature {
  id: string
  title: string
  description: string
  action: string
  Icon: ComponentType<IconProps>
  /** Color del ícono (token de papel). */
  iconClass: string
  /** Fondo del recuadro del ícono. */
  tintClass: string
}

export const features: Feature[] = [
  {
    id: 'notas',
    title: 'Notas',
    description: 'Escribe ideas, apuntes y listas con formato, etiquetas y contraseñas.',
    action: 'Empezar ahora',
    Icon: NoteIcon,
    iconClass: 'text-paper-accent',
    tintClass: 'bg-paper-accent/10',
  },
  {
    id: 'listas',
    title: 'Listas',
    description: 'Convierte cualquier nota en listas interactivas con recordatorios.',
    action: 'Empezar ahora',
    Icon: ListIcon,
    iconClass: 'text-paper-accent',
    tintClass: 'bg-paper-accent/10',
  },
  {
    id: 'mapa',
    title: 'Mapa',
    description: 'Guarda lugares y recuérdalos justo donde los necesitas.',
    action: 'Explorar ahora',
    Icon: MapIcon,
    iconClass: 'text-paper-accent',
    tintClass: 'bg-paper-accent/10',
  },
  {
    id: 'kanban',
    title: 'Kanban',
    description: 'Organiza el trabajo en tableros y mueve tareas entre columnas.',
    action: 'Explorar ahora',
    Icon: KanbanIcon,
    iconClass: 'text-paper-accent',
    tintClass: 'bg-paper-accent/10',
  },
  {
    id: 'calendario',
    title: 'Calendario',
    description: 'Visualiza fechas, eventos y recordatorios de un vistazo.',
    action: 'Explorar ahora',
    Icon: CalendarIcon,
    iconClass: 'text-paper-accent',
    tintClass: 'bg-paper-accent/10',
  },
]

export interface Step {
  id: string
  number: string
  title: string
  description: string
  note: string
  Icon: ComponentType<IconProps>
}

export const steps: Step[] = [
  {
    id: 'cuaderno',
    number: '01',
    title: 'Abre tu cuaderno',
    description:
      'Crea un espacio para cada parte de tu vida: estudios, trabajo, casa o ese proyecto que no quieres soltar.',
    note: 'Un lugar para empezar.',
    Icon: NotebookIcon,
  },
  {
    id: 'captura',
    number: '02',
    title: 'Captura sin fricción',
    description:
      'Escribe una nota, una lista o una fecha. Nottia la guarda con su color, su contexto y su recordatorio.',
    note: 'La idea no espera.',
    Icon: NoteIcon,
  },
  {
    id: 'ordena',
    number: '03',
    title: 'Ordénalo a tu manera',
    description:
      'Mueve lo importante al calendario, al mapa o al kanban. Lo demás puede quedarse en su hoja.',
    note: 'Tu sistema, tus reglas.',
    Icon: CalendarIcon,
  },
]

export interface Detail {
  id: string
  title: string
  description: string
  Icon: ComponentType<IconProps>
  cardClass: string
  iconClass: string
}

export const details: Detail[] = [
  {
    id: 'privacidad',
    title: 'Privacidad primero',
    description: 'Tus notas son tuyas. Decide qué compartes, qué bloqueas y qué queda en tu cuaderno.',
    Icon: LockIcon,
    cardClass: 'border-[#e2d2b6] bg-[#f5eddc]',
    iconClass: 'text-[#9a6b2f]',
  },
  {
    id: 'recordatorios',
    title: 'Recordatorios con intención',
    description: 'Una fecha, una hora y un empujón amable. Sin ruido, sin diez notificaciones de más.',
    Icon: BellIcon,
    cardClass: 'border-[#c9d8cd] bg-[#e9f0e8]',
    iconClass: 'text-[#3f7d65]',
  },
  {
    id: 'busqueda',
    title: 'Encuentra en segundos',
    description: 'Busca por título, contenido, color o cuaderno. Lo que escribiste ayer sigue ahí.',
    Icon: SearchIcon,
    cardClass: 'border-[#d9c3b6] bg-[#f4e7dd]',
    iconClass: 'text-[#a85b3d]',
  },
  {
    id: 'compartir',
    title: 'Comparte lo que importa',
    description: 'Un enlace público para una nota o una semana entera. Sin cuentas extra, sin ruido.',
    Icon: LinkIcon,
    cardClass: 'border-[#d8ccf8] bg-[#efe9ff]',
    iconClass: 'text-[#7254d6]',
  },
  {
    id: 'sincronizacion',
    title: 'Siempre a mano',
    description: 'Tu cuaderno te sigue entre el navegador y el móvil para que no pierdas el hilo.',
    Icon: SparkleIcon,
    cardClass: 'border-[#c8d5e8] bg-[#e8eef8]',
    iconClass: 'text-[#4a6f9f]',
  },
  {
    id: 'control',
    title: 'Tú tienes el control',
    description: 'Colores, contraseñas, fijados y bloques. Ajusta el papel hasta que se sienta tuyo.',
    Icon: ShieldIcon,
    cardClass: 'border-[#e3c4c0] bg-[#f6e5e2]',
    iconClass: 'text-[#a24e4b]',
  },
]

export interface Value {
  title: string
  description: string
}

export const values: Value[] = [
  {
    title: 'Calma',
    description: 'Menos pestañas, menos ruido. Un lugar que no te pide atención todo el tiempo.',
  },
  {
    title: 'Intención',
    description: 'Cada nota tiene un porqué. Nottia está pensada para que encuentres el tuyo.',
  },
  {
    title: 'Privacidad',
    description: 'Lo personal se queda en tu cuaderno. Compartir siempre es una decisión.',
  },
]

export interface ContactReason {
  id: string
  title: string
  description: string
  subject: string
  Icon: ComponentType<IconProps>
}

export const contactReasons: ContactReason[] = [
  {
    id: 'idea',
    title: 'Una idea',
    description: '¿Se te ocurre una forma de hacer Nottia más útil? Escuchamos.',
    subject: 'Idea para Nottia',
    Icon: SparkleIcon,
  },
  {
    id: 'bug',
    title: 'Un detalle roto',
    description: 'Cuéntanos qué pasó y qué esperabas que pasara. Lo revisamos.',
    subject: 'Reporte de un detalle en Nottia',
    Icon: AlertIcon,
  },
  {
    id: 'colaboracion',
    title: 'Colaboración',
    description: '¿Quieres construir con nosotros o hablar de Nottia en algún sitio?',
    subject: 'Colaboración con Nottia',
    Icon: UsersIcon,
  },
]

export interface Faq {
  question: string
  answer: string
}

export const faqs: Faq[] = [
  {
    question: '¿Nottia es gratis?',
    answer:
      'Puedes crear tu cuenta y empezar a organizar tus notas sin pagar. La idea es que lo importante esté siempre disponible.',
  },
  {
    question: '¿Puedo compartir una nota?',
    answer:
      'Sí. Cada nota puede compartirse con un enlace público de solo lectura. Tú decides qué compartes y qué se queda privado.',
  },
  {
    question: '¿Dónde se guardan mis notas?',
    answer:
      'En tu cuenta de Nottia. Tus notas se sincronizan con el servidor y solo tú puedes editarlas desde tu sesión.',
  },
  {
    question: '¿Funciona en el móvil?',
    answer:
      'Nottia está pensada para acompañarte. Puedes abrirla en el navegador del móvil y tener tus notas, listas y fechas a mano.',
  },
]
