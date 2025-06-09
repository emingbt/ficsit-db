'use client'


import { useFormState, useFormStatus } from "react-dom"
import { updateSocialLinks } from "./action"
import SocialLinksInput from "../../components/SocialLinksInput"

export default function SocialLinksSection({ socialLinks }: {
  socialLinks: {
    platform: string,
    url: string
  }[]
}) {
  const [state, action] = useFormState(updateSocialLinks, socialLinks)
  const currentSocialLinks = socialLinks

  const socialLinksError = {
    youtube: state?.error?.youtube,
    twitch: state?.error?.twitch,
    kick: state?.error?.kick,
    discord: state?.error?.discord,
    reddit: state?.error?.reddit,
    github: state?.error?.github
  }
  const submitError = state?.error?.submit
  const submitSuccess = state?.success?.submit

  return (
    <section className="w-full h-full flex flex-col flex-grow items-start p-8 bg-main-bg">
      <h1 className="w-full text-left text-2xl mb-4">Social Links</h1>
      <div className="w-full h-full flex flex-col justify-center">
        <form action={action} className="w-full flex flex-col gap-4">
          <SocialLinksInput error={socialLinksError} existingSocialLinks={socialLinks} />
          <UpdateSocialLinksButton />
          {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
          {submitSuccess && <p className="text-green-500 text-sm">{submitSuccess}</p>}
        </form>
      </div>
    </section>
  )
}

function UpdateSocialLinksButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type='submit'
      aria-disabled={pending}
      disabled={pending}
      className={`
        w-full h-10 lg:h-10 text-base
        ${pending ? 'bg-light-bg  text-light-orange' : 'bg-main-orange'}
        hover:bg-light-bg hover:text-light-orange
      `}
    >
      {pending ? 'Submitting...' : 'Update Social Links'}
    </button>
  )
}