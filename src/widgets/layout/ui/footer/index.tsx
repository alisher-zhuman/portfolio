import { ContactLinks } from '@entities/profile'

export const Footer = () => (
  <footer aria-labelledby="footer-title" className="section-shell mt-16 pb-20">
    <h2 id="footer-title" className="font-display text-3xl font-bold sm:text-4xl">
      Финальный свисток
    </h2>

    <p className="text-on-pitch-muted mt-2.5 max-w-prose">
      Если нужен разработчик, который не боится перейти на другую позицию, напишите.
    </p>

    <ContactLinks emailLabel="short" className="mt-6" />

    <p className="text-on-pitch-muted mt-7 text-sm">
      Говорят, на этом сайте работает чит-код из старых приставок.{' '}
      <span aria-label="Вверх, вверх, вниз, вниз, влево, вправо, влево, вправо, B, A">
        ↑ ↑ ↓ ↓ ← → ← → B A
      </span>
    </p>
  </footer>
)
