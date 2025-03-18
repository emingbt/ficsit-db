export default function DesktopAd({ bottom, fullWidth, fullHeight }: { bottom?: boolean, fullWidth?: boolean, fullHeight?: boolean }) {
  return (
    <div className={`${fullWidth ? "w-full" : "w-[728px]"} ${fullHeight ? "h-full" : "h-24"} bg-black hidden lg:flex items-center justify-center ${!bottom && "mb-4"}`}>
      Ad
    </div>
  )
}