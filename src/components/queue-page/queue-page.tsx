import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./queue-page.module.css";
import Queue from "./queue-page-class";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SHORT_DELAY_IN_MS, delay } from "../../constants/delays";
import { Circle } from "../ui/circle/circle";

export const QueuePage: React.FC = () => {
  const [arrResult, setArrResult] = useState<string[]>([])
  const [value, setValue] = useState('')
  const [queue, setQueue] = useState<Queue>(new Queue());
   
  useEffect(() => {
    setArrResult([...queue.getArray()])
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const deletArray = async () => {
    queue.clear()
    await delay(SHORT_DELAY_IN_MS)
    setArrResult([...queue.getArray()])
  }

  const addValue = async () => {
    queue.enqueue(value)
    setValue('')
    await delay(SHORT_DELAY_IN_MS)
    setArrResult([...queue.getArray()])
  }

  const deleteValue = async () => {
    queue.dequeue()
    await delay(SHORT_DELAY_IN_MS)
    setArrResult([...queue.getArray()])
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={style.form}>
        <Input type="text" maxLength={4} placeholder="Введите текст" extraClass={style.input} onChange={onChange} isLimitText={true} value={value} />
        <Button text="Добавить" type="button" onClick={addValue} disabled={value && queue.tail < 7 ? false : true} />
        <Button text="Удалить" type="button" onClick={deleteValue}  disabled={arrResult.length !== 0 ? false : true} />
        <Button text="Очистить" type="button" onClick={deletArray} disabled={arrResult.length !== 0 ? false : true} extraClass={style.clear} />
      </div>
      <div className={style.container}>
        {arrResult.map((elm, index) => {
          return (
            <Circle index={index} head={index === queue.head && queue.getArray()[queue.head] ? 'head' : null} tail={index === queue.tail - 1 ? 'tail' : null} letter={elm} key={index}/>
          )
        })}
      </div>
    </SolutionLayout>
  );
};
