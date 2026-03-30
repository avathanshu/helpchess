import styled from "styled-components";
import CheckPattern from "@/components/CheckPattern";

const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const Wrapper = styled.div`
  min-width: 18rem;
  height: 12rem;
  border: 1px solid #6562fe80;
  padding: 1.5rem 1rem;
  border-radius: 10px;
  display: flex;
  position: relative;
  overflow: hidden;

  .pattern-bg {
    position: absolute;
    bottom: -15%;
    right: -10%;
    z-index: 0;
    pointer-events: none;
    opacity: 0.5;
  }
`;

const TextContainer = styled.span`
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
  position: relative;
  z-index: 1;

  .name {
    color: #6562fe;
    font-family: var(--font-roboto), sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.4;
    text-align: left;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-word;
  }

  .amount {
    color: #6562fe;
    font-family: var(--font-roboto), sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    text-align: left;
    opacity: 0.85;
  }
`;

export default function DonationCard({ amount, name }) {
  return (
    <Wrapper>
      <CheckPattern className="pattern-bg" />
      <TextContainer>
        <span>
          <p className="name">{name}</p>
          <p className="amount">{formatINR(amount)}</p>
        </span>
      </TextContainer>
    </Wrapper>
  );
}
