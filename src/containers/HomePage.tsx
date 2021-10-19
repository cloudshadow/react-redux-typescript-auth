import * as React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import rootAction from '@/actions';
import HomeComponent from '@/components/Home/HomeComponent';
import { RootState } from '@/types/GlobalTypes';
import { IHomeState } from '@/types/HomeTypes';

const HomePage: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const homeState = useSelector<RootState, IHomeState>((state) => state.home, shallowEqual);

  return (
    <HomeComponent
      fetchTitleThunk={(args) => dispatch(rootAction.homeActions.fetchTitleThunk(args))}
      homeState={homeState}
    />
  );
};

export default HomePage;
