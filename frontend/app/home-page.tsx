'use-client'

import Link from 'next/link'
import Image from "next/image"

export default function Home() {
  return (
    <main className='w-full h-full flex flex-col items-center'>
      <section className='w-full flex flex-col items-center justify-center margin-0.5rem-0'>
        <div className='w-[80%] h-[20vh] bg-error relative'>
          <Image
            src={'https://res.cloudinary.com/ficsitdb/image/upload/v1682541347/banner_ahwgdx.png'}
            alt="Banner"
            fill
            priority
          />
        </div>
        <div>
          Improve your production line
        </div>
      </section>
      {/* <StyledBannerSection>
        <StyledBannerContainer>
          <StyledBackgroundImage
            src={'https://res.cloudinary.com/ficsitdb/image/upload/v1682541347/banner_ahwgdx.png'}
            layout="fill"
            objectFit='cover'
            alt="Banner"
            priority
          />
        </StyledBannerContainer>
        <StyledBannerText>
          Improve your production line
        </StyledBannerText>
      </StyledBannerSection>
      <StyledNavSection>
        <Link href="/items" legacyBehavior>
          <StyledNavItem>
            <StyledNavImage>
              <StyledBackgroundImage
                src={'https://res.cloudinary.com/ficsitdb/image/upload/v1682541340/items-bg_m55bbp.png'}
                layout="fill"
                objectFit='cover'
                alt="Items"
              />
            </StyledNavImage>
            <StyledNavText>Items</StyledNavText>
          </StyledNavItem>
        </Link>
        <Link href="/buildings/production" legacyBehavior>
          <StyledNavItem>
            <StyledNavImage>
              <StyledBackgroundImage
                src={'https://res.cloudinary.com/ficsitdb/image/upload/v1682541330/buildings-bg_naskbu.png'}
                layout="fill"
                objectFit='cover'
                alt="Buildings"
              />
            </StyledNavImage>
            <StyledNavText>Buildings</StyledNavText>
          </StyledNavItem>
        </Link>
      </StyledNavSection> */}
    </main>
  )
}