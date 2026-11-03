'use client';

import { useState } from 'react';
import FilterItem from '../FilterItem/FilterItem';
import styles from './filter.module.css';
import { FilterGroup, FilterOption } from '../CenterBlock/CenterBlock';

type PropsType = {
  authors: FilterOption<string>[];
  genres: FilterOption<string>[];
  release_dates: FilterOption<string>[];
  onChange: (group: FilterGroup, id: number) => void;
};

export function Filter({
  authors = [],
  genres = [],
  release_dates = [],
  onChange,
}: PropsType) {
  const [openFilter, setOpenFilter] = useState<FilterGroup | null>(null);

  const toggleOpen = (key: FilterGroup) => {
    setOpenFilter((prev) => (prev === key ? null : key));
  };

  
  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>

      <FilterItem
        name="исполнителю"
        list={authors}
        active={openFilter === 'authors'}
        onToggleOpen={() => toggleOpen('authors')}
        onSelect={(id) => onChange('authors', id)}
      />
      <FilterItem
        name="жанру"
        list={genres}
        active={openFilter === 'genres'}
        onToggleOpen={() => toggleOpen('genres')}
        onSelect={(id) => onChange('genres', id)}
      />
      <FilterItem
        name="году выпуска"
        list={release_dates}
        active={openFilter === 'release_dates'}
        onToggleOpen={() => toggleOpen('release_dates')}
        onSelect={(id) => onChange('release_dates', id)}
      />
    </div>
  );
}
