import * as React from "react";

const BackToTop = () => {
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
  return <div onClick={goTop} 
    className={`${hiddenClass} fixed bottom-5 right-5 w-10 h-10 text-2xl pt-2 border border-gray-500 rounded-full bg-gray-600`}>^</div>
}

export default BackToTop;