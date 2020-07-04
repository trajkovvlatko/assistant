import React from 'react';

import INote from '../../interfaces/INote';

import './style.css';

function NoteItem(props: {row: INote; remove: (key: string) => void}) {
  const {row} = props;

  const remove = () => {
    if (window.confirm('Are you sure that you want to remove this note?')) {
      props.remove(row.key);
    }
  };

  const at = new Date(row.at).toISOString().replace('T', ' ').substr(0, 16);

  return (
    <div className='card note'>
      <div className='date-time'>
        <i>{at}</i>
      </div>
      <b>{row.user}</b>: {row.note}
      <div className='remove' onClick={remove}>
        &times;
      </div>
    </div>
  );
}

export default NoteItem;
