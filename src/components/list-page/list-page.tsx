import React, { useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { useState } from "react";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { ElementStates } from "../../types/element-states";
import styles from './list-page.module.css';
import { LinkedList } from "./list-page-class";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { useInput } from "../../hooks/use-input";

type TLinkedListElement = {
  value: string;
  head: string | React.ReactElement | null;
  tail: string | React.ReactElement | null;
  state: ElementStates;
}

export const ListPage: React.FC = () => {

  const [linkedList] = useState<LinkedList<TLinkedListElement>>(new LinkedList<TLinkedListElement>())
  const [listElements, setListElements] = useState<TLinkedListElement[]>([]); 

  const { values, handleChange, setValues } = useInput({
    valueInput: '',
    indexInput: ''
  });
  
  const [buttonsState, setButtonsState] = useState<{[buttonName: string]: {isLoader?: boolean, disabled: boolean}}>
  (
    {
      addTail: {isLoader: false, disabled: false},
      addHead: {isLoader: false, disabled: false},
      deleteTail: {isLoader: false, disabled: false},
      deleteHead: {isLoader: false, disabled: false},
      deleteAt: {isLoader: false, disabled: false},
      addAt: {isLoader: false, disabled: false},
      valueInput: {disabled: false},
      indexInput : {disabled: false}
      
    }
  )

  const [shouldUpdate, setShouldUpdate] = useState<boolean>(false)

  const setButtonsLoadingState = (buttons: any) => {
    setButtonsState({
      ...buttonsState,
      ...buttons,
    });
  };

  const enableAllButtons = () => {
    setButtonsState({
      addTail: { isLoader: false, disabled: false },
      addHead: { isLoader: false, disabled: false },
      deleteTail: { isLoader: false, disabled: false },
      deleteHead: { isLoader: false, disabled: false },
      deleteAt: { isLoader: false, disabled: false },
      addAt: { isLoader: false, disabled: false },
      valueInput: { disabled: false },
      indexInput: { disabled: false },
    });
  }

  useEffect(() => {
    for(let i = 0; i < 4; i++) {
      const randValue = Math.floor(Math.random() * 100)
      linkedList.append({value: randValue.toString(), head: null, tail: null, state: ElementStates.Default})
    }
    setShouldUpdate(!shouldUpdate)
  }, [])

  const addElementByIndex = async () => {
    setButtonsLoadingState({ addAt: { isLoader: true, disabled: true } });
    let element: TLinkedListElement = {value: values.valueInput, head: null, tail: null, state: ElementStates.Default}
    let array = linkedList.toArray()
    for(let i = 0; i <= +values.indexInput; i++)  {
      array[i].value.head = (<Circle letter={values.valueInput} isSmall={true} state={ElementStates.Changing}/>)
      setListElements(array.map(item => item.value))

      await new Promise((resolve) => setTimeout(resolve, 500));
      array[i].value.head = null
      array[i].value.state = ElementStates.Changing
      setListElements(array.map(item => item.value))
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    linkedList.insertAt(element, +values.indexInput)
    array = linkedList.toArray()
    array.map(item => item.value.state = ElementStates.Default)
    array[+values.indexInput].value.state = ElementStates.Modified
    setListElements(array.map(item => item.value))
    await new Promise((resolve) => setTimeout(resolve, 500));
    array[+values.indexInput].value.state = ElementStates.Default
    setListElements(array.map(item => item.value))
    enableAllButtons();
    setValues({
      valueInput: '',
      indexInput: ''
    })
  }

  const deleteElementByIndex = async () => {
    setButtonsState({
      addTail: {isLoader: false, disabled: true},
      addHead: {isLoader: false, disabled: true},
      deleteTail: {isLoader: false, disabled: true},
      deleteHead: {isLoader: false, disabled: true},
      deleteAt: {isLoader: true, disabled: true},
      addAt: {isLoader: false, disabled: true},
      valueInput: {disabled: true},
      indexInput : {disabled: true}
    })
    let array = linkedList.toArray()
    for(let i = 0; i <= +values.indexInput; i++)  {
      await new Promise((resolve) => setTimeout(resolve, 500));
      array[i].value.tail = null
      array[i].value.state = ElementStates.Changing
      setListElements(array.map(item => item.value))
    }
    array[+values.indexInput].value.tail = (<Circle letter={array[+values.indexInput].value.value} isSmall={true} state={ElementStates.Changing}/>)
    await new Promise((resolve) => setTimeout(resolve, 500));
    array[+values.indexInput].value.value = '' 
    array[+values.indexInput].value.state = ElementStates.Default
    setListElements(array.map(item => item.value))
    await new Promise((resolve) => setTimeout(resolve, 500));
    linkedList.deleteAt(+values.indexInput)
    array = linkedList.toArray()
    array.map(item => item.value.state = ElementStates.Default)
    setListElements(array.map(item => item.value))
    await new Promise((resolve) => setTimeout(resolve, 500));
    array[+values.indexInput].value.state = ElementStates.Default
    setListElements(array.map(item => item.value))
    enableAllButtons();
    setValues({
      ...values,
      indexInput: ''
    })
  }

  const addElementHead = async () => {
    setButtonsState({
      addTail: {isLoader: false, disabled: true},
      addHead: {isLoader: true, disabled: true},
      deleteTail: {isLoader: false, disabled: true},
      deleteHead: {isLoader: false, disabled: true},
      deleteAt: {isLoader: false, disabled: true},
      addAt: {isLoader: false, disabled: true},
      valueInput: {disabled: true},
      indexInput : {disabled: true}
    })
    let element: TLinkedListElement = {value: values.valueInput, head: null, tail: null, state: ElementStates.Default}
    let array = linkedList.toArray()
    array[0].value.head = (<Circle letter={values.valueInput} isSmall={true} state={ElementStates.Changing}/>)
    setListElements(array.map(item => item.value))
    await new Promise((resolve) => setTimeout(resolve, 500));

    linkedList.prepend(element)
    array = linkedList.toArray();
    array[1].value.head = null;
    array[0].value.state = ElementStates.Modified;
    setListElements(array.map(item => item.value))
    await new Promise((resolve) => setTimeout(resolve, 500));
    array[0].value.state = ElementStates.Default;
    setListElements(array.map(item => item.value))
    enableAllButtons();
    setValues({
      ...values,
      valueInput: ''
    })
  }

  const addElementTail = async () => {
    setButtonsState({
      addTail: {isLoader: true, disabled: true},
      addHead: {isLoader: false, disabled: true},
      deleteTail: {isLoader: false, disabled: true},
      deleteHead: {isLoader: false, disabled: true},
      deleteAt: {isLoader: false, disabled: true},
      addAt: {isLoader: false, disabled: true},
      valueInput: {disabled: true},
      indexInput : {disabled: true}
    })
    let element: TLinkedListElement = {value: values.valueInput, head: null, tail: null, state: ElementStates.Modified}
    let array = linkedList.toArray()
    array[array.length - 1].value.head = (<Circle letter={values.valueInput} isSmall={true} state={ElementStates.Changing}/>)
    setListElements(array.map(item => item.value))
    await new Promise((resolve) => setTimeout(resolve, 500));
    array[array.length - 1].value.head = null
    linkedList.append(element)
    array = linkedList.toArray()
    setListElements(array.map(item => item.value))
    await new Promise((resolve) => setTimeout(resolve, 500));
    array[array.length - 1].value.state = ElementStates.Default
    setListElements(array.map(item => item.value))
    enableAllButtons();
    setValues({
      ...values,
      valueInput: ''
    })
  }

  const deleteElementHead = async () => {
    setButtonsState({
      addTail: {isLoader: false, disabled: true},
      addHead: {isLoader: false, disabled: true},
      deleteTail: {isLoader: false, disabled: true},
      deleteHead: {isLoader: true, disabled: true},
      deleteAt: {isLoader: false, disabled: true},
      addAt: {isLoader: false, disabled: true},
      valueInput: {disabled: true},
      indexInput : {disabled: true}
    })
    let array = linkedList.toArray()
    array[0].value.tail = (<Circle letter={array[0].value.value} isSmall={true} state={ElementStates.Changing}/>)
    array[0].value.value = ''
    setListElements(array.map(item => item.value))
    await new Promise((resolve) => setTimeout(resolve, 500));

    linkedList.deleteHead()
    setShouldUpdate(!shouldUpdate)
    enableAllButtons();
  }

  const deleteElementTail = async () => {
    setButtonsState({
      addTail: {isLoader: false, disabled: true},
      addHead: {isLoader: false, disabled: true},
      deleteTail: {isLoader: true, disabled: true},
      deleteHead: {isLoader: false, disabled: true},
      deleteAt: {isLoader: false, disabled: true},
      addAt: {isLoader: false, disabled: true},
      valueInput: {disabled: true},
      indexInput : {disabled: true}
    })
    let array = linkedList.toArray()
    array[array.length - 1].value.tail = (<Circle letter={array[0].value.value} isSmall={true} state={ElementStates.Changing}/>)
    array[array.length - 1].value.value = ''
    setListElements(array.map(item => item.value))
    await new Promise((resolve) => setTimeout(resolve, 500));
    linkedList.deleteTail()
    setShouldUpdate(!shouldUpdate)
    enableAllButtons();
  }
  return (
    <SolutionLayout title="Связный список">
      <div className={styles.section}>
        <div className={styles.form1}>
          <Input data-cy='valueInput' placeholder='Введите значение' extraClass={styles.input} width={300} name='valueInput' isLimitText max={4} maxLength={4} onChange={handleChange} value={values.valueInput} disabled={buttonsState.valueInput.disabled}/>
          <Button data-cy='addHeadButton' text="Добавить в head" onClick={addElementHead}  disabled={values.valueInput === '' || buttonsState.addHead.disabled} isLoader={buttonsState.addHead.isLoader}/>
          <Button data-cy='addTailButton' text="Добавить в tail"  onClick={addElementTail} disabled={values.valueInput === '' || buttonsState.addTail.disabled} isLoader={buttonsState.addTail.isLoader}/>
          <Button data-cy='deleteHeadButton' text="Удалить из head"  onClick={deleteElementHead}  disabled={buttonsState.deleteHead.disabled || linkedList.toArray().length === 0} isLoader={buttonsState.deleteHead.isLoader}/>
          <Button  data-cy='deleteTailButton'text="Удалить из tail"  onClick={deleteElementTail} disabled={buttonsState.deleteTail.disabled || linkedList.toArray().length === 0} isLoader={buttonsState.deleteTail.isLoader}/>
        </div>
        <div className={styles.form2}>
          <Input data-cy='indexInput' placeholder="Введите индекс" extraClass={styles.input} width={300} type="number"  name='indexInput' onChange={handleChange} value={values.indexInput} disabled={buttonsState.indexInput.disabled}/>
          <Button data-cy='addIndexButton' text="Добавить по индексу" extraClass={styles.button} onClick={addElementByIndex} isLoader={buttonsState.addAt.isLoader} disabled={parseInt(values.indexInput) > linkedList.toArray().length -1 || !values.indexInput}/>
          <Button data-cy='deleteIndexButton' text="Удалить по индексу" extraClass={styles.button}  onClick={deleteElementByIndex}  isLoader={buttonsState.deleteAt.isLoader} disabled={parseInt(values.indexInput) > linkedList.toArray().length -1 || !values.indexInput}/>
        </div>
      </div>
      <div className={styles.container}>
        {
          linkedList.toArray().map((item, index) => 
            <div className={styles.circle} key={index}>
              <Circle 
                head={item.value.head === null && index === 0 ? 'head': item.value.head}
                tail={item.value.tail === null && index === (linkedList.getSize() - 1) ? 'tail': item.value.tail}
                index={index} 
                key={index} 
                letter={item.value.value}
                state={item.value.state}
                />
             {(
              <div className={styles.arrow}>
                { item.next !== null && <ArrowIcon/>}
              </div>
            )}
            </div>
          )
        }
      </div>
    </SolutionLayout>
  );
}