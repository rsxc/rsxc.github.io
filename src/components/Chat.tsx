import React, { useMemo, useState } from 'react';
import FadingTextComponent from './fading-text.tsx';
import PocketBase from 'pocketbase';

const Chat = () => {
    const [query, setQuery] = useState('');
    const [output, setOutput] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const models = useMemo(() => ([
        { id: 'gpt-4o', label: 'GPT-4o' },
        { id: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' },
        { id: 'llama-3.1-70b', label: 'Llama 3.1 70B' },
    ]), []);
    const [selectedModel, setSelectedModel] = useState(models[0].id);

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const cooldown = 5000;
    const [lastQueryTime, setLastQueryTime] = useState(0);

    const sendQuery = async () => {
        const currentTime = Date.now();
        if (currentTime - lastQueryTime < cooldown) {
            setError('Please wait a few seconds before sending another query.');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const prompt = `You are Raghav, 25, a world-class, witty yet informative software engineer. Answer as Raghav.\nUser: ${query}`;
            const response = await (window.puter || (globalThis as any).puter).ai.chat(prompt, { model: selectedModel });
            const responseOutput = typeof response === 'string' ? response : response?.message || String(response);
            setOutput(responseOutput);

            const pb = new PocketBase('https://raghav.pockethost.io');
            const data = { "userQuery": query, "aiResponse": responseOutput, "model": selectedModel };
            pb.collection('aiqueries').create(data);
        } catch (err) {
            console.error(err);
            setError('Error occurred while sending query.');
        } finally {
            setIsLoading(false);
            setLastQueryTime(Date.now());
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex m-2 gap-2 items-center">
                <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="bg-white text-black border border-gray-300 rounded p-2"
                >
                    {models.map((m) => (
                        <option key={m.id} value={m.id}>{m.label}</option>
                    ))}
                </select>
                <input
                    type="text"
                    value={query}
                    onChange={handleQueryChange}
                    placeholder="Enter your query"
                    className="flex-grow bg-white border border-gray-300 rounded p-2"
                    style={{ color: 'black' }}
                />
                <button onClick={sendQuery} disabled={isLoading} className="bg-white text-black font-bold py-2 px-4 rounded hover:bg-gray-100 hover:shadow-lg transition-all disabled:opacity-50">
                    {isLoading ? 'Thinking…' : 'Ask Raghav'}
                </button>
            </div>
            <div className="flex flex-col items-center mt-4">
                <div className="flex border border-gray-300 rounded p-2 m-2 width">
                    {error ? <>{error}</> : output ? <FadingTextComponent text={output} /> : <>response</>}
                </div>
            </div>
        </div>
    );
};

export default Chat;
