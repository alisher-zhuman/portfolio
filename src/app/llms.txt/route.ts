import { getTranslations } from 'next-intl/server'

import { routing } from '@/i18n/routing'

import { careerEvents } from '@entities/career'
import { profile } from '@entities/profile'
import { projects } from '@entities/project'

import { SITE_URL } from '@shared/constants'

// /llms.txt (llmstxt.org): a plain-Markdown summary of the site for AI assistants and search. Built
// from the same data and English messages as the pages, so it can't drift from them; no request
// data is read, so it is prerendered at build time like the sitemap.
export const GET = async () => {
  const t = await getTranslations({ locale: 'en' })
  const { brandName, nameVariants, role, stack, contacts } = profile
  const site = `${SITE_URL}/en`

  const career = careerEvents.map(
    ({ id, year }) =>
      `- ${year && year !== 'now' ? `${year}: ` : ''}${t(`Match.events.${id}.title`)} — ${t(`Match.events.${id}.text`)}`
  )

  const work = projects.map(({ id, title, club, from, to, stack: tech, url }) => {
    const name = title ?? t(`Projects.items.${id}.title` as 'Projects.items.kca.title')
    const period = to ? `${from} – ${to === 'present' ? 'present' : to}` : from
    const heading = url ? `[${name}](${url})` : name

    return `- ${heading} (${t(`Projects.clubs.${club}`)}, ${period}; ${tech.join(', ')}): ${t(`Projects.items.${id}.description`)}`
  })

  const body = [
    `# ${brandName}`,
    '',
    `> ${role} at ${t('Profile.club')} in ${t('Profile.city')}, Kyrgyzstan, moving into backend. This site is his portfolio, styled as a football matchday.`,
    '',
    `Also written as: ${nameVariants.join(', ')}. From ${t('Profile.hometown')}.`,
    '',
    '## Pages',
    '',
    `- [Home](${site}): player card, scout report, career as a match timeline, recommendations, latest projects`,
    `- [All projects](${site}/projects)`,
    `- Other languages: ${routing.locales
      .filter((locale) => locale !== 'en')
      .map((locale) => `${SITE_URL}/${locale}`)
      .join(', ')}`,
    '',
    '## Contacts',
    '',
    `- [CV (English, PDF)](${SITE_URL}${contacts.resumeUrls.en})`,
    `- [CV (Russian, PDF)](${SITE_URL}${contacts.resumeUrls.ru})`,
    `- [LinkedIn](${contacts.linkedinUrl})`,
    `- [GitHub](${contacts.githubUrl})`,
    `- [Telegram](${contacts.telegramUrl})`,
    `- Email: ${contacts.email}`,
    '',
    '## Stack',
    '',
    stack.join(', '),
    '',
    '## Career',
    '',
    ...career,
    '',
    '## Projects',
    '',
    ...work,
    '',
  ].join('\n')

  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } })
}
