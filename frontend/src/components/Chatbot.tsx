import { useState } from 'react';

export default function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [showBot, setShowBot] = useState(false);

    const categories = {
        0: "classes at university", 
        1: "work on their social life at university", 
        2: "applying to and finding internships and jobs from university", 
        3: "possible roomate problems at univeristy", 
        4: "possible romantic or social relationship issues", 
        5: "their situation", 
    }

    const sendToOpenAI = async (userMessage: string) => {
        const apiEndpoint = "https://api.openai.com/v1/engines/gpt-3.5-turbo/completions";

        const payload = {
        model: "gpt-3.5-turbo",
        messages: [...messages, {role: "user", content: userMessage}],
        max_tokens: 100,
        temperature: 0.8
        };

        const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${(import.meta.env.VITE_OPENAI_API_KEY as string)}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
        });

        const data = await response.json();
        const assistantMessage = data.choices[0].message.content;
        setMessages([...messages, {role: "user", content: userMessage}, {role: "assistant", content: assistantMessage}]);
    };

        const handleSubmit = (e: { preventDefault: () => void; }) => {
            e.preventDefault();
            sendToOpenAI(userInput);
            setUserInput(''); 
    };


    return (
        <div className="chatbot-container">
          {showBot && (
            <div className="chat-window">
              <div className="chat-header">
                Chat with Assistant
                <button onClick={() => setShowBot(false)}>X</button>
              </div>
              <div className="chat-messages">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`message ${msg.sender}`}>
                    {msg.sender === 'user' ? (
                      <img src="/path_to_user_image.png" alt="User" />
                    ) : (
                      <img src="/path_to_bot_image.png" alt="Bot" />
                    )}
                    <span>{msg.content}</span>
                  </div>
                ))}
              </div>
              <form className="chat-input" onSubmit={handleUserSubmit}>
                <input
                  value={userInput}
                  onChange={e => setUserInput(e.target.value)}
                  placeholder="Type your message..."
                />
                <button type="submit">Send</button>
              </form>
            </div>
          )}
          <button className="chat-toggle" onClick={() => setShowBot(true)}>
            Chat with us
          </button>
        </div>
      );
}