import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";


const ThumbnailWrapper = styled.div`
  width: 100%;
  aspect-ratio: 352 / 184;
  position: relative;
  flex-shrink: 0;
  z-index: 2;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: min(22rem, 100%);
  margin: 1rem;
  border-radius: 10px;
  box-shadow: 2px 2px 6px 0px #00000040;
  position: relative;
  overflow: hidden;
  z-index: 10;
  background: linear-gradient(180deg, #fff9c1 0%, #fafafa 100%);
  transition: all 300ms ease-out;

  * {
    z-index: 2;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    padding: 0 1rem 1.25rem;
  }

  .top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.625rem;
  }

  .date {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 100%;
    color: #00000099;
  }

  .amount {
    font-family: "Roboto", sans-serif;
    font-weight: 700;
    font-size: 0.875rem;
    line-height: 100%;
    text-align: right;
    color: #6562fe;
    white-space: nowrap;
  }

  .description {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 100%;
    color: #000000b2;
  }

  h1 {
    font-family: "Roboto", sans-serif;
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 100%;
    color: #2b2b2b;
    transition: color 300ms ease-out;
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
  min-height: 12rem;

  &:hover {
    background: white;
    color: #6562fe;
  }
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
        <div className="content">
          {(amount || displayMonth) && (
            <div className="top-row">
              {displayMonth && <span className="date">{displayMonth}</span>}
              {amount && (
                <span className="amount">
                  {amount.slice(0, 2).toLowerCase() === "rs" ? " " : "₹"}
                  {amount}
                </span>
              )}
            </div>
          )}
          <h1>{title}</h1>
          <p className="description">{displayDescription}</p>
        </div>
      </Card>
    </Link>
  );
}
