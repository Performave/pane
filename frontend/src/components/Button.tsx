import styled, { css } from 'styled-components/macro'
import tw from 'twin.macro'

interface ButtonProps {
  isOutlined?: boolean
}

const ButtonStyle = styled.button<ButtonProps>`
  ${tw`px-4 py-1.5 rounded text-sm border font-medium transition-colors`};
  ${(props) =>
    !props.isOutlined &&
    css<ButtonProps>`
      ${tw`hover:bg-white hover:text-black border-black bg-black text-white`}
    `}
    ${(props) =>
     props.isOutlined &&
      css<ButtonProps>`
        ${tw`hover:bg-black hover:text-white border-white bg-white text-black`}
      `}
`

type ComponentProps = Omit<JSX.IntrinsicElements['button'], 'ref'> & ButtonProps

const Button = ({ children, ...props }: ComponentProps) => {
  return <ButtonStyle {...props}>{children}</ButtonStyle>
}

export default Button