// ChatWindow.tsx
import { useState, useEffect } from 'react';

interface Message {
  id: number;
  content: string;
}

const ChatWindow = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [nextId, setNextId] = useState<number>(0);

  const fetchWithRetry = async (input: string) => {
    const maxAttempts = 5;
    const backoffFactor = 2000; // 2 seconds

    const fetchRetry = async (attempts: number): Promise<string> => {
      try {
        const response = await fetch('https://api.netmind.ai/inference-api/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer e9d0da1398bb426585e5353e6e336e7f` // Using the provided API key
          },
          body: JSON.stringify({
            model: 'deepseek-ai/DeepSeek-R1',
            messages: [{ role: 'user', content: input }]
          })
        });

        if (response.ok) {
          const data = await response.json();
          return data.choices[0].message.content; // Return the content for use
        }

        if (response.status === 429 && attempts < maxAttempts) {
          const waitTime = backoffFactor * (attempts + 1); // Exponential backoff
          await new Promise<void>(resolve => {
            setTimeout(resolve, waitTime);
          });
          return await fetchRetry(attempts + 1);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      } catch {
        if (attempts < maxAttempts) {
          return fetchRetry(attempts + 1);
        }
        throw new Error('Max attempts reached');
      }
    };

    return fetchRetry(0);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      setMessages([...messages, { id: nextId, content: inputValue }]);
      setInputValue('');
      setNextId(nextId + 1);
      setLoading(true);

      try {
        const responseContent = await fetchWithRetry(inputValue);
        setMessages(prevMessages => [...prevMessages, { id: nextId, content: responseContent }]);
      } catch {
        // Log error to the user instead of console
        setMessages(prevMessages => [
          ...prevMessages,
          {
            id: nextId,
            content: `Error: Unable to get response from ChatGPT. You have exceeded your quota. Please check your plan and billing details.`
          }
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // Optional: Scroll to the bottom of the chat window when a new message is added
  }, [messages]);

  return (
    <div
      style={{
        width: '20%',
        height: '0%',
        padding: '20px',
        backgroundColor: '#baecc6',
        position: 'absolute',
        bottom: '240px',
        right: '40px',
        borderRadius: '5px'
      }}
    >
      <h2 style={{ color: '#00d66c' }}>AI Boat</h2>
      <div>
        {loading && <div>Loading...</div>}
        {messages.map(message => (
          <div key={message.id}>{message.content}</div>
        ))}
      </div>
      <input type='text' value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder='Type a message...' />
      <button type='button' onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
};

export default ChatWindow;
