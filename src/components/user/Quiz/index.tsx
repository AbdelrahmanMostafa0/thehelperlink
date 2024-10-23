// react
import { ReactNode, useEffect, useState, useRef } from 'react';

import _ from 'lodash';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

// types
import { IQuiz } from '@src/@types/quiz';

// zustand store
import { useQuizesStore } from '@src/zustand_stores/quizStore';
import { ROUTES_URL } from '@src/routes';

// utils
import { notify } from '@src/utils/notify';

// API
import { submitAnswers } from '@src/api/POST/submitAnswer';
import { updateAnswer } from '@src/api/PUT/updateAnswer';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import BreadCrumb from '@src/components/BreadCrumb';
import Spinner from '@src/components/Spinner';

interface IProps {
  children?: ReactNode;
  quizes: IQuiz[];
}

const Quiz: React.FC<IProps> = ({ quizes }) => {
  const router = useRouter();
  const { t } = useTranslation('user');
  const [stage, setStage] = useState(0);
  const [quizesList, setQuizesList] = useState<IQuiz[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const isSubmitted = useQuizesStore((state) => state.isSubmitted);
  const [isLoading, setIsLoading] = useState(false);
  const [init, setInit] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);

  const handleChooseAnswer = (answer: string) => {
    const newList = _.cloneDeep(selectedAnswers);
    newList[stage] = answer;
    setSelectedAnswers(newList);
  };

  useEffect(() => {
    setQuizesList(quizes);
  }, [quizes]);

  useEffect(() => {
    if (quizesList.length > 0 && init) {
      // calculate the initial stage, check every question if it has an answer array with length > 0 and choose the first one that has not asnwered yet and set the stage to it
      const initialStage = quizesList.findIndex((quiz) => quiz.answers.length === 0);
      if (initialStage !== -1) {
        setStage(initialStage);
      } else {
        // if all questions are answered then set the stage to the last question
        setStage(0);
      }
      setInit(false);
    }
  }, [quizesList, init]);

  const handleNext = () => {
    // if the user choose an answer and it is not the same as the one that is already saved in the db then update the answer
    if (selectedAnswers[stage] && selectedAnswers[stage] !== quizesList[stage].answers[0]?.answer) {
      if (quizesList[stage].answers.length > 0) {
        setIsLoading(true);
        updateAnswer(quizesList[stage].answers[0].id || 0, selectedAnswers[stage] || '')
          .then((res) => {
            if (res?.status === 200) {
              setIsLoading(false);

              // add the id of the answer to the quizesList
              const newList = _.cloneDeep(quizesList);
              newList[stage].answers = [{ id: res.data.id, answer: res.data.attributes.answer }];
              setQuizesList(newList);
              if (stage !== quizesList.length - 1) {
                setStage((prev) => prev + 1);
                // headerRef.current?.scrollIntoView({ behavior: 'smooth' });
              } else {
                notify({
                  message: t('thankYouForYourAsnwers'),
                  type: 'success',
                  hideProgressBar: true,
                  router: router,
                });
                setTimeout(() => {
                  router.push(ROUTES_URL.navRoutes.user.profile);
                }, 3000);
              }
            }
          })
          .catch((err) => {
            setIsLoading(false);
          });
      } else {
        setIsLoading(true);

        submitAnswers(quizesList[stage].id, selectedAnswers[stage] || '')
          .then((res) => {
            setIsLoading(false);
            if (res?.status === 200) {
              // add the id of the answer to the quizesList
              const newList = _.cloneDeep(quizesList);
              newList[stage].answers = [{ id: res.data.id, answer: res.data.attributes.answer }];
              setQuizesList(newList);
              if (stage !== quizesList.length - 1) {
                setStage((prev) => prev + 1);
                // headerRef.current?.scrollIntoView({ behavior: 'smooth' });
              } else {
                notify({
                  message: t('thankYouForYourAsnwers'),
                  type: 'success',
                  hideProgressBar: true,
                  router: router,
                });
                setTimeout(() => {
                  router.push(ROUTES_URL.navRoutes.user.profile);
                }, 3000);
              }
            }
          })
          .catch((err) => {
            setIsLoading(false);
          });
      }
    } else {
      if (stage !== quizesList.length - 1) {
        setStage((prev) => prev + 1);
        // headerRef.current?.scrollIntoView({
        //   behavior: 'smooth',
        // });
      } else {
        notify({
          message: t('thankYouForYourAsnwers'),
          type: 'success',
          hideProgressBar: true,
          router: router,
        });
        setTimeout(() => {
          router.push(ROUTES_URL.navRoutes.user.profile);
        }, 3000);
      }
    }
  };

  const handlePrev = () => {
    setStage((prev) => prev - 1);
  };

  return (
    <div ref={headerRef} className="w-full max-w-7xl mx-auto flex flex-col pt-12 pb-16 px-5">
      <BreadCrumb
        routesList={[
          { name: t('profile'), url: ROUTES_URL.navRoutes.user.profile, isLink: true },
          { name: t('takeTheQuiz'), isLink: false, url: '' },
        ]}
        className="mb-10"
      />
      <Typography variant="h3" className="mb-8">
        {t('completeYourProfile')}
      </Typography>
      {/* question section */}
      <div className="w-full flex flex-col bg-lightGreen-100 gap-1 px-4 py-9">
        <Typography>
          {t('question')}
          {(stage + 1).toLocaleString(router.locale)}.
        </Typography>
        <Typography textTransform="first-letter-capital">{quizesList[stage]?.question}</Typography>
      </div>
      {/* answers section */}
      <div className="flex flex-col w-full px-6 py-9 gap-11 bg-white min-h-[304px]">
        {quizesList[stage]?.predefinedAnswers?.map((answer, index) => (
          <div
            onClick={() => handleChooseAnswer(answer)}
            role="button"
            tabIndex={0}
            aria-label={`select ${answer}`}
            key={index}
            className="flex items-center gap-5">
            <span
              className={`min-w-[25px] min-h-[25px] rounded-full border-2 transition-all duration-200 ease-in ${
                (
                  selectedAnswers[stage]
                    ? selectedAnswers[stage] === answer
                    : quizesList[stage].answers[0]?.answer === answer
                )
                  ? 'border-lightGreen-500 bg-lightGreen-100'
                  : 'border-darkGreen-200 bg-transparent'
              }`}
            />
            <Typography textTransform="first-letter-capital">{answer}</Typography>
          </div>
        ))}
      </div>
      {/* bar section  */}
      <div className="h-[10px] min-h-[10px] w-full flex bg-transparent">
        <div
          style={{ width: `${((stage + 1) * 100) / quizesList.length}%` }}
          className="h-full bg-lightGreen-500 transition-all duration-500 ease-in-out"
        />
      </div>
      {/* buttons section  */}
      <div className="flex justify-between w-full items-center flex-wrap gap-5 px-6 sxs:px-3 py-4 bg-white">
        <Typography>
          {(stage + 1).toLocaleString(router.locale)}/
          {quizesList.length.toLocaleString(router.locale)}
        </Typography>
        <div className="flex items-center gap-3 sxs:gap-2">
          {stage > 0 && (
            <Button disabled={isSubmitted} onClick={handlePrev} loadMoreButton back>
              <Typography variant="body2" textTransform="first-letter-capital">
                {t('prev')}
              </Typography>
            </Button>
          )}

          <Button
            disabled={
              (quizesList[stage]?.answers[0] === undefined &&
                selectedAnswers[stage] === undefined) ||
              isLoading
            }
            onClick={handleNext}
            color="green"
            loadMoreButton={!isLoading}
            className="min-w-[127px]">
            <Typography variant="body2" textTransform="first-letter-capital">
              {isLoading ? (
                <Spinner className="w-5 h-5" />
              ) : (
                <Typography variant="body2" textTransform="first-letter-capital">
                  {t('next')}
                </Typography>
              )}
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
