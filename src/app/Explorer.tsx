import fs from "fs/promises"
import path from "path"
import React from "react"
import { partition } from "lodash-es"
import Link from "next/link"

const getDirEnts = async (userPath: string) =>
  fs.readdir(path.resolve(userPath), { withFileTypes: true }).then((dirEnts) => {
    return partition(
      dirEnts.filter((ent) => ent.isDirectory() || ent.isFile()).sort((entA, entB) => (entA.name > entB.name ? 1 : -1)),
      (e) => e.isDirectory()
    )
  })

export default async function Explorer({ userPath }: { userPath: string }) {
  let dirs, files
  try {
    ;[dirs, files] = await getDirEnts(userPath)
  } catch (e) {
    return <div>There was some error</div>
  }

  return (
    <div className="border-solid border-gray-300 min-w-full">
      {userPath !== "/" && <Dir userPath={userPath} dirPath=".." />}
      {dirs.map((ent) => (
        <Dir key={`dir-${ent.name}`} userPath={userPath} dirPath={ent.name} />
      ))}
      {files.map((ent) => (
        <File key={ent.name} name={ent.name} />
      ))}
    </div>
  )
}

function Entry({ children }: { children: React.ReactNode }) {
  return <div className="p-3 text-xs border-b-[1px] hover:bg-gray-300 cursor-pointer"> {children}</div>
}

function File({ name }: { name: string }) {
  // TODO: click to show file info
  return <Entry>{name}</Entry>
}

function Dir({ userPath, dirPath }: { userPath: string; dirPath: string }) {
  return (
    <Link href={`/?path=${path.resolve(userPath, dirPath)}`} prefetch={false}>
      <Entry>
        {`> `} {dirPath}
      </Entry>
    </Link>
  )
}
