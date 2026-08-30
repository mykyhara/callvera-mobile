import { useAudioPlayer } from "expo-audio";
import { PauseIcon, PlayIcon } from "lucide-react-native";
import { View } from "react-native";

import { cn, formatDuration } from "@/lib/utils";

import { Button } from "./ui/button";
import { Icon } from "./ui/icon";
import { Text } from "./ui/text";

interface AudioPlayerProps {
  url: string;
  disabled?: boolean;
}

export function AudioPlayer({ url, disabled = false }: AudioPlayerProps) {
  const player = useAudioPlayer(url);

  const togglePlayback = () => {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  return (
    <View className="gap-2">
      <View className="px-2">
        <AudioPlayerProgressBar
          currentTime={player.currentTime}
          duration={player.duration}
          disabled={disabled}
        />
      </View>
      <AudioPlayerToggleButton
        isPlaying={player.playing}
        onPress={togglePlayback}
        disabled={disabled}
      />
    </View>
  );
}

interface AudioPlayerProgressBarProps {
  currentTime: number;
  duration: number;
  disabled: boolean;
}

function AudioPlayerProgressBar({
  currentTime,
  duration,
  disabled,
}: AudioPlayerProgressBarProps) {
  const progressRatio = duration > 0 ? currentTime / duration : 0;
  const progressPercentage =
    `${Math.min(Math.max(progressRatio * 100, 0), 100)}%` as const;

  return (
    <View className={cn("w-full", disabled && "opacity-50")}>
      <View className="bg-secondary h-1.5 w-full overflow-hidden rounded-full">
        <View
          className="bg-primary h-full rounded-full"
          style={{ width: progressPercentage }}
        />
      </View>
      <View
        className="bg-primary absolute -top-1 -ml-2 size-4 rounded-full"
        style={{ left: progressPercentage }}
      />

      <View className="mt-1.5 flex-row justify-between">
        <Text className="text-muted-foreground text-xs">
          {formatDuration(currentTime)}
        </Text>
        <Text className="text-muted-foreground text-xs">
          {formatDuration(duration)}
        </Text>
      </View>
    </View>
  );
}

interface AudioPlayerToggleButtonProps {
  isPlaying: boolean;
  onPress: () => void;
  disabled: boolean;
}

function AudioPlayerToggleButton({
  onPress,
  isPlaying,
  disabled,
}: AudioPlayerToggleButtonProps) {
  return (
    <Button className="rounded-full" onPress={onPress} disabled={disabled}>
      <Icon as={isPlaying ? PauseIcon : PlayIcon} />
      <Text>{isPlaying ? "Pause" : "Play"}</Text>
    </Button>
  );
}
