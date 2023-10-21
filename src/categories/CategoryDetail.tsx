import { FunctionComponent } from 'react';
import { redirect, useParams } from 'react-router-dom';
import { EntityCard } from '../entities/EntityCard';
import { Entities } from '../entities/EntityTable';

import './CategoryDetail.scss';

export const CategoryDetail: FunctionComponent = () => {
  const params = useParams();
  const id = params.category;
  const entityId = params.id;

  if (!id || !entityId) {
    redirect('#');

    return null;
  }

  return (
    <div className="category-detail">
      <EntityCard entity={Entities[entityId]} />
    </div>
  );
};
