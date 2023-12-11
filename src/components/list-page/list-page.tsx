import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from './list-page.module.css'
import List from "./list-page-class";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";

export const ListPage: React.FC = () => {
  const [arrResult, setResult] = useState<string[]>(['1', '2', '3']) 
  const [value, setValue] = useState('')
  const [index, setIndex] = useState('')

  const onchangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onchangeindex = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndex(e.target.value)
  }
  
  const addHead = () => {

  }

  const deleteHead = () => {
    
  }

  const addTial = () => {
    
  }

  const deleteTail = () => {

  }
  


  useEffect(() => {
    
  }, [])

  return (
    <SolutionLayout title="Связный список">
      <div className={style.form1}>
        <Input extraClass={style.input} maxLength={4} placeholder="Введите Значение" value={value} onChange={onchangeValue} isLimitText={true} />
        <Button text="Добавить в head" extraClass={style.buttonForm1}/>
        <Button text="Добавить в head" extraClass={style.buttonForm1}/>
        <Button text="Удалить из tail" extraClass={style.buttonForm1}/>
        <Button text="Удалить из tail" extraClass={style.buttonForm1}/>
      </div>
      <div className={style.form2}>
        <Input extraClass={style.input} placeholder="Введите индекс" value={index} onChange={onchangeindex} />
        <Button text="Удалить по индексу" extraClass={style.buttonForm2}/>
        <Button text="Удалить по индексу" extraClass={style.buttonForm2}/>
      </div>
      <div className={style.container}>
        {arrResult.map((elm, index) => {
          return (
            <React.Fragment key={index}>
              <Circle letter={elm} index={index} head={'head'} tail={'tail'} />
              {index !== arrResult.length - 1 
              ?  
              (
                <div className={style.arrow}><ArrowIcon /></div>
              ) 
              : null}
              
            </React.Fragment>
          )
        })}
      </div>
    </SolutionLayout>
  );
};
