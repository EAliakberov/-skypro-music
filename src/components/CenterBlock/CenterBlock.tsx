'use client';

import styles from './centerblock.module.css';
import classnames from 'classnames';
import { extractFilterOptions, Track } from '../Track/Track';
import { data } from '../../../data';
import { Filter } from '../Filter/Filter';
import { useMemo, useState } from 'react';

export type FilterOption<valueType> = {
  value: valueType;
  selected: boolean;
};

export type FilterGroup = 'authors' | 'genres' | 'release_dates';
type Selected = Record<FilterGroup, FilterOption<string>[]>;

const makeOptions = (values: string[]): FilterOption<string>[] =>
  values.map((value) => ({ value, selected: false }));

export default function CenterBlock() {
  const filters = useMemo(() => {
    return extractFilterOptions(data);
  }, []);
  const [selected, setSelected] = useState<Selected>({
    authors: makeOptions(filters.authors),
    genres: makeOptions(filters.genres),
    release_dates: makeOptions(filters.release_dates),
  });

  function handleFilterChange(group: FilterGroup, id: number) {
    setSelected((prev) => {
      const list = prev[group];
      const next = list.slice();
      next[id] = { ...next[id], selected: !next[id].selected };
      return { ...prev, [group]: next };
    });
  }

  return (
    <div className={styles.centerblock}>
      <div className={styles.centerblock__search}>
        <svg className={styles.search__svg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
        </svg>
        <input
          className={styles.search__text}
          type="search"
          placeholder="Поиск"
          name="search"
        />
      </div>
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter
        authors={selected.authors}
        genres={selected.genres}
        release_dates={selected.release_dates}
        onChange={handleFilterChange}
      />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classnames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {data.map((el, index) => {
            return <Track key={index} track={el} playlist={data} />;
          })}
        </div>
      </div>
    </div>
  );
}
