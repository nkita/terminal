'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from "react"

import { History, Histories, Order } from '@/type'
import { guest } from '@/class/user'

export default function Home() {
  const [histories, setHistory] = useState<Histories>([])
  const [inprogress, setInprogress] = useState(false)
  const [currentDir, setCurrentDir] = useState(guest.currentDir)

  // # Todo Delete this array. 
  const availableOder = [
    "cat",
    "ls",
    "cd",
    "pwd",
  ]

  const {
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm<Order>()

  const onSubmit: SubmitHandler<Order> = async (data: any) => {
    setInprogress(true)

    const commands = data.order.replace(/ +/g, " ").split(" ").filter((c: string) => c !== "");
    const command_name = commands[0]
    let result
    if (command_name && !availableOder.includes(command_name)) {
      result = `-bash: ${data.order}: command not found`
    } else {
      // cd command 
      if (command_name === "cd") {
        result = guest.cd(commands)
      } else if (command_name === "pwd") {
        result = guest.pwd()
      }
    }

    setHistory(
      [...histories,
      {
        dir: currentDir,
        command: data.order,
        result: result
      }]
    )
    setCurrentDir(guest.currentDir)
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
            <Dicrectory dir={currentDir} /><div><input type='text' maxLength={30} size={30} spellCheck={false} className={"border-0  focus:outline-dotted"} autoComplete="off" {...register("order")} /></div>
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


const Dicrectory = ({ dir }: { dir: string[] }) => {
  const label = dir.toString() === "" ? "/" : dir.toString() === guest.home.toString() ? "~" : dir[dir.length - 1]
  return <span className="text-left px-1">{`[nkita@dev.site ${label} ]$`}</span>
}
