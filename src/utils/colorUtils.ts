const repeatedColors = ({
  length,
  colorList,
  selectedIndex,
}: {
  length: number;
  colorList: string[];
  selectedIndex: number;
}) => {
  return Array(length)
    .fill(colorList)
    .flat(Infinity)
    .filter((el, i) => i === selectedIndex)[0];
};

const colorDetector = (id: number) => {
  type IType = 0 | 1 | 2;
  const number: IType = (id % 3) as IType;
  switch (number) {
    case 0:
      return 'green';
    case 1:
      return 'blue';
    case 2:
      return 'orange';
    default:
      return 'orange';
  }
};

const textColor = (color: 'orange' | 'green' | 'blue' | 'gray') => {
  switch (color) {
    case 'orange':
      return 'text-darkOrange-500';
    case 'green':
      return 'text-lightGreen-500';

    case 'blue':
      return 'text-lightBlue-500';

    case 'gray':
      return 'text-darkBlue-500';

    default:
      return 'text-darkOrange-500';
  }
};

const strokeColor = (color: 'orange' | 'green' | 'blue' | 'gray' | 'black') => {
  switch (color) {
    case 'orange':
      return '[&_path]:stroke-darkOrange-500';
    case 'green':
      return '[&_path]:stroke-lightGreen-500';

    case 'blue':
      return '[&_path]:stroke-lightBlue-500';

    case 'gray':
      return '[&_path]:stroke-darkBlue-500';

    default:
      return '[&_path]:stroke-darkOrange-500';
  }
};

const bgColorLight = (color: 'orange' | 'green' | 'blue' | 'gray') => {
  switch (color) {
    case 'orange':
      return 'bg-darkOrange-100';
    case 'green':
      return 'bg-lightGreen-100';

    case 'blue':
      return 'bg-lightBlue-100';

    case 'gray':
      return 'bg-darkBlue-100';

    default:
      return 'bg-darkOrange-100';
  }
};

const bgColorDark = (color: 'orange' | 'green' | 'blue') => {
  switch (color) {
    case 'orange':
      return 'bg-darkOrange-500';
    case 'green':
      return 'bg-lightGreen-500';

    case 'blue':
      return 'bg-lightBlue-500';

    default:
      return 'bg-darkOrange-500';
  }
};

const bgWithOpacity = (color: 'orange' | 'green' | 'blue') => {
  switch (color) {
    case 'orange':
      return 'bg-darkOrange-100/60';
    case 'green':
      return 'bg-lightGreen-100/60';

    case 'blue':
      return 'bg-lightBlue-100/60';

    default:
      return 'bg-darkOrange-100/60';
  }
};

export {
  repeatedColors,
  textColor,
  strokeColor,
  bgColorDark,
  bgColorLight,
  colorDetector,
  bgWithOpacity,
};
