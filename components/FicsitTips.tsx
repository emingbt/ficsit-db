import React from "react"

const tips = [
  "Don't die.",
  "Back to work, and Stay Effective.",
  "Are you feeling stuck ? Are you lost ? Is the entire world against you ? Inform ADA so we can replace your brain's reward center!",
  "Bored of the standard orange and grey factories ? Try out our FICSIT - approved color gun! ...Oh wait, it's not even in the game anymore.",
  "Getting killed a lot ? Try bringing a weapon next time, or medkits, or, you know, stop doing whatever you're doing.",
  "Be nice to Steve, he's under a lot of pressure.",
  "We own you.",
  "Don't worry, be happy.",
  "ADA is always watching.",
  "Who am I to tell you what to do?",
  "Am I real ?",
  "One of these is not like the others.",
  "Your fun is wrong.",
  "Life needs things to live.",
  "Is it Thursday yet ?",
  "Are you real ?",
  "[REDACTED]",
  "Keep an eye on that power capacity.",
  "Faster belts don't necessarily mean faster production.",
  "Whoever reads this is a poo - poo head.",
  "You are appreciated.",
  "Look behind you.",
  "So, uh, wanna go out sometime ?",
  "Wait is this supposed to be useful or something ?",
  "< 3",
  "Level Up ? Ha, Kidding.We don't even have levels.",
  "Can't stop wont stop!",
  "Now we have to load the game for you, all over again.",
  "If you're afraid of spiders, we got your back. Enable Arachnophobia mode in the options menu. Get it? Arach-NO-phobia?",
  "Sometimes all you need is a potato.",
  "I had a lot of fun writing these.",
  "BRB",
  "Congratulations! You made it to the loading screen.",
  "Dear diary,",
  "Happy Birthday",
  "I'd love to stay and chat, but...",
  "The key is a lie.",
  "GG EZ",
  "Catch phrase!",
  "Rude",
  "Come here often ?",
  "Hello ? Anyone there ?",
  "Life + Universe + Everything",
  "Abort.",
  "Hey, nice to see you again.",
  "insert lore here",
  "Hope you brought a towel.",
  "This is my favorite tip in the game.​",
]

export default function FicsitTips() {
  const tipIndex = Math.floor(Math.random() * tips.length)
  const tip = tips[tipIndex]

  return (
    <div className="w-full h-full border-4 border-[#e69138] bg-[#222] text-[#e69138]">
      <div className="bg-[#e69138] text-[#222] px-3 py-1.5 font-medium tracking-wider text-base xl:text-lg" style={{ fontFamily: 'inherit' }}>
        FICSIT TIP NO. {tipIndex + 1}
      </div>
      <div className="px-3 py-4 text-base xl:text-xl bg-[#222] text-[#e69138] font-normal" style={{ fontFamily: 'inherit' }}>
        {tip}
      </div>
    </div>
  )
}