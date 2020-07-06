import React from 'react';

import IContentItem from '../../interfaces/IContentItem';
import ContentItem from '../ContentItem/ContentItem';

type GroupedContentItems = Record<string, IContentItem[]>;

interface IProps {
  list: GroupedContentItems;
  toggle: {
    cb: (bucket: string, key: string) => void;
    bucket: string;
  };
}

function ContentGroupedList(props: IProps) {
  const {list, toggle} = props;

  return (
    <div>
      {Object.entries(list).map(([key, records]) => (
        <div key={key}>
          <div className='due-date-header'>
            <b>{records[0].dueDate || 'No due date'}</b>
          </div>
          <br />
          {records.map((row: IContentItem) => (
            <ContentItem row={row} key={row.at} toggle={toggle} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default ContentGroupedList;
