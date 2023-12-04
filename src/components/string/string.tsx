import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from './string.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from '../ui/circle/circle'

type TColor = '#D252E1' | '#7FE051'

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState('')
  const [arrString, setArrString] = useState<string[]>([])

  useEffect(() => {
    
  }, [arrString])
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setArrString(await sortArr(value.split('')))
  }
    
  }

  const sortArr = async (arr: string[], start = 0, end = arr.length - 1) => {
    console.log(arr, start, end)
    for(let i = 0; i < arr.length; i++) {
      if (start > end) continue
      swap(arr, start, end)
      start++
      end--
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(arr, start, end)
    }

    return arr
  }

  const swap = (arr: string[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  // const color: TColor = true ?  '#D252E1' : '#7FE051'

  return (
    <SolutionLayout title="Строка">
      <form className={style.form} onSubmit={onSubmit}>
        <Input extraClass={style.input} placeholder="Введите текст" maxLength={11} isLimitText={true} type="text" value={value} onChange={onChange}/>
        <Button text="Развернуть" type='submit'/>
      </form>

      <div className={style.container}>
        {arrString.map((elm, index) => {
          return (
            <React.Fragment key={index}>
              <Circle letter={elm} />
            </React.Fragment>
          )
        })}
      </div>
    </SolutionLayout>
  );
};
