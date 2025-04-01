"use client"

import Main from "../../components/Main"
import { Clipboard } from "lucide-react"
import { useState } from "react"

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex flex-row items-center ml-2 p-1 bg-main-bg rounded hover:bg-light-bg transition"
    >
      <Clipboard size={16} />
      {copied && <span className="ml-1 text-sm text-green-400">Copied!</span>}
    </button>
  )
}

export default function FAQPage() {
  return (
    <Main classname="flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl md:text-2xl sm:text-xl font-bold mb-6 text-center">FAQ</h1>

        <div className="mb-16">
          <h2 className="text-xl md:text-lg sm:text-base font-semibold">Where can I find my blueprint files?</h2>
          <div className="w-full h-[1px] bg-main-orange" />
          <p className="mt-2 text-gray-200 text-lg md:text-base sm:text-sm">
            If you want to share your blueprint but don&apos;t know where to find your <code>.sbp</code> and <code>.sbpcfg</code> files, you can find your blueprint files in this directory:
          </p>
          <div className="flex items-center bg-dark-bg text-sm p-4 rounded mt-2 overflow-x-auto">
            <span className="flex-1">%localappdata%/FactoryGame/Saved/SaveGames/blueprints/</span>
            <CopyButton text="%localappdata%/FactoryGame/Saved/SaveGames/blueprints/" />
          </div>
          <p className="mt-2 text-gray-200 text-lg md:text-base sm:text-sm">
            At that direction, select the folder with the name of your savegame
          </p>
        </div>

        <div>
          <h2 className="text-xl md:text-lg sm:text-base font-semibold">How can I use the installed blueprints?</h2>
          <div className="w-full h-[1px] bg-main-orange" />
          <p className="mt-2 text-gray-200 text-lg md:text-base sm:text-sm">
            You can use the installed blueprints by putting the <code>.sbp</code> and <code>.sbpcfg</code> files in this directory:
          </p>
          <div className="flex items-center bg-dark-bg text-sm p-4 rounded mt-2 overflow-x-auto">
            <span className="flex-1">%localappdata%/FactoryGame/Saved/SaveGames/blueprints/</span>
            <CopyButton text="%localappdata%/FactoryGame/Saved/SaveGames/blueprints/" />
          </div>
          <p className="mt-2 text-gray-200 text-lg md:text-base sm:text-sm">
            At that direction, select the folder with the name of your savegame
          </p>
          <p className="mt-2 text-gray-200 text-lg md:text-base sm:text-sm">
            If the directory doesn&apos;t exist, create a sample blueprint in-game, and it will create the directory for you.
          </p>
          <p className="mt-2 text-gray-200 text-lg md:text-base sm:text-sm">
            If you don&apos;t see the blueprints in-game, try restarting the game or reloading the savegame.
          </p>
        </div>
      </div>
    </Main>
  )
}