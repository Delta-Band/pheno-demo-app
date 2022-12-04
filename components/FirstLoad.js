import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { fieldsSlice, routerSlice, foldersSlice } from '../redux';

export default function FirstLoad() {
  const dispatch = useDispatch();
  const router = useRouter();
  const prevRoute = useRef(null);

  useEffect(() => {
    dispatch(fieldsSlice.actions.setData());
    dispatch(foldersSlice.actions.setData());
    router.events.on('routeChangeStart', url => {
      dispatch(routerSlice.actions.setPrevRoute(prevRoute.current));
    });
  }, []);

  useEffect(() => {
    prevRoute.current = router.route;
  }, [router.route]);
}
