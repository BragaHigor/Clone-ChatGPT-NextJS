import { ChatMessage } from "../types/ChatMessage"
import IconUser from "./icons/iconUser"
import IconRobot from "./icons/iconRobot"

type Props ={
    item: ChatMessage
}

export const ChatMessageItem = ({ item }: Props) => {

    return(
        <div className={`py-5 text-white ${item.author === 'ai' && 'bg-gray-600/50'}`}>
            <div className="max-w-4xl m-auto flex">
                <div className={`w-10 h-10 flex justify-center items-center mx-4 md:ml-0 rounded 
                ${item.author === 'ai' ? 'bg-green-900' : 'bg-blue-900'}`}>
                    {item.author === 'me' && <IconUser width={24} height={24}/>}
                    {item.author === 'ai' && <IconRobot width={24} height={24}/>}
                </div>
                <div className="flex-1 text-base whitespace-pre-wrap">
                    {item.body}
                </div>

            </div>
        </div>
    )

}