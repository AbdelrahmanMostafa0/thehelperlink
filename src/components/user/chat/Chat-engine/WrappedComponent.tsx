// next js
import { ReactNode, useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

// i18n next
import { useTranslation } from 'next-i18next';

// chat engine
import {
  ChatEngine,
  getOrCreateChat,
  ChatEngineWrapper,
  ChatList,
  ChatCard,
  ChatHeader,
  ChatEngineContext,
  // @ts-ignore
} from 'react-chat-engine';

// zustand store
import { useUserStore } from '@src/zustand_stores/user';

// icons
import { Search } from '@src/assets/icons';

// api
import { CreateUserChat } from '@src/api/POST/createChatEnigneUser';

// components
import Typography from '@src/components/Typography';
import TextField from '@src/components/TextField';

import { htmlToText } from 'html-to-text';
import { useQuery } from 'react-query';
import { getMyProfile } from '@src/api/GET/getMyProfile';
import { IUser } from '@src/@types/user';

interface IProps {
  children?: ReactNode;
}

const WrappedComponent: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('user') as any;
  const { userState: user, changeUserState } = useUserStore((state) => state);
  const [search, setSearch] = useState('');
  const [userChatCreated, setUserChatCreated] = useState(false);

  const { data: userData } = useQuery(
    ['get-my-profile'],
    () => getMyProfile(undefined, router.locale),
    { enabled: userChatCreated }
  );

  useEffect(() => {
    if (userData) {
      changeUserState(userData as IUser);
    }
  }, [userData]);

  useEffect(() => {
    if (!user?.chatengineUsername) {
      CreateUserChat().then(({ status }) => {
        if (status === 201) {
          setUserChatCreated(true);
        }
      });
    }
  }, [user?.chatengineUsername]);

  useEffect(() => {
    if (router.query['username'] && user?.chatengineUsername) {
      createDirectChat(
        {
          projectID: '46fc07d9-bd76-425a-a779-7b1e86170971',
          userName: user?.chatengineUsername,
          userSecret: window.btoa(user?.chatengineUsername),
        },
        router.query['username'] as string
      );
    }
  }, [router.query, user?.chatengineUsername, userData]);

  function createDirectChat(creds: any, username: string) {
    getOrCreateChat(creds, { is_direct_chat: true, usernames: [username] }, () => {});
  }
  const {
    // @ts-ignore
    conn,
    // @ts-ignore
    activeChat,
    // @ts-ignore
    setActiveChat,
  } = useContext(ChatEngineContext);

  function searchChats(searchString: string) {
    const container = document.querySelectorAll('.ce-chat-card-container .ce-chat-title-text');
    for (let i = 0; i < container.length; i++) {
      container[i].parentElement?.parentElement?.parentElement?.parentElement?.classList.add(
        'hidden'
      );
    }

    for (let i = 0; i < container.length; i++) {
      const toMatch = container[i].children[0].innerHTML.toLowerCase();
      if (toMatch.includes(searchString.toLowerCase())) {
        container[i].parentElement?.parentElement?.parentElement?.parentElement?.classList.remove(
          'hidden'
        );
      }
    }
  }

  function renderChatList(chatAppState: Record<string, any> | undefined) {
    if (!chatAppState) return null;

    return (
      <>
        <div className="w-full items-center flex gap-2 px-3 py-7 bg-white">
          <TextField
            startIcon={<Search className="w-4 h-4 -mt-1" />}
            variant="underline"
            placeholder={t('search')}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              searchChats(e.target.value);
            }}
          />
        </div>

        <ChatList {...chatAppState} />
      </>
    );
  }

  function getDateTime(date: string, offset: number = 0) {
    if (!date) return '';
    date = date.replace(' ', 'T');
    var year = date.substr(0, 4);
    var month = date.substr(5, 2);
    var day = date.substr(8, 2);
    var hour = date.substr(11, 2);
    var minute = date.substr(14, 2);
    var second = date.substr(17, 2);
    var d = new Date(year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second);
    d.setHours(d.getHours() + offset);
    return d;
  }

  function renderChatCard(chat: Record<string, any> | undefined, index: number) {
    if (!chat?.id) {
      return (
        <div key={index} className={'w-full h-[120px] relative flex '}>
          <div className="relative z-10">
            <div className="relative w-[60px] h-[60px] min-w-[60px] min-h-[60px] left-[10px] top-[25px] rounded-full overflow-hidden">
              <Image src="/images/user-avatar.png" alt="avatar" fill className="object-cover" />
            </div>
            {chat?.people?.length > 0 && chat?.people[0]?.person?.is_online && (
              <div className="bg-[#7CDDBD] rounded-full w-[13px] h-[13px] absolute z-10 bottom-[34px] right-[-7px]" />
            )}
          </div>
          <div className="w-full h-full left-0 top-0 absolute ce-chat-card-container">
            <ChatCard chat={chat} />
          </div>
        </div>
      );
    }

    const date = new Date(chat.last_message?.created);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const time = `${hour}:${minute}`;
    // make it 2 digits
    const timeFormatted = time.replace(/\b(\d)\b/g, '0$1');

    const otherPerson = chat?.people?.find((person: Record<string, any>) => {
      return person.person.username !== conn?.userName;
    });
    const title = `${otherPerson?.person?.first_name} ${otherPerson?.person?.last_name}`;
    let lastMessage = htmlToText(chat?.last_message?.text, {});

    if (!lastMessage) {
      lastMessage =
        chat?.last_message?.attachments.length > 0
          ? chat?.last_message?.attachments.length +
            ' image' +
            (chat?.last_message?.attachments.length > 1 ? 's' : '')
          : 'Say hello!';
    }

    function daySinceSent(date: string) {
      if (!date) return '';
      return getDateTime(date).toString().substr(4, 6);
    }

    return (
      <div
        key={index}
        className={'w-full h-[120px] relative flex '}
        onClick={() => setActiveChat(chat.id)}>
        <div className="relative z-10">
          <div className="relative w-[60px] h-[60px] min-w-[60px] min-h-[60px] ltr:left-[10px] ltr:right-unset rtl:right-[10px] rtl:left-unset top-[25px] rounded-full overflow-hidden">
            {otherPerson && otherPerson?.person?.avatar ? (
              <Image src={otherPerson?.person?.avatar} alt="avatar" fill className="object-cover" />
            ) : (
              <Image src="/images/user-avatar.png" alt="avatar" fill className="object-cover" />
            )}
          </div>
          {otherPerson && otherPerson?.person?.is_online && (
            <div className="bg-[#7CDDBD] rounded-full w-[13px] h-[13px] absolute z-10 bottom-[34px] right-[-7px]" />
          )}
        </div>
        {hour && minute ? (
          <p className="absolute text-xs ltr:right-[15px] ltr:left-unset rtl:right-unset rtl:left-[15px] top-[30px] text-[#999999] z-10">
            {timeFormatted}
          </p>
        ) : null}
        <div className="w-full h-full left-0 top-0 absolute ce-chat-card-container">
          <span
            style={{
              display: 'inline-block',
              backfaceVisibility: 'hidden',
              transform: 'translate(0px, 0px) rotate(0deg) scale(1)',
              width: '-webkit-fill-available',
            }}>
            <div
              className={`ce-chat-card ltr:!pl-[85px] rtl:!pr-[85px] ${
                activeChat === chat.id ? 'ce-active-chat-card' : ''
              }`}
              style={{
                padding: '16px 16px 12px',
                cursor: 'pointer',
                backgroundColor: 'rgb(217, 217, 217)',
                border: '0px solid white',
                borderRadius: '12px',
              }}>
              <div
                className="ce-chat-title-text ltr:text-left rtl:text-right"
                id="ce-chat-card-title-4750y8JBrsh744_O7Fg9"
                style={{
                  fontWeight: 500,
                  paddingBottom: '4px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}>
                <div style={{ overflowX: 'hidden', display: 'inline-block' }}>{title}</div>
              </div>
              <div className="ce-chat-subtitle" style={{ width: '100%' }}>
                <div
                  className="ce-chat-subtitle-text ce-chat-subtitle-message ltr:text-left rtl:text-right"
                  style={{
                    width: '75%',
                    color: 'rgb(153, 153, 153)',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    display: 'inline-block',
                  }}>
                  {lastMessage}
                </div>
                <div
                  className="ce-chat-subtitle-text ce-chat-subtitle-date ltr:text-right rtl:text-left"
                  style={{
                    width: '25%',
                    color: 'rgb(153, 153, 153)',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    display: 'inline-block',
                    // textAlign: 'right',
                  }}>
                  {daySinceSent(chat?.last_message?.created)}
                </div>
              </div>
            </div>
          </span>
        </div>
      </div>
    );
  }

  function renderChatHeader(chat: any) {
    const otherPerson = chat?.people?.find((person: Record<string, any>) => {
      return person.person.username !== conn?.userName;
    });

    return (
      <>
        <ChatHeader chat={chat} />

        <div className="bg-[#E5F8F2] h-[100px] flex items-center px-5">
          <div className="w-full h-[60px] flex items-center justify-between px-4">
            <div className="flex items-center gap-7">
              <div className="relative">
                <div className="relative">
                  <div className="relative w-[50px] h-[50px] min-w-[50px] min-h-[50px] rounded-full overflow-hidden">
                    {otherPerson && otherPerson?.person?.avatar ? (
                      <Image
                        src={otherPerson?.person?.avatar}
                        alt="avatar"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Image
                        src="/images/user-avatar.png"
                        alt="avatar"
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
                {otherPerson && otherPerson?.person?.is_online && (
                  <div className="bg-[#7CDDBD] rounded-full w-[11px] h-[11px] absolute z-10 bottom-[1px] right-[1px] hidden cesm:block" />
                )}
              </div>
              <div className="flex flex-col">
                <p>
                  {otherPerson && otherPerson?.person?.first_name && otherPerson?.person?.last_name
                    ? otherPerson?.person?.first_name + ' ' + otherPerson?.person?.last_name
                    : ''}
                </p>
                <p className="rtl:text-right ltr:text-left">
                  {otherPerson && otherPerson?.person?.is_online ? (
                    <span className="text-xs text-[#707070]">{t('active')}</span>
                  ) : (
                    <span className="text-xs text-[#707070]">{t('notActive')}</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  function renderIceBreaker() {
    return (
      <>
        <div className="w-full flex items-center justify-center">
          <Typography variant="caption" className="opacity-50">
            {t('sendMessage')}...
          </Typography>
        </div>
      </>
    );
  }

  return (
    <div className="h-fit ltr:sm:[&_.ce-chat-feed-column]:!ml-[5%] rtl:sm:[&_.ce-chat-feed-column]:!mr-[5%]">
      {user?.chatengineUsername ? (
        <ChatEngine
          height="calc(100vh - 100px)"
          projectID="46fc07d9-bd76-425a-a779-7b1e86170971"
          userName={user?.chatengineUsername}
          userSecret={window.btoa(user?.chatengineUsername)}
          renderChatCard={(chat: Record<string, any>, index: number) => renderChatCard(chat, index)}
          renderChatList={(chatAppState: Record<string, any>) => renderChatList(chatAppState)}
          renderChatHeader={(chat: Record<string, any>) => renderChatHeader(chat)}
          renderIceBreaker={() => renderIceBreaker()}
          offset={3}
        />
      ) : (
        <Typography variant="body2" className="opacity-50">
          {t('loading')}...
        </Typography>
      )}
    </div>
  );
};

export default WrappedComponent;
