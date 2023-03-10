import * as React from "react"
import Link from "next/link"
import path from "path"
import { Entry } from "./Entry.client"

function FileEntry({ name, fullPath }: { fullPath: string; name: string }) {
  // TODO: click to show file info
  return <Entry selectable>{name}</Entry>
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
      {userPath !== "/" && <DirEntry fullPath={path.resolve(userPath, "..")} name=".." />}
      {dirs.map((name) => (
        <DirEntry key={`dir-${name}`} fullPath={path.resolve(userPath, name)} name={name} />
      ))}
      {files.map((name) => (
        <FileEntry key={name} fullPath={path.resolve(userPath, name)} name={name} />
      ))}
    </div>
  )
}
