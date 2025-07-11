import { useState } from 'react'

export default function BlueprintVisibilityInput({ currentVisibility }: { currentVisibility?: "public" | "unlisted" | "private" }) {
  const [visibility, setVisibility] = useState<"public" | "unlisted" | "private">(currentVisibility || 'public')

  return (
    <>
      <label htmlFor="blueprintVisibility"> Blueprint Visibility</label>
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          className={`flex-1 h-10 p-2 rounded-none outline-none border-b-2
            ${visibility === 'public' ? 'bg-green-600 text-white border-green-700' : 'bg-light-bg text-white border-main-orange'}
          `}
          onClick={() => setVisibility('public')}
        >
          Public
        </button>
        <button
          type="button"
          className={`flex-1 h-10 p-2 rounded-none outline-none border-b-2
            ${visibility === 'unlisted' ? 'bg-orange-500 text-white border-orange-700' : 'bg-light-bg text-white border-main-orange'}
          `}
          onClick={() => setVisibility('unlisted')}
        >
          Unlisted
        </button>
        <button
          type="button"
          className={`flex-1 h-10 p-2 rounded-none outline-none border-b-2
            ${visibility === 'private' ? 'bg-red-600 text-white border-red-700' : 'bg-light-bg text-white border-main-orange'}
          `}
          onClick={() => setVisibility('private')}
        >
          Private
        </button>
      </div>
      <input type="hidden" id="blueprintVisibility" name="blueprintVisibility" value={visibility} />
      <div className="text-xs lg:text-sm text-gray-400 space-y-1 mb-4 lg:mb-6">
        <div><span className="font-semibold text-green-400/75">Public:</span> Everyone can see it.</div>
        <div><span className="font-semibold text-orange-300/75">Unlisted:</span> Only accessible via blueprint pack.</div>
        <div><span className="font-semibold text-red-400/75">Private:</span> Only owner can see it.</div>
      </div>
    </>
  )
}