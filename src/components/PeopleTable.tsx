import { FC } from 'react';
import { Person, SortField } from '../types';
import { PersonLink } from './Person';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

type Props = {
  people: Person[];
};
export const PeopleTable: FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order');

  function setSearchWith(paramsToUpdate: SearchParams) {
    const search = getSearchWith(searchParams, paramsToUpdate);

    setSearchParams(search);
  }

  const handleSort = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    field: SortField,
  ) => {
    e.preventDefault();

    if (sort !== field) {
      setSearchWith({ sort: field });
    } else {
      setSearchWith({ order: 'desc' });
      if (order === 'desc') {
        setSearchWith({ order: null, sort: null });
      }
    }
  };

  function iconSort(field: SortField) {
    if (sort == field && order === 'desc') {
      return 'fas fa-sort-down';
    }

    if (sort === field) {
      return 'fas fa-sort-up';
    }

    return 'fas fa-sort';
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <Link to="#">
                <span className="icon">
                  <i
                    className={iconSort('name')}
                    onClick={e => handleSort(e, 'name')}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to="#">
                <span className="icon">
                  <i
                    className={iconSort('sex')}
                    onClick={e => handleSort(e, 'sex')}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to="#">
                <span className="icon">
                  <i
                    className={iconSort('born')}
                    onClick={e => handleSort(e, 'born')}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to="#">
                <span className="icon">
                  <i
                    className={iconSort('died')}
                    onClick={e => handleSort(e, 'died')}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <PersonLink key={person.name} person={person} />
        ))}
      </tbody>
    </table>
  );
};
