import { CardBack } from '../card-back'
import { CardFlip } from '../card-flip'
import { CardFront } from '../card-front'

// The collectible card. Both faces are Server Components passed into the client flip shell, so
// the bio on the back is in the HTML for crawlers and screen readers whichever side is showing.
export const PlayerCard = () => <CardFlip front={<CardFront />} back={<CardBack />} />
