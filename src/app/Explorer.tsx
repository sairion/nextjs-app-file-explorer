import * as React from "react"
import { Entries } from "./Entries"

export default function Explorer({ userPath }: { userPath: string }) {
  return (
    <div className="border-solid border-gray-300 min-w-full">
      <React.Suspense fallback="reading dir...">
        {/* @ts-expect-error */}
        <Entries userPath={userPath} />
      </React.Suspense>
    </div>
  )
}
