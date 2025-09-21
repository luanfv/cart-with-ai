import { randomUUID } from 'node:crypto';
import { ChatMessageEntity } from './chat-message.entity';
import { ChatSessionAggregate } from './chat-session.aggregate';

describe('ChatSessionAggregate unit tests', () => {
  describe('addMessage method', () => {
    it('SHOULD add a message to the chat session', () => {
      const chatSession = ChatSessionAggregate.restore(
        randomUUID(),
        randomUUID(),
        new Date(),
      );
      const message = ChatMessageEntity.create('Hello, world!', 'user', 'text');
      chatSession.addMessage(message);
      expect(chatSession.messages).toEqual([
        {
          id: message.id,
          chatSessionId: chatSession.id,
          content: message.values.content,
          sender: message.values.sender,
          createdAt: message.values.createdAt,
          messageType: message.values.messageType,
        },
      ]);
    });

    describe('WHEN the message does not belong to the chat session', () => {
      it('SHOULD throw an error', () => {
        const chatSession = ChatSessionAggregate.restore(
          randomUUID(),
          randomUUID(),
          new Date(),
        );
        const message = ChatMessageEntity.restore(
          randomUUID(),
          randomUUID(),
          'Hello, world!',
          'user',
          new Date(),
          'text',
        );
        expect(() => chatSession.addMessage(message)).toThrow(
          new Error('Message does not belong to this chat session'),
        );
      });
    });
  });
});
