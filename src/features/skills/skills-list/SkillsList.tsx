import { Fragment } from 'react/jsx-runtime';
import Data from '../data';
import TypeSkillData from '../types/TypeSkillData';

interface ListProps {
  item: TypeSkillData;
  index: number;
}

export const SkillsList = () => {

  const calc = (startDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const diff = now.getTime() - start.getTime();
    const year = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const month = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));

    if (year === 0) {
      const unit = month > 1 ? 'months' : 'month'
      return month + unit
    } else {
      const unit = year > 1 ? 'years' : 'year'
      return year + unit
    }
  }

  const getYearAndMonth = (calcFlag: boolean, year: number | null, startDate: string | null, month: number | null) => {
    if (calcFlag && startDate) {
      return calc(startDate)
    } else if (year) {
      return year + unit(year, true)
    } else if (!year && month) {
      return month + unit(month)
    }
  }

  const unit = (num: number, yearFlg?: boolean) => {
    const unit = yearFlg ? 'year' : 'month'
    if (num > 1) {
      return unit + 's'
    } else {
      return unit
    }
  }

  const List = ({ item, index }: ListProps) => {
    return (
      <li key={index}>
        <i className={item.icon}></i>
        <div className="text-items">
          <p className="name">{item.name}</p>
          <p>{getYearAndMonth(item.calcFlag, item.year, item.startDate, item.month)}</p>
        </div>
      </li>
    )
  }

  return (
    <>
      <h2 className="text-2xl font-bold mt-7">Language</h2>
      <ul className="c-skill-list mt-6">
        {Data.map((item: TypeSkillData, index: number) => (
          <Fragment key={index}>
            {item.type === 'language' && (
              <List item={item} index={index} />
            )}
          </Fragment>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mt-12">Framework</h2>
      <ul className="c-skill-list mt-6">
        {Data.map((item: TypeSkillData, index: number) => (
          <Fragment key={index}>
            {item.type === 'framework' && (
              <List item={item} index={index} />
            )}
          </Fragment>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mt-12">Others</h2>
      <ul className="c-skill-list mt-6">
        {Data.map((item: TypeSkillData, index: number) => (
          <Fragment key={index}>
            {item.type === 'others' && (
              <List item={item} index={index} />
            )}
          </Fragment>
        ))}
      </ul>
    </>
  )
}