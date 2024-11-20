import { useState } from 'react';

export const useSideBar = () => {
    const [isMemberSubmenuOpen, setIsMemberSubmenuOpen] = useState(false);
    const [isEventSubmenuOpen, setIsEventSubmenuOpen] = useState(false);

    const toggleMemberSubmenu = () => {
        setIsMemberSubmenuOpen(!isMemberSubmenuOpen);
    };

    const toggleEventSubmenu = () => {
        setIsEventSubmenuOpen(!isEventSubmenuOpen);
    };

    return {
        isMemberSubmenuOpen,
        isEventSubmenuOpen,
        toggleMemberSubmenu,
        toggleEventSubmenu
    };
};