import {
  BarVisualizer,
  TrackReferenceOrPlaceholder,
} from "@livekit/components-react";

export const AudioInputTile = ({
  trackRef,
}: {
  trackRef: TrackReferenceOrPlaceholder;
}) => {
  return (
    <div>
      <BarVisualizer
        trackRef={trackRef}
        className="h-full w-full"
        barCount={20}
        options={{ minHeight: 0 }}
      />
    </div>
  );
};
