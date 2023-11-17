'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from "react"

import { History, Histories, Order } from '@/type'
import { availableOder, getResult } from '@/order'
import { HOMEDIR } from './contents'

const dirName = (path: string) => path.split("/").slice(-1)[0]

export default function Home() {
  const [histories, setHistory] = useState<Histories>([])
  const [currentDir, setCurrentDir] = useState(HOMEDIR)
  const [inprogress, setInprogress] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm<Order>()

  const onSubmit: SubmitHandler<Order> = async (data: any) => {
    setInprogress(true)
    const result = getResult(data.order, setCurrentDir)

    setHistory(
      [...histories,
      {
        dir: currentDir,
        command: data.order,
        result: result
      }]
    )
    reset()
    setInprogress(false)
  }
  return (
    <div className=" h-screen ">
      {histories.map((h, i) => {
        return <div key={i}><Line history={h} /></div>
      })}
      {!inprogress &&
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex">
            <Dicrectory dir={currentDir} /><div><input type='text' maxLength={30} size={30} className={"border-0  focus:outline-dotted"} autoComplete="off" {...register("order")} /></div>
          </div>
        </form>
      }
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
