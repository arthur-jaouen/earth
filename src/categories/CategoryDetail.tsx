import { FunctionComponent, useState } from 'react';
import { redirect, useParams } from 'react-router-dom';
import { EntityCard } from '../entities/EntityCard';
import { Entities } from '../entities/EntityTable';
import { VisibleProvider } from '../lib/Visible';

import './CategoryDetail.scss';

export const CategoryDetail: FunctionComponent = () => {
  const [elem, setElem] = useState<HTMLElement | null>(null);
  const params = useParams();
  const id = params.category;
  const entityId = params.id;

  if (!id || !entityId) {
    redirect('#');

    return null;
  }

  return (
    <div className="category-detail" ref={setElem}>
      <VisibleProvider elem={elem}>
        <EntityCard entity={Entities[entityId]} />
      </VisibleProvider>
    </div>
  );
};
