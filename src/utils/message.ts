import { Message, MessageType } from '@/types/message';

export type MessageBuilderProps = {
  type: MessageType;
  content: string;
  source: string;
  destination: string;
};

export const messageBuilder = ({
  type,
  content,
  source,
  destination
}: MessageBuilderProps): Message => {
  return {
    type,
    content,
    sourceType: 'agent',
    source,
    destination: [destination]
  };
};
