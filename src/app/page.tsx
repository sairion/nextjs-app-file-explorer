import * as React from "react"
import Explorer from "@/app/Explorer"
import styles from "./page.module.css"

export const dynamic = "force-dynamic"

export default function Home() {
  return (
    <main className={styles.main}>
      RSC File explorer
      <React.Suspense>
        {/*@ts-expect-error*/}
        <Explorer />
      </React.Suspense>
    </main>
  )
}
