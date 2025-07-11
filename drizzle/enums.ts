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

export const categoryEnum = pgEnum('category', [
  'Architecture',
  'Belts',
  'Compact',
  'Decorations',
  'Foundations',
  'Hypertubes',
  'Load Balancer',
  'Logistics',
  'Modded',
  'Pipes',
  'Power',
  'Production',
  'Roads',
  'Signs',
  'Storage',
  'Supports',
  'Tracks',
  'Trains',
  'Transportation'
])

export const platformEnum = pgEnum('platform', [
  'youtube',
  'twitch',
  'kick',
  'discord',
  'reddit',
  'github'
])

export const blueprintVisibilityEnum = pgEnum('blueprint_visibility', [
  'public',
  'unlisted',
  'private'
])