import { useEffect, useState } from "react";

function useWindowResize() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        let rafId;
        function handlResize() {
            rafId = requestAnimationFrame(()=> {
                setSize({width: window.innerWidth, height: window.innerHeight})
            })
        }
        window.addEventListener('resize', handlResize);
        return () => {
            window.removeEventListener('resize', handlResize);
            cancelAnimationFrame(rafId);
        };
    }, []);

    const isMobile = size.width<768;
    const isTable = size.width >= 768 && size.width < 1024;
    const isDesktop = size.width >= 1024;

    return {...size, isMobile, isTable, isDesktop};
}
export default useWindowResize;