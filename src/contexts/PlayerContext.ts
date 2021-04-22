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
  play: (episode: Episode) => void;
};

export const PlayerContext = createContext({} as PlayerContextData);
