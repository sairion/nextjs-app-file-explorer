import * as React from "react"
import Explorer from "@/app/Explorer"
import styles from "./page.module.css"

export const dynamic = "force-dynamic"

export default function Home({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) {
  return (
    <main className={styles.main}>
      RSC File explorer
      <Explorer userPath={searchParams?.path ?? "."} />
    </main>
  )
}
