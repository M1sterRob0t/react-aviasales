import Airlines from '../Airlines';
import Filters from '../Filters';
import Logo from '../Logo';
import Sorting from '../Sorting';

import classes from './App.module.scss';

function App() {
  return (
    <div className={classes['app']}>
      <Logo />
      <div className={classes['app__body']}>
        <div className={classes['app__left-column']}>
          <Filters />
        </div>
        <div className={classes['app__right-column']}>
          <Sorting className={classes['app__sorting']} />
          <Airlines />
        </div>
      </div>
    </div>
  );
}

export default App;
