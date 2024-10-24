import { Inbox, UserFill, CalendarFill, Briefcase, Bell, HeartFill } from '@src/assets/icons';

type INavRoute = { name: string; url: string; icon?: any };

const ROUTES_URL = {
  //navbar routes
  navRoutes: {
    home: '/',
    vacancies: '/vacancies',
    helpers: '/helpers',
    postAJob: '/post-a-job',
    aboutUs: '/about-us',
    privacy: '/privacy-policy',
    termsAndConditions: '/terms-and-conditions',
    faq: '/faq',
    contactUs: '/contact-us',
    user: {
      profile: '/user/profile',
      dashboard: '/control-system',
      documents: '/user/my-documents',
      quiz: '/user/quiz',
      notification: '/user/my-notifications',
      favorites: '/user/my-favorites',
      myDocuments: '/user/my-documents',
      myInbox: '/user/my-inbox',
      myCalendar: '/user/my-calendar',
      accountSetting: '/user/account-setting',
      candidates: 'user/candidates',
      applications: {
        main: '/user/my-applications',
        removeApplication: '/remove-application',
      },
      jobPosts: {
        main: '/user/my-job-posts',
        candidates: '/candidates',
        removeJobPost: '/remove-job-post',
      },
    },
  },
  // auth routes
  authRoutes: {
    login: '/auth/login',
    register: '/auth/register',
    helperRegister: '/auth/register/helper',
    employerRegister: '/auth/register/employer',
    fotgotPassword: '/auth/forgot-password',
  },
};

// helper user profile links list
const helperProfileLinks: INavRoute[] = [
  { name: 'myBio', url: ROUTES_URL.navRoutes.user.profile, icon: UserFill },
  { name: 'myDocuments', url: ROUTES_URL.navRoutes.user.myDocuments },
  { name: 'myNotifications', url: ROUTES_URL.navRoutes.user.notification, icon: Bell },
  { name: 'myInbox', url: ROUTES_URL.navRoutes.user.myInbox, icon: Inbox },
  { name: 'myCalendar', url: ROUTES_URL.navRoutes.user.myCalendar, icon: CalendarFill },
  { name: 'myFavorites', url: ROUTES_URL.navRoutes.user.favorites, icon: HeartFill },
  { name: 'myAppliedJobs', url: ROUTES_URL.navRoutes.user.applications.main, icon: Briefcase },
];

// employer user profile links list
const employerProfileLinks: INavRoute[] = [
  { name: 'myBio', url: ROUTES_URL.navRoutes.user.profile, icon: UserFill },
  { name: 'myJobsPosts', url: ROUTES_URL.navRoutes.user.jobPosts.main, icon: Briefcase },
  { name: 'myNotifications', url: ROUTES_URL.navRoutes.user.notification, icon: Bell },
  { name: 'Dashboard', url: ROUTES_URL.navRoutes.user.dashboard, icon: null },
  { name: 'myInbox', url: ROUTES_URL.navRoutes.user.myInbox, icon: Inbox },
  { name: 'myCalendar', url: ROUTES_URL.navRoutes.user.myCalendar, icon: CalendarFill },
  { name: 'myFavorites', url: ROUTES_URL.navRoutes.user.favorites, icon: HeartFill },
];

const navRoutes: INavRoute[] = [
  { name: 'home', url: ROUTES_URL.navRoutes.home },
  { name: 'aboutUs', url: ROUTES_URL.navRoutes.aboutUs },
  { name: 'vacancies', url: ROUTES_URL.navRoutes.vacancies },
  { name: 'helpers', url: ROUTES_URL.navRoutes.helpers },
  { name: 'postAJob', url: ROUTES_URL.navRoutes.postAJob },
];

const footerRoutes: { column1: INavRoute[]; column2: INavRoute[] } = {
  column1: [
    { name: 'vacancies', url: ROUTES_URL.navRoutes.vacancies },
    { name: 'postAJob', url: ROUTES_URL.navRoutes.postAJob },
    { name: 'aboutUs', url: ROUTES_URL.navRoutes.aboutUs },
  ],
  column2: [
    { name: 'signIn', url: ROUTES_URL.authRoutes.login },
    { name: 'signUp', url: ROUTES_URL.authRoutes.register },
    { name: 'FAQ', url: ROUTES_URL.navRoutes.faq },
  ],
};

export { navRoutes, footerRoutes, ROUTES_URL, helperProfileLinks, employerProfileLinks };
