import { profile } from '@entities/profile'

import { TagList } from '@shared/ui'

export const ScoutReport = () => {
  const { strengths, growing, stack, note } = profile.scout

  return (
    <div className="max-w-prose">
      <h3 className="font-display text-2xl font-bold">Отчёт скаута</h3>

      <dl className="mt-5 grid gap-4.5">
        <div>
          <dt className="text-sun font-semibold">Сильные стороны</dt>
          <dd className="mt-1">{strengths}</dd>
        </div>

        <div>
          <dt className="text-sun font-semibold">Растёт в</dt>
          <dd className="mt-1">{growing}</dd>
        </div>

        <div>
          <dt className="text-sun font-semibold">Основной состав</dt>
          <dd className="mt-1.5">
            <TagList label="Стек" items={stack} />
          </dd>
        </div>

        <div>
          <dt className="text-sun font-semibold">Замечание</dt>
          <dd className="mt-1">{note}</dd>
        </div>
      </dl>
    </div>
  )
}
