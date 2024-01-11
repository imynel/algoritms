import { render } from "@testing-library/react"
import { Circle } from "./circle"
import { ElementStates } from "../../../types/element-states"


describe('circle', () => {
    test('with not letter', () => {
        const circle = render(<Circle/>)
        expect(circle).toMatchSnapshot()
    })

    test('with letter', () => {
        const circle = render(<Circle letter="test text" />)
        expect(circle).toMatchSnapshot()
    })

    test('with head', () => {
        const circle = render(<Circle head='test text' />)
        expect(circle).toMatchSnapshot()
    })

    test('with react-element in head', () => {
        const circle = render(<Circle head={<Circle/>} />)
        expect(circle).toMatchSnapshot()
    })

    test('with tail', () => {
        const circle = render(<Circle tail='test text' />)
        expect(circle).toMatchSnapshot()
    })

    test('with react-element in tail', () => {
        const circle = render(<Circle tail={<Circle/>} />)
        expect(circle).toMatchSnapshot()
    })

    test('with index', () => {
        const circle = render(<Circle index={1} />)
        expect(circle).toMatchSnapshot()
    })

    test('with props "isSmall ===  true" ', () => {
        const circle = render(<Circle isSmall={true} />)
        expect(circle).toMatchSnapshot()
    })
    
    test('in default state', () => {
        const circle = render(<Circle state={ElementStates.Default} />)
        expect(circle).toMatchSnapshot()
    })

    test('in changing state', () => {
        const circle = render(<Circle state={ElementStates.Changing} />)
        expect(circle).toMatchSnapshot()
    })

    test('in modified state', () => {
        const circle = render(<Circle state={ElementStates.Modified} />)
        expect(circle).toMatchSnapshot()
    })
})