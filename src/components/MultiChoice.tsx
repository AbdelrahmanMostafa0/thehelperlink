// react
import { ReactNode } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

// components
import Typography from '@src/components/Typography';
import Checkbox from '@src/components/Checkbox';

interface IProps {
  children?: ReactNode;
  list: IListItem[];
  label?: any;
  selectedItems: IListItem[];
  onChange: (list: IListItem[]) => void;
  errorText?: string;
  error?: boolean;
}

export interface IListItem {
  value: string;
  name: string;
}

const MultiChoice: React.FC<IProps> = ({
  list,
  label,
  selectedItems,
  onChange,
  errorText,
  error,
}) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const isSelected = (item: IListItem) => {
    const selected = selectedItems?.find((el) => el.value === item.value);
    return selected ? true : false;
  };

  const handleSelectedItems = (item: IListItem) => {
    const selected = selectedItems?.find((el) => el.value === item.value);

    if (selected) {
      let newSelected = [...selectedItems];
      newSelected = newSelected.filter((el) => el.value !== item.value);
      onChange(newSelected);
    } else {
      onChange([...selectedItems, item]);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full items-start">
      {label && label}
      <div className="flex w-full gap-7 flex-wrap">
        {list.map((item, index) => (
          <Checkbox
            checked={isSelected(item)}
            onChange={() => handleSelectedItems(item)}
            id={`${item.name}-${index}`}
            key={index}>
            {item.name}
          </Checkbox>
        ))}
      </div>
      {error && (
        <Typography variant="caption" className="text-darkOrange-500 ltr:text-left rtl:text-right">
          {t(errorText || '')}
        </Typography>
      )}
    </div>
  );
};

export default MultiChoice;
