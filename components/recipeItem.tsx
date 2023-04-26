import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"

import { IsFluid, Primary } from "../interfaces/styledComponents"
import { ProductionRecipeItem } from "../interfaces"

interface Props {
  craftTime: number,
  item: ProductionRecipeItem,
  clockspeed: number
}

export default function RecipeItem({ craftTime, item, clockspeed }: Props) {
  return (
    <StyledItemContainer key={item.slug}>
      <StyledItem>
        <Link href={`/items/${item.slug}`}>
          <StyledItemImage isFluid={item.isFluid}>
            <Image
              src={item.imgUrl}
              width={72}
              height={72}
              alt={item.slug}
              quality={100}
            />
          </StyledItemImage>
        </Link>
        <StyledItemDetail>
          <StyledItemName>{item.amount} {item.name}</StyledItemName>
          <StyledUsagePerMinute>
            <span style={{ color: '#e59344' }}>{parseFloat((60 / craftTime * item.amount).toFixed(3))} </span>
            {clockspeed != 100 && (
              <strong style={{ color: '#e59344' }}>({parseFloat((60 / craftTime * item.amount * clockspeed / 100).toFixed(4))})</strong>
            )} per minute</StyledUsagePerMinute>
        </StyledItemDetail>
      </StyledItem>
      <StyledItemLine />
    </StyledItemContainer>
  )
}

const StyledItemLine = styled.div<Primary>`
  width: ${props => props.primary ? '96%' : '100%'};
  height: 1px;
  background-color: #9BA3A9;
`

const StyledItemContainer = styled.div`
  width: 96%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`

const StyledItemImage = styled.div<IsFluid>`
  height: 2.5rem;
  width: 2.5rem;
  background-color: #43454B;
  padding: 0.25rem;
  margin: 0.5rem 0.25rem 0.5rem 0;
  border-radius: ${props => props.isFluid ? '50%' : '0.125rem'};
  ${props => props.detail && 'margin: 0 0 0 0.25rem;'}
  cursor: pointer;

  @media (min-width: 768px) {
    width: 3rem;
    height: 3rem;
  }

  @media (min-width: 1440px) {
    width: 4.5rem;
    height: 4.5rem;
    margin: 0.5rem 0.5rem 0.5rem 0;
  }
`

const StyledItemDetail = styled.div`
  width: calc(100% - 3rem);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: #CCCCCC;
  font-family: Roboto, -apple-system, sans-serif;

  @media (min-width: 1024px) {
    width: calc(100% - 4rem);
  }

  @media (min-width: 1440px) {
    width: calc(100% - 5rem);
  }
`

const StyledItemName = styled.div`
  color: #DDDDDD;
  font-size: 0.5rem;
  margin-bottom: 0.125rem;

  @media (min-width: 768px) {
    font-size: 0.75rem;
  }

  @media (min-width: 1440px) {
    font-size: 1rem;
  }
`

const StyledUsagePerMinute = styled.div`
  font-size: 0.4rem;

  @media (min-width: 768px) {
    font-size: 0.6rem;
  }

  @media (min-width: 1440px) {
    font-size: 0.8rem;
  }
`
