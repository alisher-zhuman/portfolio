import { type Project } from './types'

export const projects: Project[] = [
  {
    number: 10,
    title: 'KCA Public Portal',
    context: 'Рабочий проект в «Түндүк»',
    isWork: true,
    description:
      'Публичный портал государственного сервиса. Формы подачи заявлений с валидацией, личный кабинет и адаптивная вёрстка, которая одинаково удобна на телефоне и на компьютере.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    linkNote: 'Закрытый код',
  },
  {
    number: 6,
    title: 'KCA Admin Panel',
    context: 'Рабочий проект в «Түндүк»',
    isWork: true,
    description:
      'Внутренняя панель для сотрудников: таблицы с сортировкой и фильтрами, роли и права доступа. Здесь же взял первые бэкенд-задачи в kca-backend.',
    stack: ['React', 'TypeScript'],
    backendRepo: 'kca-backend',
    linkNote: 'Закрытый код',
  },
  {
    number: 11,
    title: 'Svelte Weather Dashboard',
    context: 'Пет-проект',
    isWork: false,
    description:
      'Прогноз погоды по городам Кыргызстана: графики температуры и осадков, тёмная тема.',
    stack: ['Svelte', 'TypeScript', 'Vite'],
    link: { href: 'https://github.com/alisher-dev', label: 'Код на GitHub' },
  },
  {
    number: 9,
    title: 'Football Portfolio',
    context: 'Этот сайт',
    isWork: false,
    description:
      'Next.js со статической генерацией: контент рендерится на сервере, интерактив подключается поверх. Все звуки синтезируются в браузере через Web Audio API.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Web Audio API'],
    link: { href: 'https://github.com/alisher-dev', label: 'Код на GitHub' },
  },
]
