import styled from 'styled-components';
import tw from 'twin.macro';

const InputStyle = styled.input`${tw`transition-colors border text-sm outline-none rounded px-2.5 py-2`}`

type ComponentProps = Omit<JSX.IntrinsicElements['input'], 'ref'>

const Input = ({ children, ...props }: ComponentProps) => {
    return <InputStyle className="focus:border-neutral-700 border-neutral-300" {...props}>{children}</InputStyle>
}

export default Input