"use client"

import React from "react"

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        className="border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        {...props}
      />
    </div>
  )
}
