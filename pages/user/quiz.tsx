// react
import { ReactNode } from 'react';

// next js
import type { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import Quiz from '@src/components/user/Quiz';

// utils
import { ssrAuthHandler } from '@src/utils/ssrAuthHandler';
import { normalizeQuestions } from '@src/utils/normalizeQuestions';

// react-query
import { dehydrate, QueryClient, useQuery } from 'react-query';

// api
import { getQuestions } from '@src/api/GET/getQuestions';

// types
import { IQuiz } from '@src/@types/quiz';

interface IProps {
  children?: ReactNode;
}

const QuizPage: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const { data: quizes } = useQuery<{ results: IQuiz[] }>(['questions', router.locale], () =>
    getQuestions(router.locale || '')
  );

  return (
    <>
      <Head>
        <title>{t('quiz')}</title>
        <meta name="description" content="quiz" />
      </Head>
      <Quiz quizes={normalizeQuestions(quizes?.results || [], router.locale || '')} />
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();
  const { locale } = ctx;
  let forceLogout = false;
  try {
    await queryClient.fetchQuery<{ results: IQuiz[] }>(['questions'], () =>
      getQuestions(locale || '')
    );
  } catch (error: any) {
    if (error.response?.data?.error?.status === 403) {
      forceLogout = true;
    }
  }

  return ssrAuthHandler({
    ctx,
    props: {
      ...(await serverSideTranslations(locale || '', ['common', 'user'])),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    forceLogout,
  });
};

export default QuizPage;
