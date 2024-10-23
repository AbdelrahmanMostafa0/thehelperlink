// react
import React, { ReactNode, useEffect, useState, useRef } from 'react';

// next js
import { useRouter } from 'next/router';

// react date picker
import { Calendar, DateObject } from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/colors/green.css';
import arabic from 'react-date-object/calendars/arabic';
import arabic_ar from 'react-date-object/locales/arabic_ar';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import { startOfWeek, endOfWeek } from 'date-fns';

// full calendar
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// react-query
import { useQuery } from 'react-query';

// i18next
import { useTranslation } from 'next-i18next';

// types
import EventModal from './EventModal';
import { IAttendee, IEvent, IMeeting } from '@src/@types/calendarEvent';
import { EventSourceInput } from '@fullcalendar/core';

// icons
import { CloseV2, Plus } from '@src/assets/icons';

// utils
import { normalizeEvent } from '@src/utils/normalizeEvents';
import { IHelper } from '@src/@types/helper';

// lodash
import _ from 'lodash';

// zustand store
import { useUserStore } from '@src/zustand_stores/user';

// api
import { getSingleHelper } from '@src/api/GET/getHerlpers';
import { deleteEvent } from '@src/api/DELETE/deleteEvent';
import { editEvent } from '@src/api/PUT/editEvent';
import { addEvent } from '@src/api/POST/addEvent';
import { getMyMeetings } from '@src/api/GET/getMeetings';

// components
import Typography from '@src/components/Typography';
import AddEventModal from '@src/components/user/calendar/AddEventModal';
import CloseEventCard from './CloseEventsCard';

interface IProps {
  children?: ReactNode;
}

const HelperCalendar: React.FC<IProps> = ({}) => {
  const router = useRouter();
  const { t } = useTranslation('user');
  const isArabic = router.locale === 'ar-SA';
  const calendarRef = useRef<FullCalendar>(null);
  const [selectedDate, setSelectedDate] = useState<{ start: string | null; end: string | null }>({
    start: null,
    end: null,
  });
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isEventClicked, setIsEventClicked] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [calendarValue, setCalendarValue] = useState<DateObject | DateObject[] | null>(
    new DateObject()
  );
  const [selectedHelper, setSelectedHelper] = useState<IAttendee | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string>('');

  const { helperId } = router.query;
  const { userState } = useUserStore((state) => state);
  const editable = userState?.userType === 'employer';

  // fetch upcoming events
  const {
    data: myUpcomingMeetings,
    isIdle: isIdleMyUpcomingMeetings,
    isLoading: isFetchingMyUpcomingMeetings,
    refetch: refetchMyUpcomingMeetings,
  } = useQuery<any[]>(['get-my-upcoming-meetings'], () => getMyMeetings());

  const today = new Date()?.toISOString();
  const [selectedWeek, setSelectedWeek] = useState({
    from: startOfWeek(new Date(today)),
    to: endOfWeek(new Date(today)),
  });

  // fetch selected week events
  const { data: weekEvents, refetch: refetchWeekEvents } = useQuery<IMeeting[]>(
    ['get-week-event', selectedWeek.to, selectedWeek.from],
    () => getMyMeetings(selectedWeek.from.toISOString(), selectedWeek.to.toISOString()),
    {}
  );

  // fetch seleted Helper
  const { data: singleHelperData } = useQuery<IHelper>(
    ['single-helper', helperId, router.locale],
    () => getSingleHelper((helperId as string) || '', router.locale),
    {
      enabled: helperId !== undefined,
    }
  );

  useEffect(() => {
    const handleLocaleChange = () => {
      window.location.reload();
    };
    router.events.on('routeChangeComplete', handleLocaleChange);

    return () => {
      router.events.off('routeChangeComplete', handleLocaleChange);
    };
  }, [router.locale]);

  const handleChangeDate = (value: DateObject | DateObject[] | null) => {
    const selectedDate = new Date(value as any)?.toISOString();

    // set selected week
    const firstDayOfWeek = startOfWeek(new Date(selectedDate));
    const lastDayOfWeek = endOfWeek(new Date(selectedDate));
    setSelectedWeek({ from: firstDayOfWeek, to: lastDayOfWeek });

    setCalendarValue(value);
    if (calendarRef.current && value) {
      calendarRef.current.getApi().gotoDate(selectedDate);
    }
  };

  const handleClickEvent = (event: IEvent) => {
    setSelectedEventId(event.id);
    setSelectedHelper(event.extendedProps.attendee);
    setSelectedDate({
      end: new Date(event.end as any)?.toISOString(),
      start: new Date(event.start as any)?.toISOString(),
    });
    setIsEventClicked(true);
    setModalOpen(true);
  };

  useEffect(() => {
    if (helperId) {
      setSelectedHelper({
        firstName: singleHelperData?.firstName || '',
        lastName: singleHelperData?.lastName || '',
        id: singleHelperData?.id || 0,
        profileImage: singleHelperData?.profileImage?.url || '',
      });
      setIsEdit(true);
    }
  }, [singleHelperData]);

  return (
    <>
      <div className="w-full flex justify-end">
        <div className="w-full flex gap-9 max-w-7xl smd:flex-col">
          <div className="flex flex-col gap-6 w-auto sm:w-[360px] pt-6">
            {/* selected helper or schedule new meeting */}
            {editable && (
              <div
                tabIndex={helperId ? undefined : 0}
                role={helperId ? undefined : 'button'}
                aria-label={helperId ? '' : 'schedule a meeting'}
                onClick={() => {
                  if (!helperId) {
                    setSelectedDate({
                      start: new Date(new Date().getTime()).toISOString(),
                      end: new Date(new Date().getTime() + 1000 * 60 * 60 * 1).toISOString(),
                    });
                    setModalOpen(true);
                  }
                }}
                className={`flex flex-col gap-3 px-4 py-3 rounded-md bg-lightGreen-100 w-full relative ${
                  helperId ? '' : 'cursor-pointer'
                }`}>
                {helperId && (
                  <span
                    tabIndex={0}
                    role="button"
                    aria-label="close modal"
                    onClick={() => {
                      setSelectedHelper(null);
                      setIsEdit(false);
                      router.push(router.pathname, undefined, { shallow: true, scroll: false });
                    }}>
                    <CloseV2 className="w-4 h-4 absolute top-1 right-1" />
                  </span>
                )}
                {helperId ? (
                  <Typography variant="caption">
                    {t('pleaseSetTheMeetingFor')} {selectedHelper?.firstName}{' '}
                    {selectedHelper?.lastName} ({t('chooseYourDesiredDate')}){' '}
                  </Typography>
                ) : (
                  <div className="w-full flex justify-between gap-3 flex-wrap items-center text-lightGreen-500">
                    <Typography variant="caption">{t('scheduleAMeeting')}</Typography>
                    <span className="p-1 rounded-full border-2 border-lightGreen-500">
                      <Plus className="w-3 h-3 [&>path]:stroke-2 stroke-current" />
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col smd:flex-col-reverse w-full gap-6">
              <div
                className={`customCalendarFullWidth calendar-helper min-h-[auto] sm:min-h-[346px] ${
                  editable ? 'calendar-employer' : 'calendar-helper'
                }`}>
                {/* calendar */}
                <Calendar
                  className="h-full green !shadow-none"
                  calendar={isArabic ? arabic : gregorian}
                  locale={isArabic ? arabic_ar : gregorian_en}
                  value={calendarValue ? new Date(calendarValue as any)?.toISOString() : undefined}
                  onChange={(value) => handleChangeDate(value)}
                />
              </div>
              {/* upcoming events */}
              <div className="flex flex-col gap-6">
                <Typography variant="body2">{t('upcomingMeetingsToday')}</Typography>
                <div className="flex flex-col gap-3">
                  {isIdleMyUpcomingMeetings || isFetchingMyUpcomingMeetings ? (
                    Array.from(Array(3).keys()).map((val) => (
                      <div
                        key={val}
                        className="min-w-full min-h-[80px] rounded-md bg-darkBlue-100 animate-pulse"
                      />
                    ))
                  ) : myUpcomingMeetings && myUpcomingMeetings?.length > 0 ? (
                    normalizeEvent(myUpcomingMeetings || [], editable, t)?.map((event) => (
                      <CloseEventCard
                        key={event.id}
                        event={event}
                        onClick={() => handleClickEvent(event)}
                      />
                    ))
                  ) : (
                    <Typography variant="caption">{t('noUpcomingMeetings')}</Typography>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* full calendar */}
          <div
            className={`w-full md:w-[calc(100%-360px)] ${
              editable ? 'employer-full-calendar' : 'helper-full-calendar'
            }`}>
            <FullCalendar
              locale={router.locale}
              direction={router.locale === 'ar-SA' ? 'rtl' : 'ltr'}
              eventMinWidth={60}
              height="100vh"
              // dayMinWidth={470}
              contentHeight="100vh"
              customRenderingReplacesEl
              viewClassNames="bg-customBackground"
              eventClassNames={(args) => {
                const { event } = args;
                const accepted = event.extendedProps.attendee.accepted;
                return `cursor-pointer flex flex-col rounded !shadow-none overflow-hidden relative after:absolute after:top-0 after:left-0 after:w-[2px] after:min-h-full after:rounded-tl-full after:rounded-bl-full ltr:pl-1 rtl:pr-1 ${
                  accepted
                    ? 'border-none'
                    : editable
                    ? 'after:hidden border border-lightGreen-500'
                    : 'after:hidden border border-darkOrange-500'
                } ${
                  accepted
                    ? editable
                      ? 'bg-lightGreen-100 after:bg-lightGreen-500'
                      : 'after:bg-darkOrange-500 bg-darkOrange-100'
                    : 'bg-transparent'
                }`;
              }}
              slotLabelClassNames="text-[#71717A] !border-none"
              ref={calendarRef}
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                // left: 'prev,next today',
                // center: 'title',
                // right: 'dayGridMonth,timeGridWeek',
                left: undefined,
                center: undefined,
                right: undefined,
              }}
              views={{
                timeGridWeek: {
                  type: 'timeGridWeek',
                  slotLabelContent: (props) => {
                    const { date } = props;
                    const formattedDate = date.toLocaleTimeString(router.locale, {
                      hour: 'numeric',
                      minute: undefined,
                      hour12: true,
                    });

                    return (
                      <Typography
                        variant="caption"
                        className="text-[#71717A] uppercase"
                        fontweight="medium">
                        {formattedDate}
                      </Typography>
                    );
                  },
                  dayHeaderContent: (args) => {
                    return (
                      <div
                        className="flex flex-col-reverse gap-2 cursor-pointer"
                        // onClick={() => {
                        //   if (calendarRef.current && args) {
                        //     calendarRef.current.getApi().changeView('timeGridDay', args.date);
                        //   }
                        // }}
                      >
                        <Typography variant="body2" className="text-[#71717A] uppercase">
                          {args.date.toLocaleString(router.locale, {
                            day: 'numeric',
                          })}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="text-[#71717A] uppercase ssm:text-caption sxs:text-[10px]
                        ">
                          {args.date.toLocaleString(router.locale, {
                            weekday: 'short',
                          })}
                        </Typography>
                      </div>
                    );
                  },

                  dayHeaderFormat: {
                    day: 'numeric',
                    weekday: 'short',
                    month: undefined,
                    omitCommas: true,
                  },
                },
              }}
              eventAllow={() => {
                return editable; // Disable/enable dragging
              }}
              initialView="timeGridWeek"
              allDaySlot={false}
              nowIndicator={true}
              editable={editable}
              selectable={editable}
              droppable={editable}
              events={normalizeEvent(weekEvents || [], editable, t)}
              // initialEvents={events}
              eventContent={(props) => {
                const { event } = props;
                const { title, start, end, extendedProps } = event;
                const formattedDateStart = new Date(start as any)?.toLocaleTimeString(
                  router.locale,
                  {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  }
                );
                const formattedDateEnd = new Date(end as any)?.toLocaleTimeString(router.locale, {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                });
                return (
                  <div className="flex flex-col">
                    <Typography
                      fontweight="heavy"
                      className={`!text-[12px] leading-[16px] ${
                        editable ? 'text-lightGreen-500 ' : 'text-darkOrange-500 '
                      }`}>
                      {title}
                    </Typography>
                    <Typography
                      className={`!text-[12px] leading-[16px] whitespace-nowrap ${
                        editable ? 'text-lightGreen-500' : 'text-darkOrange-500'
                      }`}>
                      {formattedDateStart} - {formattedDateEnd}
                    </Typography>
                  </div>
                );
              }}
              eventClick={(info) => handleClickEvent(info.event as any)}
              // add event when click on calendar
              select={(info) => {
                setSelectedDate({
                  start: new Date(info.start as any)?.toISOString(),
                  end: new Date(info.end as any)?.toISOString(),
                });
                setModalOpen(true);
              }}
              eventDrop={(info) => {
                editEvent(
                  new Date(info.event.start as any)?.toISOString(),
                  new Date(info.event.end as any)?.toISOString(),
                  Number(info.event.id),
                  router,
                  t
                ).then((res) => {
                  refetchWeekEvents();
                  refetchMyUpcomingMeetings();
                });
              }}
              eventResize={(info) => {
                editEvent(
                  new Date(info.event.start as any)?.toISOString(),
                  new Date(info.event.end as any)?.toISOString(),
                  Number(info.event.id),
                  router,
                  t
                ).then((res) => {
                  refetchWeekEvents();
                  refetchMyUpcomingMeetings();
                });
              }}
            />
          </div>
        </div>
      </div>
      {isEventClicked ? (
        <EventModal
          setIsEventClicked={setIsEventClicked}
          selectedEventId={selectedEventId}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          selectedHelper={selectedHelper}
          selectedDate={selectedDate}
          onAcceptEvent={() => {
            refetchMyUpcomingMeetings();
            refetchWeekEvents().then(({ data }) => {
              setSelectedHelper(
                normalizeEvent(data || [], editable, t).find(
                  (event) => event.id === selectedEventId
                )?.extendedProps.attendee || null
              );
            });
          }}
          onEdit={(eventData) => {
            setIsEventClicked(false);
            setIsEdit(true);
            setSelectedDate({ start: eventData.start, end: eventData.end });
          }}
          onRemove={() => {
            if (calendarRef.current && selectedHelper) {
              deleteEvent(Number(selectedEventId), router, t).then((res) => {
                refetchWeekEvents();
                refetchMyUpcomingMeetings();
                setSelectedHelper(null);
                setSelectedDate({ end: null, start: null });
                setModalOpen(false);
                setIsEventClicked(false);
              });
            }
          }}
        />
      ) : (
        <AddEventModal
          selectedEventId={selectedEventId}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setSelectedHelper={setSelectedHelper}
          selectedHelper={selectedHelper}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          selectedDate={selectedDate}
          onFormSubmit={(newEvent, isEdit) => {
            if (calendarRef.current && newEvent) {
              if (isEdit && !helperId) {
                editEvent(
                  newEvent.start as string,
                  newEvent.end as string,
                  Number(newEvent.id) || 0,
                  router,
                  t
                ).then((_) => {
                  refetchWeekEvents();
                  refetchMyUpcomingMeetings();
                  setSelectedHelper(null);
                  setIsEdit(false);
                  setModalOpen(false);
                });
              } else {
                addEvent(
                  newEvent.start as string,
                  newEvent.end as string,
                  newEvent.extendedProps?.attendee.id,
                  router,
                  t
                ).then((_) => {
                  refetchWeekEvents();
                  refetchMyUpcomingMeetings();
                  setModalOpen(false);
                  if (helperId) {
                    router.push(router.pathname, undefined, { shallow: true, scroll: false });
                  }
                });
              }
            }
          }}
        />
      )}
    </>
  );
};

export default HelperCalendar;
