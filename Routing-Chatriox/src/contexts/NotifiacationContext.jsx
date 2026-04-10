import { Children, createContext, useCallback, useContext, useState } from "react";

const NotifContext = createContext(null);

export function NotificationProvider () {
    const [notification, setNotification] = useState([]);
     const addNotification = useCallback(({ message, type = 'info', duration = 3500 }) => {
        const id = Date.now();
        setNotification(prev => [...prev, {id, message, type}]);
        setTimeout(() => {
            setNotification(prev => prev.filter(n => n.id !== id));
        }, duration);
        return id;
     }, []);
     
     const removeNotification = useCallback((id) => {
        setNotification(prev => n.id !== id);
     }, []);

     const notify = {
        success: msg => addNotification({         message: msg, tye: "success"        }),
        error: msg => addNotification({         message: msg, tye: "error"        }),
        info: msg => addNotification({         message: msg, tye: "info"        }),
        warning: msg => addNotification({         message: msg, tye: "warning"        }),
     };
     return (
      <NotifContext.Provider value={{ notify, notification, removeNotification }}>
      {children}
      <ToastContainer
        notifications={notification}
        onRemove={removeNotification}
      />
    </NotifContext.Provider>

     )
};

function ToastContainer ({notification, onRemove}) {
    if(!notification.length) return null;
    return(
        <div className="toast-container" aria-live="polite">
            {notifications.map(n => (
                <div key={n.id} className={`toast toast--${n.type}`}>
                    <span>{n.message}</span>
                    <button onClick={() => onRemove(n.id)} aria-label="Dismiss">*</button>
                </div>
            ))}
        </div>
    );
};

export function useNotify () {
    const ctx = useContext(NotifContext);
    if(!ctx) throw new Error('useNotify must be inside NotficationProvider');
    return ctx.notify;
}