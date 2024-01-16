"use client"
import { useState } from 'react'
import FileUploadElement from './FileUpload'
import EmptyState from './EmptyState'
import Indicator, { IndicatorType } from './Indicator'

type Message = {
  person: string
  text: string
}

const FileUploadOverview = () => {
  const [transcript, setTranscript] = useState<string | null>(null)
    const [wrongFormat, setWrongFormat] = useState<boolean>(false)

  const formatMeetingText = (meetingText: string): Message[] => {
    const messages: Message[] = []
    const lines = meetingText.split('\n')

    let currentPerson = ''
    lines.forEach((line) => {
      const match = line.match(/^(Person\d+): (.+)$/)
      if (match) {
        currentPerson = match[1]
        messages.push({ person: currentPerson, text: match[2] })
      } else if (currentPerson && line.trim()) {
        messages[messages.length - 1].text += ' ' + line.trim()
      }
    })

    return messages
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {wrongFormat ? <Indicator type={IndicatorType.Warning} description="Please ensure that each line starts with 'PersonX:' followed by the message. Make sure there are no extra spaces or characters before 'PersonX'."/> : null}
        <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div className="lg:col-start-3 lg:row-end-1">
            <h2 className="sr-only">Summary</h2>
            <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5 p-5">
              <FileUploadElement
                title="Upload meeting transcript"
                setTranscript={setTranscript}
                setWrongFormat={setWrongFormat}
              />
            </div>
          </div>

          <div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16 h-[1000px] overflow-y-auto relative">
            {transcript ? (
              <>
                <h2 className="text-base font-semibold leading-6 text-gray-900">
                  Transcript preview
                </h2>
                {formatMeetingText(transcript).map((message, index) => {
                  return (
                    <div
                      key={index}
                      className={`mt-4 rounded-lg bg-gray-50 p-2 ${
                        message.person === 'Person1'
                          ? 'text-right ml-12'
                          : 'text-left mr-12'
                      }`}
                    >
                      <p className="text-sm font-medium">{message.person}</p>
                      <p className="mt-1 text-sm text-gray-900">
                        {message.text}
                      </p>
                    </div>
                  )
                })}
              </>
            ) : (
              <EmptyState
                title="No transcript uploaded"
                description="Upload a transcript to get started."
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default FileUploadOverview
