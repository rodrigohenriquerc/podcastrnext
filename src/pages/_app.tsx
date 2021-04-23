import { useState } from "react";
import { Header } from "../components/Header";
import { Player } from "../components/Player";
import { PlayerContext } from "../contexts/PlayerContext";
import styles from "../styles/app.module.scss";
import "../styles/global.scss";

function MyApp({ Component, pageProps }) {
  const [episodesList, setEpisodesList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = (episode) => {
    setEpisodesList([episode]);
    setCurrentEpisodeIndex(0);
  };

  const togglePlay = (episode, options) => {
    if (options) {
      setIsPlaying(options.isPlaying);
    } else {
      setIsPlaying(!isPlaying);
    }
    play(episode);
  };

  return (
    <PlayerContext.Provider
      value={{ episodesList, currentEpisodeIndex, isPlaying, togglePlay }}
    >
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  );
}

export default MyApp;
