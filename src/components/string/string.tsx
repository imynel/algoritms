import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from './string.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from '../ui/circle/circle'
import { DELAY_IN_MS, delay } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

type TLetter = {
  value: string;
  state: ElementStates;
}

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState('')
  const [arrString, setArrString] = useState<TLetter[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const swap = (arr: TLetter[], firstIndex: number, secondIndex: number): TLetter[] => {
    const newArr = [...arr]; // создаем новый массив, чтобы избежать мутации исходного массива
    const temp = newArr[firstIndex];
    newArr[firstIndex] = newArr[secondIndex];
    newArr[secondIndex] = temp;
    return newArr;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const letters = value.replace(/\s/g, '').split('').map((value) => ({
      value: value,
      state: ElementStates.Default
    }))
    sortArr(letters)
    setValue('')
  }
    

  const sortArr = async (arr: TLetter[], start = 0, end = arr.length - 1): Promise<void> => {
    setIsLoading(true)

    for(let i = 0; i < arr.length; i++) {
      setArrString([...arr])
      await delay(DELAY_IN_MS);
      if (start > end) continue
      arr[start].state = ElementStates.Changing
      arr[end].state = ElementStates.Changing
      setArrString([...arr])
      await delay(DELAY_IN_MS);
      arr = swap(arr, start, end)
      arr[start].state = ElementStates.Modified
      arr[end].state = ElementStates.Modified
      await delay(DELAY_IN_MS);
      start++
      end--
    }

    setArrString([...arr])
    setIsLoading(false)
  }

  // const color: TColor = true ?  '#D252E1' : '#7FE051'

  return (
    <SolutionLayout title="Строка">
      <form className={style.form} onSubmit={onSubmit}>
        <Input data-testid='input' extraClass={style.input} placeholder="Введите текст" maxLength={11} isLimitText={true} type="text" value={value} onChange={onChange} />
        <Button data-testid="button" text="Развернуть" type='submit' disabled={!value ? true : false} isLoader={isLoading} />
      </form>

      <div className={style.container} data-testid="arrString-container">
        {arrString.map((elm, index) => {
          return (
            <div key={index} data-testid='arrValue' >
              <Circle letter={elm.value} state={elm.state}/>
            </div>
          )
        })}
      </div>
    </SolutionLayout>
  );
};
