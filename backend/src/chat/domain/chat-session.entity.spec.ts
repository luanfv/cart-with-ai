import { ChatMessageEntity } from './chat-message.entity';

describe('ChatMessageEntity unit tests', () => {
  describe('WHEN call the ChatMessageEntity restore', () => {
    const expectedId = 'msg-1';
    const expectedChatSessionId = 'chat-1';
    const expectedContent = 'Hello!';
    const expectedSender = 'user';
    const expectedCreatedAt = new Date('2024-01-01T10:00:00Z');
    const expectedMessageType = 'text';
    const expectedOpenAiMessageId = 'openai-123';

    const message = ChatMessageEntity.restore(
      expectedId,
      expectedChatSessionId,
      expectedContent,
      expectedSender,
      expectedCreatedAt,
      expectedMessageType,
      expectedOpenAiMessageId,
    );

    it('SHOULD restore with correct id', () => {
      expect(message.id).toEqual(expectedId);
    });

    it('SHOULD restore with correct content', () => {
      expect(message.values.content).toEqual(expectedContent);
    });

    it('SHOULD restore with correct sender', () => {
      expect(message.values.sender).toEqual(expectedSender);
    });

    it('SHOULD restore with correct createdAt', () => {
      expect(message.values.createdAt).toEqual(expectedCreatedAt);
    });

    it('SHOULD restore with correct messageType', () => {
      expect(message.values.messageType).toEqual(expectedMessageType);
    });

    it('SHOULD restore with correct openAiMessageId', () => {
      expect(message.values.openAiMessageId).toEqual(expectedOpenAiMessageId);
    });
  });

  describe('WHEN call the ChatMessageEntity create', () => {
    const expectedContent = 'Hello!';
    const expectedSender = 'user';
    const expectedMessageType = 'text';
    const expectedOpenAiMessageId = 'openai-123';

    const message = ChatMessageEntity.create(
      expectedContent,
      expectedSender,
      expectedMessageType,
      expectedOpenAiMessageId,
    );

    it('SHOULD create with correct content', () => {
      expect(message.values.content).toEqual(expectedContent);
    });

    it('SHOULD create with correct sender', () => {
      expect(message.values.sender).toEqual(expectedSender);
    });

    it('SHOULD create with correct messageType', () => {
      expect(message.values.messageType).toEqual(expectedMessageType);
    });

    it('SHOULD create with correct openAiMessageId', () => {
      expect(message.values.openAiMessageId).toEqual(expectedOpenAiMessageId);
    });

    it('SHOULD create with undefined chatSessionId', () => {
      expect(message.values.chatSessionId).toEqual(undefined);
    });
  });
});
