import IconAdd from "./icons/iconAdd"
import IconMenu from "./icons/iconMenu"

type Props = {
    openSideBarClick: () => void,
    title: string,
    newChatClick: () => void
}

export const Header = ({ openSideBarClick, title, newChatClick }: Props) => {

    return (
        
        <header className="flex justify-between items-center w-full border-b border-gray-600 p-2 md:hidden">
            
            <div onClick={openSideBarClick} className=" text-white ">
                <IconMenu width={24} height={24}/>
            </div>

            <div className="mx-2 truncate text-white ">
                {title}
            </div>

            <div onClick={newChatClick} className=" text-white ">
                <IconAdd width={24} height={24}/>
            </div>

        </header>
    )

}