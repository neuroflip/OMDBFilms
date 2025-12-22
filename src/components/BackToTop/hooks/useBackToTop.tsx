import * as React from "react";

const useBackToTop = (): [ string, ()=> void  ] => {
  const lastKnownScrollPosition = React.useRef(0);
  const ticking = React.useRef<boolean>(false);
  const [ hiddenClass, setHiddenClass ] = React.useState('hidden');

  React.useEffect(() => {
    document.addEventListener("scroll", () => {
      if (!ticking.current) {
        setTimeout(() => {
          if (lastKnownScrollPosition.current > window.scrollY) {
            setHiddenClass('');
          } else {
            setHiddenClass('hidden');
          }
          ticking.current = false;
          lastKnownScrollPosition.current = window.scrollY;
        }, 50);

        ticking.current = true;
      }
    });
  }, []);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setHiddenClass('hidden');
  }

  return [ hiddenClass, goTop ];
}

export default useBackToTop