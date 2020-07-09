import React, {useContext} from 'react';
import IContentItem from 'interfaces/IContentItem';
import ContentItem from 'components/Shared/ContentItem/ContentItem';
import UserContext from 'contexts/UserContext';

interface IProps {
  list: IContentItem[];
  remove?: (key: string) => void;
  toggle?: {
    cb: (bucket: string, key: string) => void;
    bucket: string;
  };
}

function ContentList(props: IProps) {
  const {list, remove, toggle} = props;
  const {user} = useContext(UserContext);

  return (
    <div className={toggle ? `${toggle.bucket}-list` : ''}>
      {list.map((row: IContentItem) => (
        <div className={user === row.user ? 'mine' : 'others'} key={row.at}>
          <ContentItem row={row} toggle={toggle} remove={remove} />
        </div>
      ))}
    </div>
  );
}

export default ContentList;
