type ChatMessageProps = {
  message: string;
  accentColor: string;
  name: string;
  isSelf: boolean;
  hideName?: boolean;
};

export const ChatMessage = ({
  name,
  message,
  accentColor,
  isSelf,
  hideName,
}: ChatMessageProps) => {
  return (
    <div
      className={`flex flex-col gap-1 ${hideName ? "pt-0" : "pt-6"} ${
        isSelf ? "items-end" : "items-start"
      }`}
    >
      {!hideName && (
        <div
          className={`uppercase text-xs ${
            isSelf ? "text-white" : "text-" + accentColor + "-800"
          }`}
        >
          {name}
        </div>
      )}
      <div
        className={`pr-4 py-2 px-3 rounded-lg text-sm whitespace-pre-line ${
          isSelf
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-" + accentColor + "-800"
        }`}
      >
        {message}
      </div>
    </div>
  );
};
