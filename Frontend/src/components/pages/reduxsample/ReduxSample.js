import React from 'react';
import styles from './ReduxSample.module.css';
import Subscribers from '../../Subscribers';
import Views from '../../Views';

const ReduxSample = () => {
  return(
    <div className={styles.reduxContainer}>
      <Subscribers />
      <Views />
    </div>
  );
}

export default ReduxSample;