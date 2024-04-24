'use client';


import { type FormEvent, useState, type ChangeEvent } from "react";
import { type ChatCompletionMessage } from "openai/resources/index.mjs";
import { useMutation } from "@tanstack/react-query";
import { generateChatResponse } from "@/utils/actions/tour-actions";
import toast from "react-hot-toast";


function Chat() {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);

    const { mutate: createMessage, isPending } = useMutation({
        mutationFn: (query: ChatCompletionMessage) => generateChatResponse([...messages, query]),
        onSuccess: (data) => {
            if (!data) {
                toast.error('Something went wrong...');
                return;
            }
            setMessages((prevMessages) => [...prevMessages, data])
        }
    })

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const message: ChatCompletionMessage = { role: 'user', content: text };

        // Clear the input field
        setText('');

        // Call the mutation
        createMessage(message)

        setMessages((prevMessages) => [...prevMessages, message])
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setText(value)
    }

    return (
        <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
            <div>
                {messages.map(({ role, content }, index) => {
                    const avatar = role == 'user' ? '👤' : '🤖';
                    const bcg = role == 'user' ? 'bg-base-200' : 'bg-base-100';
                    return (
                        <div
                            key={index}
                            className={` ${bcg} flex py-6 -mx-8 px-8
                               text-xl leading-loose border-b border-base-300`}
                        >
                            <span className='mr-4 '>{avatar}</span>
                            <p className='max-w-3xl'>{content}</p>
                        </div>
                    );
                })}
                {isPending && <span className='loading'></span>}
            </div>
            <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
                <div className="join w-full">
                    <input
                        type="text"
                        placeholder="Add message"
                        className='input input-bordered join-item w-full'
                        value={text}
                        required
                        onChange={onChangeHandler} />
                    <button className='btn btn-primary join-item'
                        type='submit' disabled={isPending}>
                        {isPending ? 'Please wait...' : 'Ask Question'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Chat