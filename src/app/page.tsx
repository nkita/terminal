'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from "react"

type History = { dir: string; command: string | null; result: string | null | undefined }
type Histories = History[]
type Order = { order: string }

const dirName = (path: string) => path.split("/").slice(-1)[0]

const HOMEDIR = "/home/nkita"
const availableOder = [
  "cat",
  "ls",
]


export default function Home() {
  const [histories, setHistory] = useState<Histories>([{ dir: "/home/nkita", command: "cat", result: null }])
  const [currentDir, setCurrentDir] = useState(HOMEDIR)

  const {
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm<Order>()

  const onSubmit: SubmitHandler<Order> = (data: any) => {
    let result
    if (data.order) {
      result = availableOder.includes(data.order) ? null : `-bash: ${data.order}: command not found`
    }
    setHistory(
      [...histories,
      {
        dir: currentDir,
        command: data.order,
        result: result
      }]
    )
    reset()
  }
  return (
    <div className=" h-screen ">
      {histories.map((h, i) => {
        return <div key={i}><Line history={h} /></div>
      })}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <Dicrectory dir={currentDir} /><div><input type='text' maxLength={30} size={30} className={"border-0  focus:outline-dotted"} autoComplete="off" {...register("order")} /></div>
        </div>
      </form>
    </div>
  )
}

const Line = ({ history }: { history: History }) => {
  return (
    <div>
      <div className="flex">
        <Dicrectory dir={history.dir} />{history.command}
      </div>
      <div>
        {history.result}
      </div>
    </div >
  )
}


const Dicrectory = ({ dir }: { dir: string }) => {
  const label = dir === HOMEDIR ? "~" : dirName(dir)
  return <span className="text-left px-1">{`[nkita@dev.site ${label} ]$`}</span>
}