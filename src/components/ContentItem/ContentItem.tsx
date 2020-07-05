import React from 'react';

import IContentItem from '../../interfaces/IContentItem';

import './style.css';

interface IProps {
  row: IContentItem;
  remove?: (key: string) => void;
  toggle?: {
    cb: (bucket: string, key: string) => void;
    bucket: string;
  };
}

function ContentItem(props: IProps) {
  const {row} = props;

  const remove = () => {
    if (props.remove) {
      if (window.confirm('Are you sure that you want to remove this note?')) {
        props.remove(row.key);
      }
    }
  };

  const toggle = () => {
    if (props.toggle) {
      props.toggle.cb(props.toggle.bucket, row.key);
    }
  };

  const at = new Date(row.at).toISOString().replace('T', ' ').substr(0, 16);

  const className =
    props.toggle && props.toggle.bucket === 'completed'
      ? props.toggle.bucket
      : '';
  return (
    <div className={`card note ${className}`}>
      <div className='date-time'>
        <i>{at}</i>
      </div>
      {props.toggle && (
        <button className='toggle' onClick={toggle}>
          Toggle
        </button>
      )}
      <b>{row.user}</b>: <span className='content'>{row.note}</span>
      {props.remove && (
        <div className='remove' onClick={remove}>
          &times;
        </div>
      )}
    </div>
  );
}

export default ContentItem;
