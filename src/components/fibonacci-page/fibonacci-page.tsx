import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import style from './fibonacci-page.module.css'
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const [arrFibo, setArrFibo] = useState<number[]>([]);
  const [value, setValue] = useState('');
  const [displayedElements, setDisplayedElements] = useState<number[]>([]);

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const num = parseInt(value);
    getFibonacci(num);
  }

  const getFibonacci = (num: number) => {
    const arrResult: number[] = [1];
    let a = 0;
    let b = 1;

    for (let i = 0; i <= num - 1; i++) {
      let c = a + b;
      a = b;
      b = c;
      arrResult.push(c);
    }

    setArrFibo(arrResult);
  }

  useEffect(() => {
    let currentIndex = 0;

    const timer = setInterval(() => {
      if (currentIndex <= arrFibo.length) {
        const itemsToShow = arrFibo.slice(0, currentIndex + 1);
        setDisplayedElements(itemsToShow);
        currentIndex += 1;
      } else {
        clearInterval(timer);
      }
    }, 500);

    return () => clearInterval(timer);
  }, [arrFibo]);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={style.form} onSubmit={onClick}>
        <Input extraClass={style.input} placeholder="Введите текст" max={19} isLimitText={true} type="number" value={value} onChange={handleClick}/>
        <Button text="Рассчитать" type='submit'/>
      </form>
      <div className={style.container}>
        {displayedElements.map((elm, index) => (
          <React.Fragment key={index}>
            <Circle index={index} letter={String(elm)} extraClass={style.circle} />
          </React.Fragment>
        ))}
      </div>
    </SolutionLayout>
  );
};
