import { useEffect } from "react";

function useOnClickOutside (ref, handler) {
    useEffect(() => {
        function listener (event) {
            if(!ref.current || ref.current.contains(event.target)) return;
            handler(event);
        }
        return () => {
            document.addEventListener("mousedown", listener)
            document.addEventListener("touchstart", listener);
        };
    },[ref, handler])
}

export default useOnClickOutside;