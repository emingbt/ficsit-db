"use client"

import { useState } from "react"
import FileIcon from "../assets/fileIcon.svg"

export default function FileInput({ fileError }: { fileError: string }) {
  const [files, setFiles] = useState<File[]>(Array.from({ length: 2 }))

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const inputFiles = event.target.files

    if (inputFiles) {
      const file = inputFiles[0]
      let newFiles = [...files]
      console.log("newFiles1", newFiles)

      newFiles[index] = file
      console.log("newFiles2", newFiles)
      setFiles(newFiles)
    }
  }

  return (
    <>
      <label htmlFor="files">Blueprint files</label>
      <div className={`w-full flex flex-col sm:flex-row gap-4 ${!fileError && "mb-4 lg:mb-6"}`}>
        <div className="w-full h-24 relative bg-dark-bg hover:bg-light-bg">
          <div className="w-full h-full absolute top-0 bg-transparent">
            <div className="w-full h-full flex flex-col items-center justify-center text-center">
              <FileIcon className="w-8 h-8 stroke-white" />
              {files[0] ?
                <p className="text-white">
                  {files[0].name}

                </p> :
                <p className={fileError ? "text-error" : "text-gray-400"}>Upload .SBP</p>
              }
            </div>
          </div>
          <input
            id="files"
            type="file"
            name="files"
            accept=".sbp"
            className="bg-transparent w-full h-full opacity-0 cursor-pointer"
            onChange={(event) => handleOnChange(event, 0)}
          />
        </div>
        <div className="w-full h-24 relative bg-dark-bg hover:bg-light-bg">
          <div className="w-full h-full absolute top-0 bg-transparent">
            <div className="w-full h-full flex flex-col items-center justify-center text-center">
              <FileIcon className="w-8 h-8 stroke-white" />
              {files[1] ?
                <p className="text-white">
                  {files[1].name}

                </p> :
                <p className={fileError ? "text-error" : "text-gray-400"}>Upload .SBPCFG</p>
              }
            </div>
          </div>
          <input
            id="files"
            type="file"
            name="files"
            accept=".sbpcfg"
            className="bg-transparent w-full h-full opacity-0 cursor-pointer"
            onChange={(event) => handleOnChange(event, 1)}
          />
        </div>
      </div>
      {
        fileError &&
        <div className='w-full text-xs lg:text-base text-error'>
          <p>{fileError}</p>
        </div>
      }
    </>
  )
}