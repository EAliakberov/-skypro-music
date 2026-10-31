import Link from 'next/link';
import styles from './track.module.css';
import { TrackType } from '../../../data';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack } from '@/store/features/trackSlice';
import classnames from 'classnames';

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

// Переводит секунды в формат м:сс
function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function Track(track: TrackType) {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector((state) => {
    return state.tracks;
  });

  function handleTrackClick() {
    dispatch(setCurrentTrack(track));
  }

  return (
    <div className={styles.playlist__item} onClick={handleTrackClick}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            {tracks.currentTrack?._id != track._id ? (
              <svg className={styles.track__titleSvg}>
                <use href="/img/icon/sprite.svg#icon-note" />
              </svg>
            ) : (
              <div
                className={classnames(styles.track__imgDot, {
                  [styles.active]: tracks.isPlay,
                })}
              ></div>
            )}
          </div>
          <div>
            <Link className={styles.track__titleLink} href="#">
              {track.name}
            </Link>
          </div>
        </div>

        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="#">
            {track.author}
          </Link>
        </div>

        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="#">
            {track.album}
          </Link>
        </div>

        <div className={styles.track__time}>
          <svg className={styles.track__timeSvg}>
            <use href="/img/icon/sprite.svg#icon-like" />
          </svg>
          <span className={styles.track__timeText}>
            {formatDuration(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
