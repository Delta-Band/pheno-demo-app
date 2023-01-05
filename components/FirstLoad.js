import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga4';
import { fieldsSlice, routerSlice, foldersSlice } from '../redux';

export default function FirstLoad() {
  const dispatch = useDispatch();
  const router = useRouter();
  const prevRoute = useRef(null);

  useEffect(() => {
    dispatch(fieldsSlice.actions.setData());
    dispatch(foldersSlice.actions.setData());
    ReactGA.initialize([
      {
        trackingId: process.env.NEXT_PUBLIC_GA_M_ID,
        testMode: window.location.host.includes('localhost')
      }
    ]);
    router.events.on('routeChangeStart', url => {
      dispatch(routerSlice.actions.setPrevRoute(prevRoute.current));
    });
  }, []);

  useEffect(() => {
    prevRoute.current = router.route;
  }, [router.route]);
}
