import React, { useState } from 'react';
import axios from 'axios';
import FadingTextComponent from './fading-text.tsx';

const Chat = () => {
    const [query, setQuery] = useState('');
    const [output, setOutput] = useState('');
    const apiKey = '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';

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const sendQuery = async () => {
        const prefix = 'respond like you are a boy named Raghav, 25 year old, best software engineer in the world, very funny and informative and always correct and the query is directed to asking a question to Raghav. Be gender neutral. Here is the query,  '
        try {
            const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
                messages: [
                    {
                        role: "user",
                        content: prefix + query
                    }
                ],
                model: "llama3-70b-8192"
            }, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });
            setOutput(response.data.choices[0]?.message?.content || "");
        } catch (error) {
            console.error(error);
            setOutput('Error occurred while sending query.');
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex m-2">
                <input
                    type="text"
                    value={query}
                    onChange={handleQueryChange}
                    placeholder="Enter your query"
                    className="flex-grow bg-white border border-gray-300 rounded p-2"
                    style={{ color: 'black' }}
                />
                <button onClick={sendQuery} className="bg-white text-black font-bold py-2 px-4 rounded hover:bg-gray-100 hover:shadow-lg transition-all">
                    Ask Raghav
                </button>
            </div>
            <div className="flex flex-col items-center mt-4">
                <div className="flex border border-gray-300 rounded p-2 m-2 width">
                    {output ? <FadingTextComponent text={output}/> : <FadingTextComponent text="Loading..."/>}
                </div>
            </div>
        </div>
    );
};

export default Chat;
