// react
import { ReactNode, useEffect } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

// yup & react-user-form
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// react-multi-date-picker
import { DateObject } from 'react-multi-date-picker';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';

// utils
import { attendeeSchema, startDateSchema } from '@src/utils/schema';
import { formatDateTimeParts } from '@src/utils/dateConvertor';

// types
import { IHelper } from '@src/@types/helper';
import { IAttendee } from '@src/@types/calendarEvent';
import { EventInput } from '@fullcalendar/core';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import TimePicker from '@src/components/TimePicker';
import SearchInput from '@src/components/user/calendar/SearchInput';
import Modal from '@src/components/Modal';

interface IProps {
  children?: ReactNode;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
  selectedDate: {
    start: string | null;
    end: string | null;
  };
  onFormSubmit: (data: EventInput, isEdit?: boolean) => void;
  setSelectedHelper: React.Dispatch<React.SetStateAction<IAttendee | null>>;
  selectedHelper: IAttendee | null;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEventId: string;
}

interface IFormInputs {
  attendee: IHelper | null;
  startDate: string;
  // endDate: string;
}

const AddEventModal: React.FC<IProps> = ({
  modalOpen,
  selectedDate,
  setModalOpen,
  onFormSubmit,
  setSelectedHelper,
  selectedHelper,
  isEdit,
  setIsEdit,
  selectedEventId,
}) => {
  const router = useRouter();
  const { t } = useTranslation('user') as any;

  const user = selectedHelper;
  const { helperId } = router.query;

  const schema = isEdit
    ? yup.object({
        startDate: startDateSchema,
        // endDate: endDateSchema,
      })
    : yup
        .object({
          attendee: attendeeSchema,
          startDate: startDateSchema,
          // endDate: endDateSchema,
        })
        .required();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      // endDate: new Date().toISOString(),
      startDate: new Date().toISOString(),
      attendee: null,
    },
  });
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    // console.log(data);
    onFormSubmit(
      {
        id: isEdit ? selectedEventId : new Date().toString(),
        title: isEdit
          ? `${t('meetingWith')} ${user?.firstName} ${user?.lastName}`
          : `${t('meetingWith')} ${data.attendee?.firstName} ${data.attendee?.lastName}`,
        start: data.startDate,
        end: new Date(Date.parse(data.startDate) + 45 * 60000).toISOString(),
        extendedProps: {
          attendee: isEdit ? user : data.attendee,
        },
      },
      isEdit
    );
  };

  useEffect(() => {
    if (selectedDate.start) {
      reset({ startDate: selectedDate.start, attendee: null });
    }
  }, [selectedDate.start]);

  const {
    date: selectedDateStart,
    time: selectedTimeStart,
    weekday: selectedDateWeekday,
  } = formatDateTimeParts(watch('startDate'), router.locale || '');

  return (
    <Modal
      open={modalOpen}
      setOpen={setModalOpen}
      onClose={() => {
        if (!helperId) {
          setSelectedHelper(null);
          setIsEdit(false);
        }
      }}>
      <form className="flex flex-col gap-5 pt-5 w-full" onSubmit={handleSubmit(onSubmit)}>
        <Typography textTransform="first-letter-capital">
          {isEdit
            ? `${t('meetingWith')} ${user?.firstName} ${user?.lastName}`
            : `${t('scheduleAMeeting')}:`}
        </Typography>

        {!isEdit && (
          <SearchInput
            onChange={(user) => setValue('attendee', user)}
            selectedItem={watch('attendee')}
            errorText={errors.attendee?.message}
            error={errors.attendee?.message !== undefined}
          />
        )}
        <TimePicker
          label={
            <Typography variant="body2" fontweight="book">
              {t('startTime')}
            </Typography>
          }
          value={watch('startDate')}
          onChange={(date) => {
            const newDate = new DateObject(date as any);
            newDate.convert(gregorian, gregorian_en);
            setValue('startDate', new Date(newDate as any).toISOString());
          }}
          isRange={false}
          id="time-picker-start"
          errorText={errors.startDate?.message}
          error={errors.startDate?.message !== undefined}
        />
        <div className="flex flex-col gap-2">
          <Typography variant="caption">{t('selectedDate')}:</Typography>
          <Typography variant="caption">
            {selectedDateStart.day} {selectedDateStart.month} {selectedDateStart.year} (
            {selectedDateWeekday})
          </Typography>
          <Typography variant="caption">{t('selectedTime')}:</Typography>
          <Typography variant="caption">
            {selectedTimeStart.hour}:{selectedTimeStart.minute} {selectedTimeStart.period}
          </Typography>
        </div>
        {/* <TimePicker
          // onlyTime={false}
          label={
            <Typography variant="body2" fontweight="book">
              {t('endDate')}
            </Typography>
          }
          // {...register('dateEnd')}
          value={getValues('endDate')}
          onChange={(date) => {
            const newDate = new DateObject(date as any);
            newDate.convert(gregorian, gregorian_en);
            setValue('endDate', new Date(newDate as any).toISOString());
          }}
          isRange={false}
          id="time-picker-start"
          selectedDate={selectedDate}
          errorText={errors.endDate?.message}
          error={errors.endDate?.message !== undefined}
        /> */}

        <Button color="green" className="mt-4" type="submit">
          {isEdit && !helperId ? t('editMeeting') : t('addMeeting')}
        </Button>
      </form>
    </Modal>
  );
};

export default AddEventModal;
