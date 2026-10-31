'use client';
import Link from 'next/link';
import styles from './bar.module.css';
import classnames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useRef, useState } from 'react';
import {
  setIsPlay,
  setNextShuffledTrack,
  setNextTrack,
} from '@/store/features/trackSlice';
import ProgressBar from '../ProgressBar/ProgressBar';

export default function Bar() {
  const [isLoop, setIsLoop] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [isLoadingTrack, setIsLoadindTrack] = useState<boolean>(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const tracks = useAppSelector((state) => state.tracks);
  const dispatch = useAppDispatch();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
  }, [tracks.currentTrack?._id]);

  if (!tracks.currentTrack) return null;

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value) / 100;
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  }

  function playTrack() {
    audioRef.current?.play();
  }

  function pauseTrack() {
    audioRef.current?.pause();
  }

  function onNextTrack() {
    if (isShuffle) dispatch(setNextShuffledTrack());
    else dispatch(setNextTrack());
  }

  function handleTimeUpdate() {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  }

  function handleProgressChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    setCurrentTime(value);
    if (audioRef.current) audioRef.current.currentTime = value;
  }

  const formatTime = (sec: number) => {
    if (!Number.isFinite(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  function handleEnded() {}

  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        src={tracks.currentTrack?.track_file}
        autoPlay={true}
        loop={isLoop}
        onPause={() => {
          dispatch(setIsPlay(false));
        }}
        onPlay={() => {
          dispatch(setIsPlay(true));
        }}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onDurationChange={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={handleEnded}
      ></audio>
      <div className={styles.bar__content}>
        <ProgressBar
          max={duration}
          readOnly={isLoadingTrack}
          step={0.1}
          value={currentTime}
          onChange={handleProgressChange}
        ></ProgressBar>
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div className={styles.player__btnPrev}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              {tracks.isPlay ? (
                <div
                  className={classnames(styles.player__btnPlay, styles.btn)}
                  onClick={pauseTrack}
                >
                  <svg className={styles.player__btnPlaySvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-pause"></use>
                  </svg>
                </div>
              ) : (
                <div
                  className={classnames(styles.player__btnPlay, styles.btn)}
                  onClick={playTrack}
                >
                  <svg className={styles.player__btnPlaySvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
                  </svg>
                </div>
              )}
              <div className={styles.player__btnNext} onClick={onNextTrack}>
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                onClick={() => setIsLoop(!isLoop)}
                className={classnames(styles.player__btnRepeat, styles.btnIcon)}
              >
                <svg
                  className={classnames(styles.player__btnRepeatSvg, {
                    [styles.active]: isLoop,
                  })}
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                onClick={() => setIsShuffle(!isShuffle)}
                className={classnames(
                  styles.player__btnShuffle,
                  styles.btnIcon
                )}
              >
                <svg
                  className={classnames(styles.player__btnShuffleSvg, {
                    [styles.active]: isShuffle,
                  })}
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="">
                    {tracks.currentTrack?.name}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {tracks.currentTrack?.author}
                  </Link>
                </div>
              </div>

              <div className={styles.trackPlay__likeDis}>
                <div
                  className={classnames(styles.trackPlay__like, styles.btnIcon)}
                >
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div
                  className={classnames(
                    styles.trackPlay__dislike,
                    styles.btnIcon
                  )}
                >
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={classnames(styles.volume__progress, styles.btn)}>
                <input
                  className={classnames(
                    styles.volume__progressLine,
                    styles.btn
                  )}
                  onChange={handleVolumeChange}
                  value={Math.round(volume * 100)}
                  min={0}
                  max={100}
                  type="range"
                  name="range"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
