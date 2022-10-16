import styled, { css } from 'styled-components/macro'
import tw from 'twin.macro'

interface CardProps {}

type ComponentProps = Omit<JSX.IntrinsicElements['div'], 'ref'>

const CardStyle = styled.div<CardProps>`${tw`p-6 border shadow-md rounded-md`}`

const Card = ({children, ...props}: ComponentProps) => {
    return <CardStyle {...props}>{children}</CardStyle>
}

export default Card