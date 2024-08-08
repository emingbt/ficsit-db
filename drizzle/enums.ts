import { pgEnum } from 'drizzle-orm/pg-core'

export const avatarEnum = pgEnum('avatar', [
  'bacon-agaric',
  'beryl-nut',
  'ficsit-coffee-cup',
  'lizard-doggo',
  'paleberry',
  'pioneer',
  'small-stinger',
  'space-giraffe-tick-penguin-whale'
])
export const colorEnum = pgEnum('color', [
  'gray',
  'purple',
  'indigo',
  'blue',
  'green',
  'yellow',
  'orange',
  'red'
])
export const roleEnum = pgEnum('role', ['admin', 'user'])