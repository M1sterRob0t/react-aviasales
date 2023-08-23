import { Progress, Spin, Space, Alert } from 'antd';
import { useSelector } from 'react-redux';
import { AxiosError } from 'axios';

import Airlines from '../Airlines';
import Filters from '../Filters';
import Logo from '../Logo';
import Sorting from '../Sorting';
import { TState } from '../../types';

import classes from './App.module.scss';

function App() {
  const isLoading = useSelector<TState, boolean>((state) => state.flights.isDataLoadig);
  const loadingProgress = useSelector<TState, number>((state) => state.flights.loadingProgress);

  const error = useSelector<TState, AxiosError | null>((state) => state.flights.error);
  const isError = error ? true : false;

  const errorMessage = error?.response?.status ? `${error?.response?.status}: ${error.code}` : error?.code;
  const errorDesc = error?.message;

  const progressStyles: React.CSSProperties =
    loadingProgress < 100 && !isError ? { visibility: 'visible' } : { visibility: 'hidden' };

  return (
    <div className={classes['app']}>
      <Logo />
      <div className={classes['app__body']}>
        <div className={classes['app__left-column']}>
          <Filters className={classes['app__filters']} />
        </div>
        <div className={classes['app__right-column']}>
          <Sorting className={classes['app__sorting']} />
          <Progress
            className={classes['app__progress']}
            percent={loadingProgress}
            showInfo={false}
            strokeColor={'#2196F3'}
            style={progressStyles}
          />
          {isLoading ? (
            <Space className={classes['app__spinner-container']}>
              <Spin size="large" />
            </Space>
          ) : isError ? (
            <Alert message={errorMessage} description={errorDesc} type="error" />
          ) : (
            <Airlines />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
