import React, { Component } from 'react';
import styles from './styles';

const Divider = (props) => (
  <>
    <div
      className={'divider ' + (props.dataContent && 'content')}
      data-content={props.dataContent}
    ></div>
    <style jsx>{styles}</style>
  </>
);

export default Divider;
