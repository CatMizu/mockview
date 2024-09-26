import { ReactNode } from "react";

const titleHeight = 32;

type PlaygroundTileProps = {
  children?: ReactNode;
  className?: string;
  backgroundColor?: string;
};

export const PlaygroundTile: React.FC<PlaygroundTileProps> = ({
  children,
  className,
  backgroundColor = "#d6d6d6",
}) => {
  return (
    <div
      className={`card shadow-lg ${className}`} 
      style={{
        backgroundColor: backgroundColor, 
      }}
    >

      {children}
    </div>
  );
};
