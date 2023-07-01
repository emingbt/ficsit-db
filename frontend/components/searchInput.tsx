import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SearchIcon from '../assets/searchIcon.svg'

export default function SearchInput() {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className='max-w-[18rem] w-full h-10 relative flex flex-row items-center justify-center'>
      <input
        className='w-full h-full px-4 py-2 bg-dark-bg border border-main-orange rounded-full text-white outline-none bg-light-bg text-xs'
        type="text"
        placeholder='Search something...'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button
        className='w-10 h-10 flex items-center justify-center absolute right-0 cursor-pointer rounded-full border border-main-orange hover:bg-main-orange hover:bg-main-orange'
        onClick={() => router.push(`/search/${searchValue}`)}
      >
        <SearchIcon />
      </button>
    </div>
  )
}