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
        height: '60%',
        padding: '20px',
        backgroundColor: '#e9f5ec',
        position: 'absolute',
        bottom: '240px',
        right: '40px',
        borderRadius: '5px'
      }}
    >
      <h2 style={{ color: '#00d66c', borderBottom: '1px solid #00d66c', paddingBottom: '10px' }}>
        <img
          src='data:image/png;base64,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'
          style={{ verticalAlign: 'middle', marginRight: '2px', height: '55px', width: '55px', borderRadius: '50%' }} // Adjusted for better alignment
        />
        AiBot
      </h2>
      <div>
        {loading && <div>Loading...</div>}
        {messages.map(message => (
          <div
            style={{
              backgroundColor: '#25aa46',
              padding: '10px',
              marginBottom: '5px',
              borderRadius: '5px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
            key={message.id}
          >
            {message.content}
          </div>
        ))}
      </div>
      <input
        type='text'
        style={{ height: '10%', position: 'absolute', bottom: '20px', width: '80%', left: '20px', borderRadius: '5px', padding: '10px' }}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder='Type a message...'
      />
      <button type='button' style={{ height: '10%', position: 'absolute', bottom: '20px', right: '20px' }} onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
};

export default ChatWindow;
