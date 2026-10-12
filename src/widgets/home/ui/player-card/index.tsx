import { CardBack } from '../card-back'
import { CardFront } from '../card-front'

// The collectible card. Both faces are server-rendered and stay in the DOM, so the bio on the back
// is readable by crawlers and screen readers whichever side is showing. Hovering with a mouse flips
// it in pure CSS (Tailwind's hover: only applies on hover-capable pointers); click and keyboard
// flipping are layered on by a client component.
export const PlayerCard = () => (
  <div className="group aspect-2/3 w-full max-w-80 perspective-distant">
    <div className="relative size-full transition-transform duration-700 ease-out transform-3d group-hover:rotate-y-180 motion-reduce:transition-none">
      <CardFront />

      <CardBack />
    </div>
  </div>
)
