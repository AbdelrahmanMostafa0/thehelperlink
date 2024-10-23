interface IFaq {
  id: string;
  name: string;
  values: { id: string; name: string }[];
}

export const faq: IFaq[] = [
  {
    id: '1',
    name: 'howToRegister',
    values: [
      {
        id: '1',
        name: `registerAnswer`,
      },
    ],
  },
  {
    id: '2',
    name: 'LostOrForgottenPassword',
    values: [
      {
        id: '1',
        name: `forgotPasswordAnswer`,
      },
    ],
  },
  {
    id: '3',
    name: 'editMyProfile',
    values: [
      {
        id: '1',
        name: `editProfileAnswer`,
      },
    ],
  },
  {
    id: '4',
    name: 'haveToPayForJob',
    values: [
      {
        id: '1',
        name: `payForJobAnswer`,
      },
    ],
  },
  {
    id: '5',
    name: 'howToPostAJob',
    values: [
      {
        id: '1',
        name: `postAJobAnswer`,
      },
    ],
  },
  {
    id: '6',
    name: 'technicalProblem',
    values: [
      {
        id: '1',
        name: `technicalAnswer`,
      },
    ],
  },
];
