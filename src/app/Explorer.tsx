import fs from "fs/promises"
import path from "path"
import React from "react"
import { partition } from "lodash-es"

export default async function Explorer() {
  try {
    const result = await fs.readdir(path.resolve("."), { withFileTypes: true })
    const [dirs, files] = partition(
      result
        .filter((dirEnt) => dirEnt.isDirectory() || dirEnt.isFile())
        .sort((dirEntA, dirEntB) => (dirEntA.name > dirEntB.name ? 1 : -1)),
      (e) => e.isDirectory()
    )

    return (
      <div className="border-solid border-gray-300 border-[1px]">
        {dirs.map((ent) => (
          <Dir key={`dir-${ent.name}`}>{ent.name}</Dir>
        ))}
        {files.map((ent) => (
          <File key={ent.name}>{ent.name}</File>
        ))}
      </div>
    )
  } catch (e) {
    return <div>There was some error</div>
  }
}

function File({ children }: { children: React.ReactNode }) {
  // TODO: click to show file info
  return <div className="p-4 border-b-[1px] hover:bg-gray-300 cursor-pointer"> {children}</div>
}

function Dir({ children }: { children: React.ReactNode }) {
  // TODO: click to modify path
  return (
    <div className="p-4 border-b-[1px] hover:bg-gray-300 cursor-pointer">
      {`> `} {children}
    </div>
  )
}
