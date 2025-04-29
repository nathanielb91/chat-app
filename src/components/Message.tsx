import './Message.scss';

type MessageProps = {
  text: string;
  sender: string;
  isOwnMessage: boolean;
  timestamp: number;
};

function Message({ text, sender, isOwnMessage, timestamp }: MessageProps) {
  const formattedTime = new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`message-bubble ${isOwnMessage ? 'own' : 'other'}`}>
      {!isOwnMessage && (
        <div className="message-sender">{sender}</div>
      )}
      <div className="message-content">{text}</div>
      <div className="message-time">{formattedTime}</div>
    </div>
  );
}

export default Message;
