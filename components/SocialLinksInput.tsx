'use client'

import { useState } from 'react'
import { CirclePlus, Trash2 } from 'lucide-react'
import Image from 'next/image'

const allPlatforms = [
  { slug: 'youtube', name: 'YouTube' },
  { slug: 'twitch', name: 'Twitch' },
  { slug: 'kick', name: 'Kick' },
  { slug: 'discord', name: 'Discord' },
  { slug: 'reddit', name: 'Reddit' },
  { slug: 'github', name: 'GitHub' },
]

export default function SocialLinksInput({ error, existingSocialLinks }: {
  error: Record<string, string>,
  existingSocialLinks?: { platform: string, url: string }[]
}) {
  const [socialLinks, setSocialLinks] = useState(existingSocialLinks || [])
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // Reformat the error object
  let socialLinksError = {}
  if (error) {
    Object.keys(error).forEach((platform) => {
      if (error[platform]) {
        Object.values(error[platform]).forEach((err) => {
          if (err) {
            socialLinksError[platform] = socialLinksError[platform] || []
            socialLinksError[platform].push(err)
          }
        })
      }
    })
  }

  const availablePlatforms = allPlatforms.filter(
    (platform) => !socialLinks.some((link) => link.platform === platform.slug)
  )

  const handleAddPlatform = (platformId) => {
    setSocialLinks((prev) => [...prev, { platform: platformId, url: '' }])
    setDropdownOpen(false)
  }

  const handleUrlChange = (platformId, value) => {
    setSocialLinks((prev) =>
      prev.map((link) =>
        link.platform === platformId ? { ...link, url: value } : link
      )
    )
  }

  const handleRemove = (platformId) => {
    setSocialLinks((prev) => prev.filter((link) => link.platform !== platformId))
  }

  return (
    <div className='w-full flex flex-col items-start mb-4'>
      {
        !existingSocialLinks &&
        <label className='w-full text-xs lg:text-base lg:mb-2'>Social Links (Optional)</label>
      }

      {/* Add Button & Dropdown */}
      <div className='relative w-full mb-4'>
        <button
          type='button'
          onClick={() => setDropdownOpen((prev) => !prev)}
          className='w-full p-2 gap-2 flex items-center justify-center bg-light-bg text-white hover:bg-dark-gray hover:text-main-orange'
        >
          <span>Add Social Link</span>
          <CirclePlus className='w-4 h-4' />
        </button>

        {dropdownOpen && availablePlatforms.length > 0 && (
          <ul className='absolute z-10 mt-2 w-40 bg-light-bg border border-main-orange max-h-60 overflow-y-auto'>
            {availablePlatforms.map((platform) => (
              <li
                key={platform.slug}
                className='p-2 hover:bg-main-orange cursor-pointer text-white'
                onClick={() => handleAddPlatform(platform.slug)}
              >
                {platform.name}
              </li>
            ))}
          </ul>
        )}
        {dropdownOpen && availablePlatforms.length === 0 && (
          <div className='absolute mt-2 p-2 bg-light-bg text-sm text-gray-400 border border-main-orange'>
            All platforms added
          </div>
        )}
      </div>

      {/* Inputs */}
      {socialLinks.map(({ platform, url }) => {
        const platformLabel = allPlatforms.find(p => p.slug === platform)?.name || platform
        return (
          <div key={platform} className='w-full mb-4'>
            <label className='flex text-xs lg:text-base mb-1 text-white'>
              <Image
                src={`/icons/${platform}-logo.svg`}
                alt={`${platformLabel} Icon`}
                width={20}
                height={20}
                className='mr-2 object-contain'
              />
              {platformLabel}
            </label>
            <div className='flex gap-2'>
              <input
                type='text'
                name={`social-${platform}`}
                placeholder={`Enter ${platformLabel} URL`}
                value={url}
                autoCapitalize='none'
                autoCorrect='off'
                spellCheck='false'
                onChange={(e) => handleUrlChange(platform, e.target.value)}
                className='w-full h-8 lg:h-10 p-2 bg-light-bg text-white focus:outline-none focus:border-b-2 focus:border-main-orange rounded-none'
              />
              <button
                type='button'
                onClick={() => handleRemove(platform)}
                className='text-error text-xl leading-none px-2 rounded-full hover:bg-red-400/25 transition-colors duration-100'
                title='Remove'
              >
                <Trash2 />
              </button>
            </div>
            {socialLinksError[platform] && (
              <div className="w-full text-xs lg:text-base text-error">
                <p>Social link must:</p>
                <ul>
                  {socialLinksError[platform].map((error) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
