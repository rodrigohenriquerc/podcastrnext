import Image from "next/image";
import { useCallback, useContext, useEffect, useRef } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import styles from "./styles.module.scss";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export function Player() {
  const {
    episodesList,
    currentEpisodeIndex,
    isPlaying,
    togglePlay,
  } = useContext(PlayerContext);

  const episode = episodesList[currentEpisodeIndex];

  const audioRef = useRef<HTMLAudioElement>(null);

  const play = useCallback(() => {
    audioRef?.current?.play();
  }, [audioRef]);

  const pause = useCallback(() => {
    audioRef?.current?.pause();
  }, [audioRef]);

  useEffect(() => {
    isPlaying ? play() : pause();
  }, [isPlaying]);

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>
          Tocando agora: {episodesList[currentEpisodeIndex]?.title}
        </strong>
      </header>
      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}
      <footer className={!episode ? styles.empty : ""}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                trackStyle={{ backgroundColor: "#04d361" }}
                railStyle={{ backgroundColor: "#9f75ff" }}
                handleStyle={{ backgroundColor: "#04d361" }}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>00:00</span>
        </div>
        {episode && (
          <audio
            src={episode.url}
            autoPlay
            onPause={() => togglePlay(episode, { isPlaying: false })}
            onPlay={() => togglePlay(episode, { isPlaying: true })}
            ref={audioRef}
          ></audio>
        )}
        <div className={styles.buttons}>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button
            type="button"
            className={styles.playButton}
            disabled={!episode}
            onClick={() => togglePlay(episode)}
          >
            {isPlaying ? (
              <img src="/pause.svg" alt="Pausar" />
            ) : (
              <img src="/play.svg" alt="Tocar" />
            )}
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-next.svg" alt="Tocar próxima" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
}
