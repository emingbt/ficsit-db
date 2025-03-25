import { array, any, enum as enum_, object, string } from "zod"

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
    .regex(/^[a-zA-Z0-9_-]*$/, {
      message: 'Name can only include letters, numbers, -dashes, _underscores.',
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
  'Power',
  'Transportation',
  'Trains',
  'Tracks',
  'Roads',
  'Hypertubes',
  'Foundations',
  'Compact',
  'Belts',
  'Load Balancer',
  'Logistics',
  'Signs',
  'Decorations',
  'Storage',
  'Pipes',
  'Supports'
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
  description: string().max(1024, { message: 'Description must be at most 1024 characters long.' }),
  images: any()
    .refine((images) => images?.length > 0, "At least 1 image is required.")
    .refine((images) => images?.length <= 3, "At most 3 images are allowed.")
    .refine((files) => files?.every((file: File) => file.size < 5000000), {
      message: `File size must be less than 5MB.`,
    }),
  files: any()
    .refine((files) => files?.length == 2, "Both .sbp and .sbpcfg files are required.")
    .refine((files) => files?.every((file: File) => file.size < 5000000), {
      message: `File size must be less than 5MB.`,
    }),
  categories: array(CategoriesEnum)
    .min(1, { message: 'At least one category has to selected.' })
    .max(3, { message: 'At most 3 categories can be selected.' })
})

export const UpdateBlueprintFormSchema = object({
  id: string(),
  description: string().max(1024, { message: 'Description must be at most 512 characters long.' }),
  images: any()
    .refine((images) => images?.length > 0, "At least 1 image is required.")
    .refine((images) => images?.length <= 3, "At most 3 images are allowed."),
  categories: array(CategoriesEnum)
    .min(1, { message: 'At least one category has to selected.' })
    .max(3, { message: 'At most 3 categories can be selected.' })
})