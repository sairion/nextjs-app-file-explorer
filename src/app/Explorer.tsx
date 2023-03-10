import fs from "fs/promises"
import path from "path"
import React from "react"
import { partition } from "lodash-es"

const getDirEnts = async (userPath = ".") =>
  fs.readdir(path.resolve(userPath), { withFileTypes: true }).then((dirEnts) => {
    return partition(
      dirEnts.filter((ent) => ent.isDirectory() || ent.isFile()).sort((entA, entB) => (entA.name > entB.name ? 1 : -1)),
      (e) => e.isDirectory()
    )
  })

export default async function Explorer() {
  try {
    const [dirs, files] = await getDirEnts()
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
