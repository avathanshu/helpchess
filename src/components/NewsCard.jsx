import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";


const ThumbnailWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1.91 / 1;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
  z-index: 2;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  margin: 1rem;
  width: min(22rem, 100%);
  box-shadow: 0px 4px 4px 0px #00000021;
  border: 1px solid #99999999;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  justify-content: space-between;
  z-index: 10;
  background: linear-gradient(180deg, #fffde7 0%, #ffffff 100%);

  * {
    z-index: 2;
  }

  .description {
  }

  .date {
    font-weight: bold;
    color: #666666;
    font-size: 0.8rem;
  }

  .amount {
    color: #666666;
    font-size: 0.8rem;
    font-weight: bold;
  }

  h1 {
    color: #1a1a1a;
    font-size: 1.3rem;
    transition: color 0.2s ease-in-out;
  }

  &:hover h1 {
    color: #6562fe;
  }
`;

const LoadMoreCard = styled(Card)`
  background: #6562fe;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  letter-spacing: 1px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: white;
    color: #6562fe;
  }
`;

const TopSpan = styled.span`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function NewsCard({
  title,
  subtitle,
  date,
  thumbnail,
  amount,
  description,
  month,
  link,
  loadMore,
  onClick,
}) {
  const handleLoadMore = (e) => {
    e.preventDefault();
    if (onClick) onClick();
    document.getElementById("stories")?.scrollIntoView({ behavior: "instant" });
  };

  if (loadMore) {
    return (
      <LoadMoreCard onClick={handleLoadMore}>
        <p>Load all</p>
      </LoadMoreCard>
    );
  }
  const displayDescription = subtitle || description;
  const displayMonth = date
    ? new Date(date).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : month;

  return (
    <Link href={link || "#"} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block", width: "min(22rem, 100%)", margin: "1rem" }}>
      <Card style={{ margin: 0, width: "100%" }}>
      {thumbnail && (
        <ThumbnailWrapper>
          <Image src={thumbnail} alt={title} fill unoptimized style={{ objectFit: "cover" }} />
        </ThumbnailWrapper>
      )}
      <TopSpan>
        <h1>{title}</h1>
        {(amount || displayMonth) && (
          <span>
            <p className="amount">
              {amount && (`${amount.slice(0, 2).toLowerCase() === "rs" ? " " : "₹"}` + amount + " | ")}
              <span className="date">{displayMonth}</span>
            </p>
          </span>
        )}

        <p className="description">{displayDescription}</p>
      </TopSpan>
      </Card>
    </Link>
  );
}