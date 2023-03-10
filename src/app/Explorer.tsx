import * as React from "react"
import { DirEntry } from "./Entry"
import { Entries } from "./Entries"

export default function Explorer({ userPath }: { userPath: string }) {
  return (
    <div className="border-solid border-gray-300 min-w-full">
      {userPath !== "/" && <DirEntry userPath={userPath} name=".." />}
      <React.Suspense fallback="reading dir...">
        {/* @ts-expect-error */}
        <Entries userPath={userPath} />
      </React.Suspense>
    </div>
  )
}
