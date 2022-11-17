import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fieldsSlice } from '../redux';

export default function FirstLoad() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('fetching data');
    dispatch(fieldsSlice.actions.setData());
  }, []);
}
