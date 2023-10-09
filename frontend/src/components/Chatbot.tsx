import { useState } from 'react';
import styles from './Chatbot.module.css';
import { FaGraduationCap } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';


export default function Chatbot() {
    const [messages, setMessages] = useState([{role: "assistant", content: "How would you like me to respond?"}]);
    const [userInput, setUserInput] = useState('');
    const [showBot, setShowBot] = useState(false);

    const categories = {
        0: "classes at university", 
        1: "work on their social life at university", 
        2: "applying to and finding internships and jobs from university", 
        3: "possible roommate problems at university", 
        4: "possible romantic or social relationship issues", 
        5: "their situation", 
    }

    function getClosestCategory(userMessage) {
        const lowercasedMessage = userMessage.toLowerCase();
        let closestCategoryKey = null;
        let highestMatchCount = 0;

        for (let key in categories) {
            const category = categories[key].toLowerCase();
            const matchCount = category.split(' ').filter(word => lowercasedMessage.includes(word)).length;
            if (matchCount > highestMatchCount) {
                highestMatchCount = matchCount;
                closestCategoryKey = key;
            }
        }

        return categories[closestCategoryKey];
    }

    const sendToOpenAI = async (userMessage) => {
        let payload;
        if (messages.length === 1) {
            payload = {
                model: "gpt-3.5-turbo",
                messages: [
                    ...messages, 
                    {role: "user", content: userMessage},
                    {role: "assistant", content: `You'd like me to respond in a ${userMessage} manner. What are you struggling with?`}
                ],
                max_tokens: 100,
                temperature: 0.8
            };
        } else if (messages.length === 3) {
            const suggestedCategory = getClosestCategory(userMessage);
            const assistantMessage = `Based on your input, I suggest you visit the TreeHouse "${suggestedCategory}". However, I'm here to help with any other concerns you have :)`;
            setMessages(prevMessages => [...prevMessages, {role: "user", content: userMessage}, {role: "assistant", content: assistantMessage}]);
            return; 
        } else {
            payload = {
                model: "gpt-3.5-turbo",
                messages: [
                    ...messages, {role: "user", content: userMessage}
                ],
                max_tokens: 100,
                temperature: 0.8
            };
        }

        const apiEndpoint = "https://api.openai.com/v1/chat/completions";
        const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${(import.meta.env.VITE_OPENAI_API_KEY as string)}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
    
        const data = await response.json();
    
        // Check if the response contains choices and a message content
        if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
            const assistantMessage = data.choices[0].message.content;
            setMessages(messages => [...messages, {role: "user", content: userMessage}, {role: "assistant", content: assistantMessage}]);
        } else {
            console.error("Unexpected response format from OpenAI API:", data);
        }
    };
    

        const handleUserSubmit = (e: { preventDefault: () => void; }) => {
            e.preventDefault();
            sendToOpenAI(userInput);
            setUserInput(''); 
    };


    return (
        <div className={styles.chatbotContainer}>
          {showBot ? (
            <div className={styles.chatWindow}>

            <div className={styles.chatHeader}>
                <div className={styles.centerText}>What are your concerns?</div>
                <div className={styles.closeButtonContainer}>
                    <button className={styles.closeButton} onClick={() => setShowBot(false)}>X</button>
                </div>
            </div>

            <div className={styles.chatMessages}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`${styles.message} ${styles[msg.role]}`}>
                  {msg.role === 'user' ? (
                    <>
                      <h2>
                        <BsPersonFill className="custom-icon" />
                      </h2>
                      <span>{msg.content}</span>
                    </>
                  ) : (
                    <>
                      <h2>
                        <FaGraduationCap className="custom-icon" />
                      </h2>
                      <span>{msg.content}</span>
                    </>
                  )}
                </div>
              ))}
            </div>


            <form className={styles.chatInput} onSubmit={handleUserSubmit}>
            <input
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                placeholder="Type your message..."
            />
            <button className={styles.sendButton} type="submit">Send</button>
            </form>

            </div>
          ) : (
          <button className={styles.chatToggle} onClick={() => setShowBot(true)}>
            Chat with us
          </button>
          )}
        </div>
      );
}