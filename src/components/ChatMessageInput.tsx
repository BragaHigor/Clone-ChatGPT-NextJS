import { useEffect, useRef, useState } from "react"
import IconSend from "./icons/iconSend"

type Props = {
    disabled: boolean,
    onSend: (message: string) => void
}

export const ChatMessageInput = ({ disabled, onSend }: Props) => {

    const [text, setText] = useState('')
    const textEl = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {

        if(textEl.current) {
            textEl.current.style.height = '0px'
            let scrollHeight = textEl.current.scrollHeight
            textEl.current.style.height = scrollHeight + 'px'
        }

    }, [text, textEl])

    const handleSendMessage = () => {
       
        if(!disabled && text.trim() !== ""){
            onSend(text)
            setText('')
        }
    }

    const handleTextKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {

        if(event.code.toLowerCase() === 'enter' && !event.shiftKey) {
            event.preventDefault()
            handleSendMessage()
        }

    }

    return (

        <div className={` text-white flex border border-gray-800/50 bg-gpt-lightgray p-2 rounded-md
        ${disabled && 'opacity-50'}`}>

            <textarea className="flex-1 border-0 bg-transparent resize-none outline-none h-7 max-h48 overflow-y-auto"
                ref={textEl}
                placeholder="Digite uma mensagem"
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyUp={handleTextKeyUp}
                disabled={disabled}
            >
                
            </textarea>

            <div className={`self-end p-1 cursor-pointer rounded 
                ${text.length ? 'opacity-100 hover:bg-black/20' : 'opacity-20'}`}
                onClick={handleSendMessage} 
            >
                <IconSend width={14} height={14}/>
            </div>

        </div>

    )
}