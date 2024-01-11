import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from './sorting-page.module.css'
import { Column } from "../ui/column/column";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";

import { DELAY_IN_MS, delay } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

type TLetter = {
  value: number;
  state: ElementStates;
}

export const SortingPage: React.FC = () => {
  const [arrNumbers, setArrNumbers] = useState<TLetter[]>([])
  const [bubble, setBubble] = useState(false)
  const [choice, setChoice] = useState(true)
  const [isLoadingUp, setIsLoadingUp] = useState(false)
  const [isLoadingDown, setIsLoadingDown] = useState(false)

  const swap = (arr: TLetter[], firstIndex: number, secondIndex: number) => {
    // const newArr = [...arr]; // создаем новый массив, чтобы избежать мутации исходного массива
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  const onchangeChoice = () => {
    setChoice(true)
    setBubble(false)
  }

  const onchangeBubble = () => {
    setChoice(false)
    setBubble(true)
  }

const ascending = () => {
  setIsLoadingUp(true)
  if (choice) sortQuickApp(arrNumbers)
  else sortBubbleApp(arrNumbers)
  
} 

const descending = () => {
  setIsLoadingDown(true)
  if (bubble) sortBubbleDown(arrNumbers)
  else sortQuickDown(arrNumbers)
}

const createNewArray = () => {
  const numbers: TLetter[] = []
  const lengthArr = Math.floor(Math.random() * 14) + 3;

  for(let i = 0; i < lengthArr; i++) {
    numbers[i] = {
      value: Math.floor(Math.random() * 100) + 1,
      state: ElementStates.Default,
    };
  }
  setArrNumbers(numbers)
}

useEffect(() => {
  createNewArray()
}, [])

const sortQuickApp = async (arr: TLetter[]): Promise<void> => {
  for(let i = 0; i < arr.length; i++) {
    let minIndex = i
    for(let j = i + 1; j < arr.length; j++) {
      arr.forEach(async (element) => {
        if(element.state === ElementStates.Changing){
          element.state = ElementStates.Default;
          setArrNumbers([...arr]);
          await delay(1000)
        }
      });
      arr[i].state = ElementStates.Changing
      arr[j].state = ElementStates.Changing
      setArrNumbers([...arr])
      await delay(DELAY_IN_MS)
      if(arr[minIndex].value > arr[j].value) {    
        minIndex = j
      } 
    }
    swap(arr, i, minIndex);
        setArrNumbers([...arr])
        await delay(1000)
    arr[i].state = ElementStates.Modified
  } 
  setArrNumbers([...arr])
  setIsLoadingUp(false)
}

const sortQuickDown = async (arr: TLetter[]): Promise<void> => {
  for(let i = 0; i < arr.length; i++) {
    let minIndex = i
    for(let j = i + 1; j < arr.length; j++) {
      arr.forEach(async (element) => {
        if(element.state === ElementStates.Changing){
          element.state = ElementStates.Default;
          setArrNumbers([...arr]);
          await delay(1000)
        }
      });
      arr[i].state = ElementStates.Changing
      arr[j].state = ElementStates.Changing
      setArrNumbers([...arr])
      await delay(DELAY_IN_MS)
      if(arr[minIndex].value < arr[j].value) {    
        minIndex = j
      } 
    }

    swap(arr, i, minIndex);
        setArrNumbers([...arr])
        await delay(1000)
    arr[i].state = ElementStates.Modified
  } 
  setArrNumbers([...arr])
  setIsLoadingDown(false)
}
const sortBubbleApp = async (arr: TLetter[]): Promise<void> => {
  for (let i = 0; i < arr.length; i++) {

    for (let j = 0; j < arr.length - i - 1; j++) {
      arr.forEach(async (element) => {
        if(element.state === ElementStates.Changing){
          element.state = ElementStates.Default;
          setArrNumbers([...arr]);
          await delay(1000)
        }
      });


      arr[j].state = ElementStates.Changing
      arr[j + 1].state = ElementStates.Changing
      setArrNumbers([...arr]);
      await delay(1000)
      
      
      if (arr[j].value > arr[j + 1].value) {
        swap(arr, j, j + 1); 
        setArrNumbers([...arr]);
        await delay(1000)
      } 

      
    }
    arr[arr.length - i - 1].state = ElementStates.Modified;
    setArrNumbers([...arr]);
    
  }
  arr.forEach((element) => {
    if(element.state !== ElementStates.Modified){
      element.state = ElementStates.Modified;
      setArrNumbers([...arr]);
    }
  });
  setIsLoadingUp(false)
};


const sortBubbleDown = async (arr: TLetter[]): Promise<void> => {
  for (let i = 0; i < arr.length; i++) {

    for (let j = 0; j < arr.length - i - 1; j++) {
      arr.forEach(async (element) => {
        if(element.state === ElementStates.Changing){
          element.state = ElementStates.Default;
          setArrNumbers([...arr]);
          await delay(1000)
        }
      });


      arr[j].state = ElementStates.Changing
      arr[j + 1].state = ElementStates.Changing
      setArrNumbers([...arr]);
      await delay(1000)
      
      
      if (arr[j].value < arr[j + 1].value) {
        swap(arr, j, j + 1); 
        setArrNumbers([...arr]);
        await delay(1000)
      } 

      
    }
    arr[arr.length - i - 1].state = ElementStates.Modified;
    setArrNumbers([...arr]);
    
  }
  arr.forEach((element) => {
    if(element.state !== ElementStates.Modified){
      element.state = ElementStates.Modified;
      setArrNumbers([...arr]);
    }
  });
  setIsLoadingDown(false)
};

// arr[j].state = ElementStates.Default
// setArrNumbers([...arr])
// await delay(DELAY_IN_MS)

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
          <Button sorting={Direction.Ascending} data-testid='button' text="По возрастанию" onClick={ascending} type="submit" isLoader={isLoadingUp} disabled={isLoadingDown || isLoadingUp}/>
          <Button sorting={Direction.Descending} text="По убыванию" onClick={descending} isLoader={isLoadingDown} disabled={isLoadingDown || isLoadingUp}/>
        </div>
        <Button text="Новый массив" extraClass={style.button} onClick={createNewArray} disabled={isLoadingDown || isLoadingUp} />
      </form>
      <div className={style.container} data-testid='arrElm' >
        {arrNumbers.map((elm, index) => {
          return (
            <Column index={elm.value} extraClass={style.column} key={index} state={elm.state} />
          )
        })} 
      </div>
    </SolutionLayout>
  );
};
