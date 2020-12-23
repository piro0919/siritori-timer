import { createContext } from "react";

const VolumeContext = createContext({
  setVolume: (_: any) => {},
  volume: 0,
});

export default VolumeContext;
