import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from './stack-page.module.css'
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Stack } from "./stack-page-class";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS, delay } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

type TLetter = {
  value: string;
  state: ElementStates;
}


export const StackPage: React.FC = () => {
  const [value, setValue] = useState('')
  const [arrResult, setArrResult] = useState<TLetter[]>([])
  const [stack] = useState<Stack<TLetter>>(new Stack());
  const [isLoadingAdd, setIsLoadingAdd] = useState(false)
  const [isLoadingDel, setIsLoadingDel] = useState(false)
  useEffect(() => {
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
    setArrResult([...stack.getArray()])
  }

  const addValue = async () => {
    setIsLoadingAdd(true)
    stack.push({value: value, state: ElementStates.Changing})
    
    setArrResult([...stack.getArray()])
    await delay(SHORT_DELAY_IN_MS)
    setValue('')

    stack.getArray()[stack.getSize() - 1].state = ElementStates.Default;
    setArrResult([...stack.getArray()]);
    await delay(SHORT_DELAY_IN_MS)
    setIsLoadingAdd(false)
    
  }

  const deleteValue = async () => {
    setIsLoadingDel(true)
    stack.getArray()[stack.getSize() - 1].state = ElementStates.Changing;
    setArrResult([...stack.getArray()])
    stack.pop()
    await delay(SHORT_DELAY_IN_MS)
    setArrResult([...stack.getArray()])
    setIsLoadingDel(false)
  }
  
  return (
    <SolutionLayout title="Стек">
      <div className={style.form}>
        <Input type="text" maxLength={4} placeholder="Введите текст" extraClass={style.input} onChange={onChange} isLimitText={true} value={value} />
        <Button text="Добавить" type="button" onClick={addValue} disabled={!value ? true : false} isLoader={isLoadingAdd} />
        <Button text="Удалить" type="button" onClick={deleteValue} disabled={arrResult.length !== 0 ? false : true} isLoader={isLoadingDel}/>
        <Button text="Очистить" type="button" onClick={deletArray} disabled={arrResult.length !== 0 ? false : true} extraClass={style.clear} />
      </div>
      <div className={style.container}>
        {arrResult.map((elm, index) => {
          return (
            <Circle letter={elm.value} key={index} index={index} head={index === stack.getSize() - 1 ? 'top' : null} state={elm.state} />
          )
        })}
      </div>
    </SolutionLayout>
  );
};
