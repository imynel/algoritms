import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from './sorting-page.module.css'
import { Column } from "../ui/column/column";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";

import { Direction } from "../../types/direction";
import { swap } from "../../constants/swap";
import { DELAY_IN_MS, delay } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [arrNumbers, setArrNumbers] = useState<number[]>([])
  const [bubble, setBubble] = useState(false)
  const [choice, setChoice] = useState(true)

  const onchangeChoice = () => {
    setChoice(true)
    setBubble(false)
  }

  const onchangeBubble = () => {
    setChoice(false)
    setBubble(true)
  }

const ascending = () => {
  if (choice) sortQuickApp(arrNumbers)
  else sortBubbleApp(arrNumbers)
  
} 

const descending = () => {
  if (bubble) sortBubbleDown(arrNumbers)
  else sortQuickDown(arrNumbers)
}

const createNewArray = () => {
  const numbers: number[] = []
  const lengthArr = Math.floor(Math.random() * 14) + 3;

  for(let i = 0; i < lengthArr; i++) {
    numbers[i] = Math.floor(Math.random() * 100) + 1;
  }
  setArrNumbers(numbers)
}

useEffect(() => {
  createNewArray()
}, [])

const sortQuickApp = async (arr: number[]): Promise<void> => {
  
  for(let i = 0; i < arr.length; i++) {
    let minIndex = i
    for(let j = i + 1; j < arr.length; j++) {
      if(arr[i] > arr[j]) {
        minIndex = j
        swap(arr, i, minIndex)
      } 
    }
    await delay(DELAY_IN_MS)
    setArrNumbers([...arr])
  } 
}

const sortQuickDown = async (arr: number[]): Promise<void> => {
  
  for(let i = 0; i < arr.length; i++) {
    let maxIndex = i
    for(let j = i + 1; j < arr.length; j++) {
      if(arr[i] < arr[j]) {
        maxIndex = j
        swap(arr, i, maxIndex)
      } 
    }
    await delay(DELAY_IN_MS)
    setArrNumbers([...arr])
  } 
}

const sortBubbleApp = async (arr: number[]): Promise<void> => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1); 
        await delay(DELAY_IN_MS)
        setArrNumbers([...arr]);
      }
    }
    
  }
}

const sortBubbleDown = async (arr: number[]): Promise<void> => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] < arr[j + 1]) {
        swap(arr, j, j + 1); 
        await delay(DELAY_IN_MS)
        setArrNumbers([...arr]);
      }
    }
    
  }

};

const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
}



  return (
    <SolutionLayout title="Сортировка массива">
      <form className={style.form} onSubmit={onSubmit}>
        <div className={style.radio}>
          <RadioInput label="Выбор"  name="choice" checked={choice} onChange={onchangeChoice}/>
          <RadioInput label="Пузырёк" name="choice" checked={bubble} onChange={onchangeBubble} />
        </div>
        <div className={style.buttons}>
          <Button sorting={Direction.Ascending} text="По возрастанию" onClick={ascending} type="submit"/>
          <Button sorting={Direction.Descending} text="По убыванию" onClick={descending} />
        </div>
        <Button text="Новый массив" extraClass={style.button} onClick={createNewArray} />
      </form>
      <div className={style.container} >
        {arrNumbers.map((num, index) => {
          return (
            <Column index={num} extraClass={style.column} key={index}/>
          )
        })} 
      </div>
    </SolutionLayout>
  );
};
