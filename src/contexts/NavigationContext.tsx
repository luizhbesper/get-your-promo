/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Screen = 'login' | 'player' | 'promos' | 'upload' | 'notFoundPromo';

interface NavigationContextType {
    currentScreen: Screen;
    setCurrentScreen: (screen: Screen) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
    undefined,
);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [currentScreen, setCurrentScreen] = useState<Screen>('promos');

    return (
        <NavigationContext.Provider value={{ currentScreen, setCurrentScreen }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigation must have a NavigationProvider');
    }
    return context;
};
