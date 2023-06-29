import { Chat } from "../types/Chat"
import { useState } from "react"
import IconChatLeft from "./icons/iconChat"
import IconTrash from "./icons/iconTrash"
import IconEdit3 from "./icons/iconEdit"
import IconClose from "./icons/iconClose"
import IconCheck from "./icons/iconCheck"

type Props = {
    chatItem: Chat,
    active: boolean,
    onClick: (id: string) => void,
    onDelete: (id: string) => void,
    onEdit: (id: string, newTitle: string) => void
}

export const SidebarChatButton = ({ chatItem, active, onClick, onDelete, onEdit}: Props) => {

    const [deleting, setDeleting] =useState(false)
    const [editing, setEditing] = useState(false)
    const [titleInput, setTitleInput] = useState(chatItem.title)

    const handleConfirmButton = () => {
        if(deleting) onDelete(chatItem.id)

        if(editing && titleInput.trim() !== ''){
            onEdit(chatItem.id, titleInput.trim())
        }

        setDeleting(false)
        setEditing(false)
    }

    const handleCancelButton = () => {
        setDeleting(false)
        setEditing(false)
    }

    const handleClickButton = () => {
        if(!deleting || !editing) {
            onClick(chatItem.id)
        }
    }



    return (
        <div onClick={handleClickButton} className={`flex items-center rounded-md p-3 text-sm cursor-pointer hover:bg-gray-500/10
        ${active ? 'bg-gray-500/20' : 'bg-transparent'}`}>

            <div className="mr-3">
                {!deleting && <IconChatLeft width={16} height={16}/>}
                {deleting && <IconTrash width={16} height={16}/>}
            </div>

            <div className="flex-1 text-sm overflow-x-hidden">
                {editing &&
                    <input
                        className="w-full bg-transparent text-sm outline-none border border-blue-500"
                        value={titleInput}
                        onChange={e => setTitleInput(e.target.value)}
                    />
                }
                {!editing && 
                    <div className="border border-transparent truncate">
                        {!deleting && chatItem.title}
                        {deleting && `Delete "${chatItem.title}"`}
                    </div>
                }
            </div>

            {active && !deleting && !editing &&
                <div className="flex">
                    <div className="cursor-pointer mx-1 opacity-60 hover:opacity-100"
                        onClick={() => setEditing(true)}
                    >
                        <IconEdit3 width={16} height={16}/>
                    </div>
                    <div className="cursor-pointer mx-1 opacity-60 hover:opacity-100"
                        onClick={() => setDeleting(true)}
                    >
                        <IconTrash width={16} height={16}/>
                    </div>
                </div>
            }

            {(deleting || editing) && 
                <div className="flex">
                    <div className="cursor-pointer mx-1 opacity-60 hover:opacity-100"
                        onClick={handleConfirmButton}
                    >
                        <IconCheck width={16} height={16}/>
                    </div>
                    <div className="cursor-pointer mx-1 opacity-60 hover:opacity-100"
                        onClick={handleCancelButton}
                    >
                        <IconClose width={16} height={16}/>
                    </div>
                </div>
            }

        </div>
    )

}