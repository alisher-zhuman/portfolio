import { type CareerEvent } from './types'

// Ordered by minute; the scoreboard and the scroll clock rely on that order.
export const careerEvents: CareerEvent[] = [
  {
    minute: 1,
    title: 'Старт: Талас',
    text: 'Родной город. Здесь прозвучал стартовый свисток.',
    kind: 'regular',
  },
  {
    minute: 23,
    title: 'Трансфер в Бишкек',
    text: 'Переезд в столицу: больше возможностей, больше IT.',
    kind: 'regular',
  },
  {
    minute: 38,
    title: 'Колледж, «Информационная безопасность»',
    text: 'Сети, криптография и привычка смотреть на систему глазами атакующего.',
    kind: 'regular',
  },
  {
    minute: 52,
    title: 'Первые проекты на React',
    text: 'Первые компоненты, пет-проекты и первый деплой. Счёт открыт.',
    kind: 'goal',
  },
  {
    minute: 67,
    title: 'Middle Frontend Developer в «Түндүк»',
    text: 'Государственные сервисы: публичный портал и админ-панель.',
    kind: 'big-goal',
  },
  {
    minute: 74,
    title: 'Первые бэкенд-задачи',
    text: 'Эндпоинты и работа с базой в kca-backend на рабочем проекте. Понравилось.',
    kind: 'regular',
  },
  {
    minute: 78,
    title: 'Замена: выход на бэкенд-позицию',
    text: 'В процессе… Node.js, SQL, проектирование API.',
    kind: 'substitution',
  },
]

export const commentary: string[] = [
  'Алишер обводит трёх багов и выходит один на один с продом!',
  'Судья показывает жёлтую карточку за !important в CSS.',
  'VAR проверяет: это баг или фича? Фича. Игра продолжается.',
  'Тренер кричит с бровки: «Типизируй!»',
  'Трибуны скандируют: «S-Q-L! S-Q-L!»',
  'Мяч попадает в штангу. Штанга оказалась legacy-кодом.',
  'Статистика матча: ноль console.log в продакшене. Почти.',
]
