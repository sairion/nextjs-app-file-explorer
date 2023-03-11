import fs from "fs/promises"
import fs2 from "fs"
import path from "path"
import * as React from "react"
import { partition } from "lodash-es"
import { EntriesViewClient } from "./Entry"
import { isNodeError } from "@/utils/error"

const getDirEnts = async (userPath: string) =>
  fs.readdir(path.resolve(userPath), { withFileTypes: true }).then((dirEnts) => {
    return partition(
      dirEnts.filter((ent) => ent.isDirectory() || ent.isFile()).sort((entA, entB) => (entA.name > entB.name ? 1 : -1)),
      (e) => e.isDirectory()
    )
  })

export async function Entries({ userPath }: { userPath: string }) {
  try {
    const [dirs, files] = await getDirEnts(userPath)
    return (
      <EntriesViewClient
        upperPath={path.resolve(userPath, "..")}
        userPath={userPath}
        dirs={dirs.map((ent) => [path.resolve(userPath, ent.name), ent.name])}
        files={files.map((ent) => [path.resolve(userPath, ent.name), ent.name])}
      />
    )
  } catch (e) {
    if (isNodeError(e)) {
      return (
        <div>
          Error {e.code}
          <br />
          path: {e.path}
        </div>
      )
    }
    throw e
  }
}
