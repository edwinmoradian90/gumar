import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {sortTypes, storeTypes} from '../types';
import {helpers} from '../utils';

export default function useSort() {
  const dispatch = useDispatch();
  const {sortBy, isDescending} = useSelector(
    (state: storeTypes.RootState) => state.sort,
  );

  function set(
    sortBy: sortTypes.SortBy = sortTypes.SortBy.DATE,
    isDescending: boolean = false,
  ) {
    dispatch(actions.sort.setSortBy(sortBy));
    dispatch(actions.sort.setIsDescending(isDescending));
  }

  const iconName = useMemo(() => {
    let iconName;
    switch (sortBy) {
      case sortTypes.SortBy.AMOUNT:
        iconName = isDescending
          ? 'sort-alphabetical-descending'
          : 'sort-alphabetical-ascending';
        break;
      case sortTypes.SortBy.DATE:
        iconName = isDescending
          ? 'sort-calendar-descending'
          : 'sort-calendar-ascending';
        break;
      case sortTypes.SortBy.NAME:
        iconName = isDescending
          ? 'sort-numeric-descending'
          : 'sort-numeric-ascending';
        break;
      default:
        iconName = isDescending
          ? 'sort-calendar-descending'
          : 'sort-calendar-ascending';
        break;
    }

    return iconName;
  }, [sortBy, isDescending]);

  const comparator = useMemo(() => {
    let comparator;
    switch (sortBy) {
      case sortTypes.SortBy.AMOUNT:
        comparator = isDescending
          ? helpers.compare.damount
          : helpers.compare.aamount;
        break;
      case sortTypes.SortBy.DATE:
        comparator = isDescending
          ? helpers.compare.ddate
          : helpers.compare.adate;
        break;
      case sortTypes.SortBy.NAME:
        comparator = isDescending
          ? helpers.compare.dname
          : helpers.compare.aname;
        break;
      default:
        console.log('DEFAULT');
        comparator = isDescending
          ? helpers.compare.ddate
          : helpers.compare.adate;
        break;
    }
    return comparator;
  }, [sortBy, isDescending]);

  return {by: sortBy, isDescending, set, comparator, iconName};
}
