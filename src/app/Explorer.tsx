import fs from "fs/promises"
import path from "path"

export default async function Explorer() {
  const result = await fs.readdir(path.resolve("."))
  return (
    <div className="border-solid border-gray-300 border-[1px]">
      {result.map((fileDirName) => (
        <FileOrDir key={fileDirName}>{fileDirName}</FileOrDir>
      ))}
    </div>
  )
}

function FileOrDir({ children }) {
  return <div className="p-4 border-b-[1px] hover:bg-gray-300 cursor-pointer">{children}</div>
}
