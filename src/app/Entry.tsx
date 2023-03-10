import * as React from "react"
import Link from "next/link"
import path from "path"

function Entry({ children }: { children: React.ReactNode }) {
  return <div className="p-3 text-xs border-b-[1px] hover:bg-gray-300 cursor-pointer"> {children}</div>
}

function FileEntry({ name, fullPath }: { fullPath: string; name: string }) {
  // TODO: click to show file info
  return <Entry>{name}</Entry>
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

export function EntriesViewClient({ userPath, dirs, files }: { userPath: string; dirs: string[]; files: string[] }) {
  return (
    <div>
      {dirs.map((name) => (
        <DirEntry key={`dir-${name}`} fullPath={path.resolve(userPath, name)} name={name} />
      ))}
      {files.map((name) => (
        <FileEntry key={name} fullPath={path.resolve(userPath, name)} name={name} />
      ))}
    </div>
  )
}
