import { throttle } from 'lodash';
import { useState, useEffect, useRef } from 'react';

function useScrollInfo(scrollContainer) {
  const scrollPositionRef = useRef(null);
  const [scrollInfo, setScrollInfo] = useState({
    direction: 'Down',
    position: 0
  });

  function onScroll() {
    if (!scrollContainer.current) return;
    setScrollInfo(current => ({
      direction:
        scrollPositionRef.current < scrollContainer.current.scrollTop
          ? 'Down'
          : 'Up',
      position: current.position
    }));
    if (throttle.current) return;
    throttle.current = setTimeout(() => {
      // if (!scrollContainer.current) return;
      setScrollInfo(current => ({
        direction: current.direction,
        position: scrollContainer.current.scrollTop
      }));
      throttle.current = null;
    }, 0);
    scrollPositionRef.current = scrollContainer.current.scrollTop;
  }

  useEffect(() => {
    if (scrollContainer.current) {
      scrollContainer.current.addEventListener('scroll', onScroll);
    }
    return () => {
      if (scrollContainer.current) {
        scrollContainer.current.removeEventListener('scroll', onScroll);
      }
    };
  }, [scrollContainer.current]);

  return scrollInfo;
}

export default useScrollInfo;
