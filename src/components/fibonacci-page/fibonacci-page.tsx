import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import style from './fibonacci-page.module.css'
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS, delay } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [arrFibo, setArrFibo] = useState<number[]>([]);
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const num = parseInt(value);
    getFibonacci(num);
    setValue('')
  }

  const getFibonacci = async (num: number) => {
    setIsLoading(true)
    const arrResult: number[] = [1];
    setArrFibo([...arrResult]);
    await delay(SHORT_DELAY_IN_MS)
    let a = 0;
    let b = 1;

    for (let i = 0; i <= num - 1; i++) {
      let c = a + b;
      a = b;
      b = c;
      arrResult.push(c);
      setArrFibo([...arrResult]);
      await delay(SHORT_DELAY_IN_MS)
    }

    setArrFibo([...arrResult]);
    setIsLoading(false)
  }


  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={style.form} onSubmit={onClick}>
        <Input data-cy='input' extraClass={style.input} placeholder="Введите текст" max={19} isLimitText={true} type="number" value={value} onChange={onChange}/>
        <Button data-cy='button' text="Рассчитать" type='submit' disabled={value && parseInt(value) < 20 && parseInt(value) > -1 ? false : true}  isLoader={isLoading} />
      </form>
      <div className={style.container}>
        {arrFibo.map((elm, index) => (
          <React.Fragment key={index}>
            <Circle index={index} letter={String(elm)} extraClass={style.circle} data-cy='circle'/>
          </React.Fragment>
        ))}
      </div>
    </SolutionLayout>
  );
};
