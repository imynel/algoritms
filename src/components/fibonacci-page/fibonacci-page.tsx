import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import style from './fibonacci-page.module.css'

export const FibonacciPage: React.FC = () => {
  const getfibonacci = (index: number): number => {
    if (index === 0) return 0
    if(index === 1) return 1

    return getfibonacci(index - 1) + getfibonacci(index - 2)
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={style.container}>
        <Input extraClass={style.input} placeholder="Введите текст" max={19} isLimitText={true} type="number" />
        <Button text="Рассчитать"/>
      </div>
      {}
    </SolutionLayout>
  );
};
