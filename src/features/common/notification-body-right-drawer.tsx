import React from 'react';

interface Props {
    extraObject?: any;
    closeRightDrawer: () => void;
}

function NotificationBodyRightDrawer({ extraObject, closeRightDrawer }: Props) {

    return (
        <>
            {[...Array(15)].map((_, i) => {
                return (
                    <div
                        key={i}
                        className={
                            'grid mt-3 card rounded-box p-3' +
                            (i < 5 ? ' bg-base-300' : 'bg-base-200')
                        }
                    >
                        {i % 2 === 0
                            ? `Hello `
                            : `Hi `}
                    </div>
                );
            })}
        </>
    );
};

export default NotificationBodyRightDrawer;
