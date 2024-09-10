import { useCallback, useEffect } from "react";
import { incrementPage, loadPosts } from "../../redux/reducer/post.slice";
import { useDispatch, useSelector } from "react-redux";


export const useIntersectionObserver = () => {
  const dispatch = useDispatch();
  const { currentPage, isLoading, canLoadMore } = useSelector(
    (state) => state.posts
  );


  useEffect(() => {
    if (canLoadMore) {
      dispatch(loadPosts(currentPage)); // Load posts when component mounts or page changes
    }
  }, [dispatch, currentPage, canLoadMore]);

  const lastArticleElementRef = useCallback(
    (node) => {
      if (isLoading || !canLoadMore) return; // Stop observing if loading or can't load more
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          dispatch(incrementPage()); // Dispatch action to increment page
        }
      }, { threshold: 0.1 });

      if (node) observer.observe(node);
    },
    [isLoading, canLoadMore, dispatch]
  );
  return {
    lastArticleElementRef,
    isLoading,
  };
};
