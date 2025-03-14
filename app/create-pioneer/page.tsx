import CreatePioneerForm from "./form"
import Main from "../../components/Main"

export default function CreatePioneerPage() {
  return (
    <Main classname="p-16 max-w-lg flex flex-col justify-center" image='create-pioneer-banner'>
      <h1 className='text-2xl lg:text-4xl mb-4 lg:mb-1'>Create your account</h1>
      <p className=' text-xs lg:text-base mb-4 text-main-gray'>One last step to become a Ficsit pioneer!</p>
      <CreatePioneerForm />
    </Main>
  )
}