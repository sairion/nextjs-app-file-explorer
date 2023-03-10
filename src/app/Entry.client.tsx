"use client"

import { useState } from "react"
import clsx from "clsx"

export function Entry({ children, selectable }: { children: React.ReactNode; selectable?: boolean }) {
  const [focused, setFocused] = useState(false)
  return (
    <div
      className={clsx(
        "p-3 text-xs border-b-[1px] hover:bg-gray-300 cursor-pointer border-l-slate-700 transition-[border-left-width]",
        focused ? "border-l-[8px]" : "border-l-[0px]"
      )}
      onClick={() => {
        if (selectable) {
          setFocused((state) => !state)
        }
      }}>
      {children}
    </div>
  )
}
