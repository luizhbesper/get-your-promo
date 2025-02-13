import React from "react";
import { ListDashes, UploadSimple, SignOut } from "@phosphor-icons/react";
import { useNavigation } from "../contexts/NavigationContext";


const Navbar: React.FC = () => {
        const { currentScreen } = useNavigation();
        if(currentScreen === 'login') return <></>;
        return (
                <nav className="bg-zinc-900 text-zinc-50 w-22 h-screen py-8 flex flex-col items-center justify-space-between">
                        <img src = 'src/assets/img/gp-logo.svg' alt = 'GetYourPromo App Logo' className = 'w-12'/>
                        
                        {
                                currentScreen !== 'player' &&
                                <>
                                        <ul className="flex flex-col items-center flex-1 justify-center gap-y-5">
                                                <li>
                                                        <ListDashes 
                                                                className={`${currentScreen === 'promos' ? "text-zinc-50" : "text-zinc-500"} w-7 h-7`}
                                                        />
                                                </li>
                                                <li>
                                                        <UploadSimple
                                                                className={`${currentScreen === 'upload' ? "text-zinc-50" : "text-zinc-500"} w-7 h-7`} 
                                                        />
                                                </li>
                                        </ul>
                                
                                        <SignOut 
                                                className={`${(currentScreen === 'upload' || currentScreen === 'promos') ? "w-7" : "w-0"} h-7`} 
                                        />
                                </>
                        }
                        

                </nav>
        );
    };

export default Navbar;
