import { array, any, enum as enum_, object, string, number } from "zod"

export const LoginFormSchema = object({
  email: string().email({ message: 'Please enter a valid email.' }).trim(),
  password: string()
    .min(8, { message: 'Be at least 8 characters long' })
    .max(64, { message: 'Be at most 64 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})

export const SignupFormSchema = object({
  name: string()
    .min(3, { message: 'Name must be at least 3 characters long.' })
    .max(64, { message: 'Name must be at most 64 characters long.' })
    .regex(/^[a-zA-Z0-9_-]*$/, {
      message: 'Name can only include letters, numbers, -dashes, _underscores.',
    })
    .trim(),
  email: string().email({ message: 'Please enter a valid email.' }).trim(),
  password: string()
    .min(8, { message: 'Be at least 8 characters long' })
    .max(64, { message: 'Be at most 64 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})

export const ForgotPasswordFormSchema = object({
  email: string().email(),
})

export const ResetPasswordFormSchema = object({
  password: string().min(8),
  confirmPassword: string().min(8),
})

const AvatarEnum = enum_(['bacon-agaric', 'beryl-nut', 'ficsit-coffee-cup', 'lizard-doggo', 'paleberry', 'pioneer', 'small-stinger', 'space-giraffe-tick-penguin-whale'])
const ColorEnum = enum_(['gray', 'purple', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red'])

export const CreatePioneerFormSchema = object({
  name: string()
    .min(3, { message: 'Name must be at least 3 characters long.' })
    .max(24, { message: 'Name must be at most 24 characters long.' })
    .regex(/^[a-z0-9_-]*$/, {
      message: 'Name can only include lowercase letters, numbers, -dashes, _underscores.',
    })
    .regex(/^(?![-_]+$)/, {
      message: 'Name must contain at least one letter or number.',
    })
    .trim(),
  avatar: AvatarEnum,
  color: ColorEnum,
})

export const UpdateAvatarFormSchema = object({
  avatar: AvatarEnum,
  color: ColorEnum,
})

// category checkboxes
const CategoriesEnum = enum_([
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

export const CreateBlueprintFormSchema = object({
  title: string()
    .min(3, { message: 'Title must be at least 3 characters long.' })
    .max(64, { message: 'Title must be at most 64 characters long.' })
    // Can only include letters, numbers, -dashes, _underscores, () paranthesis, and spaces.
    .regex(/^[a-zA-Z0-9_()-\s]*$/, {
      message: 'Title can only include letters, numbers, -dashes, _underscores, ()paranthesis, and spaces.',
    })
    // Must contain at least one letter or number.
    .regex(/^(?![-_]+$)/, {
      message: 'Title must contain at least one letter or number.',
    })
    // Cannot have more than one consecutive space.
    .regex(/^(?!.*\s{2}).*$/, {
      message: 'Title cannot have more than one consecutive space.',
    })
    .trim(),
  description: string().max(1024, { message: 'Description must be at most 1024 characters long.' }).optional(),
  images: array(string().url({ message: 'Must be a valid image URL.' }))
    .min(1, { message: 'At least 1 image is required.' })
    .max(3, { message: 'At most 3 images are allowed.' }),
  files: any()
    .refine((files) => files?.length == 2, "Both .sbp and .sbpcfg files are required."),
  categories: array(CategoriesEnum)
    .min(1, { message: 'At least one category has to selected.' })
    .max(5, { message: 'At most 5 categories can be selected.' }),
  videoUrl: string().trim().transform((val) => (val === "" ? undefined : val))
    .refine((url) => !url || url.startsWith("https://"), {
      message: "Must start with https://",
    })
    .refine(
      (url) =>
        !url ||
        url.includes("youtube.com/watch?v=") ||
        url.includes("youtu.be/"),
      {
        message: "Must be a valid YouTube URL",
      }
    )
    .optional(),
  visibility: enum_(["public", "unlisted", "private"])
})

export const UpdateBlueprintFormSchema = object({
  id: string(),
  description: string().max(1024, { message: 'Description must be at most 1024 characters long.' }).optional(),
  images: array(string().url({ message: 'Must be a valid image URL.' }))
    .min(1, { message: 'At least 1 image is required.' })
    .max(3, { message: 'At most 3 images are allowed.' }),
  categories: array(CategoriesEnum)
    .min(1, { message: 'At least one category has to selected.' })
    .max(5, { message: 'At most 5 categories can be selected.' }),
  videoUrl: string().trim().transform((val) => (val === "" ? undefined : val))
    .refine((url) => !url || url.startsWith("https://"), {
      message: "Must start with https://",
    })
    .refine(
      (url) =>
        !url ||
        url.includes("youtube.com/watch?v=") ||
        url.includes("youtu.be/"),
      {
        message: "Must be a valid YouTube URL",
      }
    )
    .optional(),
  visibility: enum_(["public", "unlisted", "private"])
})

const httpsRegex = /^https:\/\//
const platformPatterns = {
  youtube: /^(https:\/\/)(www\.)?youtube\.com/,
  twitch: /^(https:\/\/)(www\.)?twitch\.tv/,
  kick: /^(https:\/\/)(www\.)?kick\.com/,
  discord: /^(https:\/\/)(www\.)?discord\.gg/,
  reddit: /^(https:\/\/)(www\.)?reddit\.com/,
  github: /^(https:\/\/)(www\.)?github\.com/,
}

export const SocialLinksSchema = object({
  youtube: string().trim().url("Must be valid URL")
    .regex(httpsRegex, "Must start with https://")
    .regex(platformPatterns.youtube, "Must be valid YouTube URL").optional(),
  twitch: string().trim().url("Invalid URL")
    .regex(httpsRegex, "Must start with https://")
    .regex(platformPatterns.twitch, "Must be valid Twitch URL").optional(),
  kick: string().url("Invalid URL")
    .regex(httpsRegex, "Must start with https://")
    .regex(platformPatterns.kick, "Must be valid Kick URL").optional(),
  discord: string().url("Invalid URL")
    .regex(httpsRegex, "Must start with https://")
    .regex(platformPatterns.discord, "Must be valid Discord URL").optional(),
  reddit: string().url("Invalid URL")
    .regex(httpsRegex, "Must start with https://")
    .regex(platformPatterns.reddit, "Must be valid Reddit URL").optional(),
  github: string().url("Invalid URL")
    .regex(httpsRegex, "Must start with https://")
    .regex(platformPatterns.github, "Must be valid GitHub URL").optional(),
})

export const CreateCommentSchema = object({
  content: string()
    .min(1, { message: 'Comment cannot be empty.' })
    .max(1000, { message: 'Comment must be at most 1000 characters long.' })
    .trim(),
  blueprintId: number()
})

export const UpdateCommentSchema = object({
  content: string()
    .min(1, { message: 'Comment cannot be empty.' })
    .max(1000, { message: 'Comment must be at most 1000 characters long.' })
    .trim(),
  commentId: number()
})

export const CreateBlueprintPackFormSchema = object({
  title: string()
    .min(3, { message: 'Title must be at least 3 characters long.' })
    .max(64, { message: 'Title must be at most 64 characters long.' })
    // Can only include letters, numbers, -dashes, _underscores, () paranthesis, and spaces.
    .regex(/^[a-zA-Z0-9_()-\s]*$/, {
      message: 'Title can only include letters, numbers, -dashes, _underscores, ()paranthesis, and spaces.',
    })
    // Must contain at least one letter or number.
    .regex(/^(?![-_]+$)/, {
      message: 'Title must contain at least one letter or number.',
    })
    // Cannot have more than one consecutive space.
    .regex(/^(?!.*\s{2}).*$/, {
      message: 'Title cannot have more than one consecutive space.',
    })
    .trim(),
  description: string().max(1024, { message: 'Description must be at most 1024 characters long.' }).optional(),
  images: array(string().url({ message: 'Must be a valid image URL.' }))
    .min(1, { message: 'At least 1 image is required.' })
    .max(3, { message: 'At most 3 images are allowed.' }),
  blueprints: array(string())
    .min(2, { message: 'At least 2 blueprints are required.' })
    .max(100, { message: 'At most 100 blueprints are allowed.' }),
  categories: array(CategoriesEnum)
    .min(1, { message: 'At least one category has to selected.' })
    .max(5, { message: 'At most 5 categories can be selected.' }),
  videoUrl: string().trim().transform((val) => (val === "" ? undefined : val))
    .refine((url) => !url || url.startsWith("https://"), {
      message: "Must start with https://",
    })
    .refine(
      (url) =>
        !url ||
        url.includes("youtube.com/watch?v=") ||
        url.includes("youtu.be/"),
      {
        message: "Must be a valid YouTube URL",
      }
    )
    .optional()
})

export const UpdateBlueprintPackFormSchema = object({
  id: string(),
  description: string().max(1024, { message: 'Description must be at most 1024 characters long.' }).optional(),
  images: array(string().url({ message: 'Must be a valid image URL.' }))
    .min(1, { message: 'At least 1 image is required.' })
    .max(3, { message: 'At most 3 images are allowed.' }),
  blueprints: array(string())
    .min(2, { message: 'At least 2 blueprints are required.' })
    .max(100, { message: 'At most 100 blueprints are allowed.' }),
  categories: array(CategoriesEnum)
    .min(1, { message: 'At least one category has to selected.' })
    .max(5, { message: 'At most 5 categories can be selected.' }),
  videoUrl: string().trim().transform((val) => (val === "" ? undefined : val))
    .refine((url) => !url || url.startsWith("https://"), {
      message: "Must start with https://",
    })
    .refine(
      (url) =>
        !url ||
        url.includes("youtube.com/watch?v=") ||
        url.includes("youtu.be/"),
      {
        message: "Must be a valid YouTube URL",
      }
    )
    .optional()
})
