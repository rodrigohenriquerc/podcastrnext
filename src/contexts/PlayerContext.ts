import { createContext } from "react";

export type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodesList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  togglePlay: (episode: Episode, options?: { isPlaying: boolean }) => void;
};

export const PlayerContext = createContext({} as PlayerContextData);
