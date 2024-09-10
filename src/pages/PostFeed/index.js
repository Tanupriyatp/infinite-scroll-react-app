import React from "react";

import styles from "./index.module.css";
import { useIntersectionObserver } from "./useIntersectionObserver";
import { useSelector } from "react-redux";

const Post = React.memo(({ article, total, index, lastArticleElementRef }) => {
  return (
    <li
      className={styles.post_li}
      ref={total === index + 1 ? lastArticleElementRef : null}
      key={article.id}
    >
      <h2>{article.title}</h2>
      <p>{article.body}</p>
    </li>
  );
});

const PostFeed = React.memo(() => {
  const { lastArticleElementRef, isLoading } = useIntersectionObserver();
  const { articles } = useSelector((store) => store?.posts);

  return (
    <div>
      <h1>Your Article Feed</h1>
      <ul className={styles.post_ul}>
        {articles?.map((article, index) => (
          <Post
            key={article?.id}
            article={article}
            total={articles.length}
            index={index}
            lastArticleElementRef={lastArticleElementRef}
          />
        ))}
      </ul>
      {isLoading && <p className={styles.lastElem}>Loading...</p>}
    </div>
  );
});

export default PostFeed;
