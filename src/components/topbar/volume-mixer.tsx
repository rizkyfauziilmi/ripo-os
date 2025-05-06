import {
  Sun,
  SunDim,
  SunMedium,
  Volume2,
  VolumeOff,
  Volume,
  Volume1,
} from "lucide-react";
import { Slider } from "../ui/slider";
import { useState } from "react";

function VolumeMixer() {
  const [volume, setVolume] = useState(33);
  const [brightness, setBrightness] = useState(33);

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeOff />;
    if (volume > 0 && volume <= 30) return <Volume />;
    if (volume > 30 && volume <= 60) return <Volume1 />;
    return <Volume2 />;
  };

  const getBrightnessIcon = () => {
    if (brightness === 0) return <SunDim />;
    if (brightness > 0 && brightness <= 50) return <SunMedium />;
    return <Sun />;
  };

  return (
    <div className="bg-muted/50 space-y-2 rounded-md p-2">
      <div className="flex items-center gap-4">
        {getVolumeIcon()}
        <Slider
          defaultValue={[volume]}
          max={100}
          step={1}
          onValueChange={(value) => setVolume(value[0])}
        />
      </div>
      <div className="flex items-center gap-4">
        {getBrightnessIcon()}
        <Slider
          defaultValue={[brightness]}
          max={100}
          step={1}
          onValueChange={(value) => setBrightness(value[0])}
        />
      </div>
    </div>
  );
}

export default VolumeMixer;
