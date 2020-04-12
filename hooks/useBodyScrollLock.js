import { useEffect, useRef } from 'react';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

const useBodyScrollLock = (condition, options = {}) => {
  const targetRef = useRef(null);

  useEffect(() => {
    const element = targetRef.current;

    if (!element) {
      return;
    }

    if (condition) {
      disableBodyScroll(element, options);
    } else {
      enableBodyScroll(element);
    }

    return clearAllBodyScrollLocks;
  }, [condition, options]);

  return targetRef;
};

export default useBodyScrollLock;