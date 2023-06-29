"use client"

import { ChatArea } from "@/components/ChatArea"
import { Header } from "@/components/Header"
import { Sidebar } from "@/components/Sidebar"
import { useEffect, useState } from 'react'
import { Chat } from "../types/Chat"  
import { Footer } from "@/components/Footer"
import { v4 as uuidv4 } from 'uuid'
import { SidebarChatButton } from "@/components/SidebarChatButton"
import { openai } from "@/utils/openai"

const Page =  () => {

  const [sidebarOpened, setSidebarOpened] = useState(false)
  const [AILoading, setAILoading] = useState(false)
  const [chatActive, setChatActive] = useState<Chat>()
  const [chatActiveId, setChatActiveId] = useState<string>('')
  const [chatList, setChatList] = useState<Chat[]>([])

  useEffect(() => {

    setChatActive(chatList.find(item => item.id === chatActiveId))

  }, [chatActiveId, chatList])

  useEffect(() => {

    if(AILoading) getAIResponse()

  }, [AILoading])


  const openSideBar = () => setSidebarOpened(true) 
  const closeSideBar = () => setSidebarOpened(false)

  const getAIResponse = async () => {

      let chatListClone = [...chatList]
      let chatIndex = chatListClone.findIndex(item => item.id === chatActiveId)
      if(chatIndex > -1){
        const response = await openai.generate(
          openai.translateMessages(chatListClone[chatIndex].messages)
        )

        if(response) {
          chatListClone[chatIndex].messages.push({
            id: uuidv4(),
            author: 'ai',
            body: response
          })
        }
      }
      setChatList(chatListClone)
      setAILoading(false)
  }

  const handleClearConversations = () => {

    if(AILoading) return

    setChatActiveId('')
    setChatList([])
  }

  const handleNewChat = () => {

    if(AILoading) return

    setChatActiveId('')
    closeSideBar()
  }

  const handleSendMessage = (message: string) => {

    if(!chatActiveId) {

      let newChatId = uuidv4()
      setChatList([{
        id: newChatId,
        title: message,
        messages: [
          {
            id: uuidv4(),
            author: 'me',
            body: message
          }
        ]
      }, ...chatList])

      setChatActiveId(newChatId)

    } else {

      let chatListClone = [...chatList]
      let chatIndex = chatListClone.findIndex(item => item.id === chatActiveId)
      chatListClone[chatIndex].messages.push({
        id: uuidv4(),
        author: 'me',
        body: message
      })

      setChatList(chatListClone)
    }

    setAILoading(true)

  }

  const handleSelectChat = (id: string) => {
    if(AILoading) return

    let item = chatList.find(item => item.id === id)
    if(item) setChatActiveId(item.id)
    closeSideBar()
  }

  const handleDeleteChat = (id: string) => {
    let chatListClone = [...chatList]
    let chatIndex = chatListClone.findIndex(item => item.id === id)
    chatListClone.splice(chatIndex, 1)
    setChatList(chatListClone)
    setChatActiveId('')
  }

  const handleEditChat = (id: string, newTile: string) => {
    let chatListClone = [...chatList]
    let chatIndex = chatListClone.findIndex(item => item.id === id)
    chatListClone[chatIndex].title = newTile
    setChatList(chatListClone)
   
  }

  return (
    <main className="flex min-h-screen bg-gpt-gray">
      <Sidebar
        open={sidebarOpened}
        onClose={closeSideBar}
        onClear={handleClearConversations}
        onNewChat={handleNewChat}
      >
        {chatList.map(item => (
          <SidebarChatButton 
            key={item.id}
            chatItem={item}
            active={item.id === chatActiveId}
            onClick={handleSelectChat}
            onDelete={handleDeleteChat}
            onEdit={handleEditChat}

          />
        ))} 
      </Sidebar>
      <section className="flex flex-col w-full">
        
        <Header 
          openSideBarClick={openSideBar}
          title={chatActive ? chatActive.title : 'Nova conversa'}
          newChatClick={handleNewChat}
        />

        <ChatArea 
          loading={AILoading}
          chat={chatActive}
        />

        <Footer 
          disabled={AILoading}
          onSendMessage={handleSendMessage}
        />

      </section>
    </main>
  )
}

export default Page