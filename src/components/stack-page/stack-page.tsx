import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from './stack-page.module.css'
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Stack } from "./stack-page-class";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS, delay } from "../../constants/delays";

export const StackPage: React.FC = () => {
  const [value, setValue] = useState('')
  const [arrResult, setArrResult] = useState<string[]>([])
  const [stack, setStack] = useState<Stack<string>>(new Stack());

  useEffect(() => {
    console.log(arrResult.length)
    return () => {
      stack.clear()
      setArrResult([])
    }
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const deletArray = async () => {
    stack.clear()
    await delay(SHORT_DELAY_IN_MS)
    setArrResult([...stack.getArray()])
  }

  const addValue = async () => {
    stack.push(value)
    await delay(SHORT_DELAY_IN_MS)
    setArrResult([...stack.getArray()])
    setValue('')
  }

  const deleteValue = async () => {
    stack.pop()
    await delay(SHORT_DELAY_IN_MS)
    setArrResult([...stack.getArray()])
  }
  
  return (
    <SolutionLayout title="Стек">
      <div className={style.form}>
        <Input type="text" maxLength={4} placeholder="Введите текст" extraClass={style.input} onChange={onChange} isLimitText={true} value={value} />
        <Button text="Добавить" type="button" onClick={addValue} disabled={!value ? true : false} />
        <Button text="Удалить" type="button" onClick={deleteValue} disabled={arrResult.length !== 0 ? false : true} />
        <Button text="Очистить" type="button" onClick={deletArray} disabled={arrResult.length !== 0 ? false : true} extraClass={style.clear} />
      </div>
      <div className={style.container}>
        {arrResult.map((elm, index) => {
          return (
            <Circle letter={String(elm)} key={index} index={index} head={index === stack.getSize() - 1 ? 'top' : null}/>
          )
        })}
      </div>
    </SolutionLayout>
  );
};
