import * as React from "react"
import Explorer from "@/app/Explorer"
import styles from "./page.module.css"

export const dynamic = "force-dynamic"

export default function Home({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  return (
    <main className={styles.main}>
      RSC File explorer
      <React.Suspense fallback="reading dir...">
        {/*@ts-ignore*/}
        <Explorer userPath={searchParams?.path ?? "."} />
      </React.Suspense>
    </main>
  )
}
