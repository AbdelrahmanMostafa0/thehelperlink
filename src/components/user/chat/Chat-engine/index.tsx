// next js
import { ReactNode } from 'react';

// chat engine
import {
  ChatEngineWrapper,
  // @ts-ignore
} from 'react-chat-engine';

// components
import WrappedComponent from '@src/components/user/chat/Chat-engine/WrappedComponent';

interface IProps {
  children?: ReactNode;
}

const ChatEngineCTX: React.FC<IProps> = () => {
  return (
    <ChatEngineWrapper>
      <WrappedComponent />
    </ChatEngineWrapper>
  );
};

export default ChatEngineCTX;
