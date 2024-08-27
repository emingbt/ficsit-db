export default function MobileAd({ bottom, onlyPhone, rectangle }: { bottom?: boolean, onlyPhone?: boolean, rectangle?: boolean }) {
  return (
    <div className={`w-full ${rectangle ? "h-72" : "h-[50px]"} md:h-[90px] bg-black flex ${onlyPhone ? "sm:hidden" : "lg:hidden"} items-center justify-center ${!bottom && "mb-[10px] lg:mb-4"}`}>
      Ad
    </div>
  )
}