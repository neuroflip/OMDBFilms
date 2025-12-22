import useBackToTop from "./hooks/useBackToTop";
const BackToTop = () => {
  const [ hiddenClass, goTop ] = useBackToTop();

  return <div onClick={ goTop } 
    className={`${hiddenClass} fixed bottom-5 right-5 w-10 h-10 text-2xl pt-2 border border-gray-500 rounded-full bg-gray-600`}>^</div>
}

export default BackToTop;