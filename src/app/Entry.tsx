"use client"

import * as React from "react"
import Link from "next/link"
import { useState } from "react"
import clsx from "clsx"

function FileEntry({ name, fullPath }: { fullPath: string; name: string }) {
  // TODO: click to show file info
  return <Entry selectable>{name}</Entry>
}

function Entry({ children, selectable }: { children: React.ReactNode; selectable?: boolean }) {
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

export function DirEntry({ fullPath, name }: { fullPath: string; name: string }) {
  return (
    <Link href={`/?path=${fullPath}`} prefetch={false}>
      <Entry>
        {`> `} {name}
      </Entry>
    </Link>
  )
}

export function EntriesViewClient({
  upperPath,
  userPath,
  dirs,
  files,
}: {
  upperPath: string
  userPath: string
  dirs: string[][]
  files: string[][]
}) {
  return (
    <div>
      {userPath !== "/" && <DirEntry fullPath={upperPath} name=".." />}
      {dirs.map(([fullPath, name]) => (
        <DirEntry key={`dir-${name}`} fullPath={fullPath} name={name} />
      ))}
      {files.map(([fullPath, name]) => (
        <FileEntry key={name} fullPath={fullPath} name={name} />
      ))}
    </div>
  )
}
