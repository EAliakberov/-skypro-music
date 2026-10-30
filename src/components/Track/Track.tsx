import Link from 'next/link';
import styles from './track.module.css';
import { TrackType } from '../../../data';

export function extractFilterOptions(tracks: TrackType[]) {
  const authors = new Set<string>();
  const genres = new Set<string>();
  const release_dates = new Set<string>();

  for (const track of tracks) {
    authors.add(track.author);
    release_dates.add(new Date(track.release_date).getFullYear().toString());
    for (const genre of track.genre) {
      genres.add(genre);
    }
  }

  return {
    authors: [...authors].sort((a, b) => a.localeCompare(b)),
    genres: [...genres].sort((a, b) => a.localeCompare(b)),
    release_dates: [...release_dates].sort((a, b) => +a - +b),
  };
}

type TrackProps = Pick<
  TrackType,
  'name' | 'author' | 'album' | 'duration_in_seconds'
>;

// Переводит секунды в формат м:сс
function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function Track({
  name,
  author,
  album,
  duration_in_seconds,
}: TrackProps) {
  return (
    <div className={styles.playlist__item}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            <svg className={styles.track__titleSvg}>
              <use href="/img/icon/sprite.svg#icon-note" />
            </svg>
          </div>
          <div>
            <Link className={styles.track__titleLink} href="#">
              {name}
            </Link>
          </div>
        </div>

        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="#">
            {author}
          </Link>
        </div>

        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="#">
            {album}
          </Link>
        </div>

        <div className={styles.track__time}>
          <svg className={styles.track__timeSvg}>
            <use href="/img/icon/sprite.svg#icon-like" />
          </svg>
          <span className={styles.track__timeText}>
            {formatDuration(duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
