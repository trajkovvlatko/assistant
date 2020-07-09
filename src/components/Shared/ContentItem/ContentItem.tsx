import React from 'react';
import IContentItem from 'interfaces/IContentItem';
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
      <div>
        <div className='date-time'>
          <i>{at}</i>
        </div>
        {row.dueDate && (
          <div className='due-date'>
            Due date: <span>{row.dueDate}</span>
          </div>
        )}
        {row.duration && (
          <div className='duration'>
            Estimated: <span>{row.duration} minutes</span>
          </div>
        )}
        {row.genre && (
          <div className='genre'>
            Genre: <span>{row.genre}</span>
          </div>
        )}
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
      {row.link && (
        <div className='link'>
          <a href={row.link} target='_blank' rel='noopener noreferrer'>
            {row.link}
          </a>
        </div>
      )}
    </div>
  );
}

export default ContentItem;
