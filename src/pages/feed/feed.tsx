import { FC, useEffect } from 'react';
import { FeedUI } from '@ui-pages';
import { getFeed } from '../../services/slices/feedSlice';
import { Preloader } from '@ui';
import { selectors } from '@selectors';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectors.feed.getOrders);
  const isLoading = useSelector(selectors.feed.getIsLoading);

  useEffect(() => {
    dispatch(getFeed());
  }, []);

  const handleGetFeeds = () => {
    dispatch(getFeed());
  };

  if (isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
