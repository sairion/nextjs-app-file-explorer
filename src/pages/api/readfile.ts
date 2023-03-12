import path from "path"
import fs from "fs/promises"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query?.path) {
    try {
      const fileContents = await fs.readFile(path.resolve(req.query?.path as string), "utf8")
      res.status(200).send(fileContents)
    } catch (e) {
      res.status(404).send("Not found")
    }
  } else {
    res.status(400).send("Bad request")
  }
}
