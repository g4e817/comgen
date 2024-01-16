import { DocumentIcon } from '@heroicons/react/24/solid'
import { FC, useEffect, useRef, useState } from 'react'
import ActivityIndicator from './ActivityIndicator'
import toast from 'react-hot-toast'

interface FileUploadElementProps {
  title: string
  setTranscript: (transcript: string) => void
  setWrongFormat: (wrongFormat: boolean) => void
}

const FileUploadElement: FC<FileUploadElementProps> = ({
  title,
  setTranscript,
  setWrongFormat,
}) => {
  const [dragActive, setDragActive] = useState<boolean>(false)
  const inputRef = useRef<any>(null)
  const [file, setFile] = useState<any>(null) // Use a single file instead of an array
  const [processing, setProcessing] = useState<boolean>(false)

  useEffect(() => {
    if (file) {
      getTextFromFile(file)
        .then((text) => {
          const isMatch = checkForRightTranscriptFormat(text as string)

          if (!isMatch) {
            toast.error('Wrong transcript format')
            setWrongFormat(true)
            removeFile()
            return
          }

          setWrongFormat(false)

          if (typeof text === 'string') setTranscript(text)
          else throw new Error('File is not a string')
        })
        .catch((error: any) => {
          toast.error(error.message)
        })
    }
  }, [file])

  const checkForRightTranscriptFormat = (transcript: string) => {
    const pattern = /^Person\d+: .+$/gm
    const isMatch = pattern.test(transcript)
    return isMatch
  }

  function handleChange(e: any) {
    e.preventDefault()
    if (
      e.target.files &&
      e.target.files[0] &&
      e.target.files[0].type === 'text/plain'
    ) {
      setFile(e.target.files[0])
      e.target.value = null
    }
  }

  const getTextFromFile = async (file: any) => {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = function () {
        resolve(reader.result)
      }
      reader.onerror = function () {
        reject(reader.error)
      }
    })
  }

  const sendTranscriptToServer = async (transcript: string) => {
    setProcessing(true)
    try {
      const res = await fetch('/api/tickets/process-transcript', {
        method: 'POST',
        body: JSON.stringify({ transcript }),
      })
      const data = await res.json()
      if (!data.response) throw new Error('Processing failed')
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setProcessing(false)
      removeFile()
    }
  }

  const handleSubmitFile = async (e: any) => {
    try {
      if (!file) {
        toast.error('No file selected')
      } else {
        const text = await getTextFromFile(file)
        if (typeof text === 'string') sendTranscriptToServer(text)
        else throw new Error('File is not a string')
        toast.success('File uploaded - Issues are being processed')
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleDrop = async (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (
      e.dataTransfer.files &&
      e.dataTransfer.files[0] &&
      e.dataTransfer.files[0].type === 'text/plain'
    ) {
      setFile(e.dataTransfer.files[0])
    }
  }

  function handleDragLeave(e: any) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  function handleDragOver(e: any) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  function handleDragEnter(e: any) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  function removeFile() {
    setFile(null)
    setTranscript('')
  }

  return (
    <form
      onDragEnter={handleDragEnter}
      onSubmit={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      <div className="col-span-full">
        <label
          htmlFor="cover-photo"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {title}
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <DocumentIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <p className="mt-1 text-sm text-gray-600">
              <span
                className={`${
                  file ? 'text-green-500' : 'text-red-500'
                } font-medium`}
              >
                {file ? 'File selected' : 'No file selected'}
              </span>
              {file && (
                <button
                  className="ml-2 text-red-500 underline"
                  onClick={removeFile}
                >
                  Remove
                </button>
              )}
            </p>
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span className="p-1">Upload a text file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  accept=".txt"
                  className="sr-only"
                  ref={inputRef}
                  onChange={handleChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              Only text files are allowed
            </p>
          </div>
        </div>
        <button
          className={`rounded-lg p-2 mt-3 w-auto ${
            file ? 'bg-green-500' : 'bg-red-500'
          }`}
          onClick={handleSubmitFile}
        >
          <span className="p-2 text-white"> Submit</span>
        </button>
      </div>
      {processing ? <ActivityIndicator /> : null}
    </form>
  )
}

export default FileUploadElement
