'use client';

import { useEffect } from 'react';

const useLeavePageConfirm = (active = false) => {
  const beforeUnloadListener = (event: any) => {
    event.preventDefault();
    return (event.returnValue = '');
  };

  useEffect(() => {
    if (active) {
      addEventListener('beforeunload', beforeUnloadListener);
    } else {
      removeEventListener('beforeunload', beforeUnloadListener);
    }

    return () => removeEventListener('beforeunload', beforeUnloadListener);
  }, [active]);
};

export default useLeavePageConfirm;
