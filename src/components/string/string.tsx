import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from './string.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from '../ui/circle/circle'

type TColor = '#D252E1' | '#7FE051'

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState('')
  const [arrString, setArrString] = useState<string[]>([])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    getString(value)
  }

  const getString = (str: string) => {
    const arr = str.split('') // ЗАМЕНИТЬ
    setArrString(arr)
  }

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
