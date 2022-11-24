// #region import
import React, { useEffect, useState } from "react";

import ModulesList from "./ModulesList";

import "../../style/sidebar.css";
// #endregion import

//-------------------------------------------------------------------------------------------------------------------------------
//  Ce component sera afficher sur le coté de la page d'game,
//  Elle contiendra Un theme parent, avec des modules qui eux contiendront leur propres games:
//-------------------------------------------------------------------------------------------------------------------------------

export default function SideBar({ currentTheme }) {

    const [themeParentData, setThemeParentData] = useState({});

    useEffect(() => {
        setThemeParentData(currentTheme);
    }, [currentTheme]);

    return (
        <section className="sidebar-content animate__animated animate__fadeInUp">
            <h2 className="theme-name-sidebar"> 🎓 {themeParentData.name}</h2>
            {themeParentData._id && (
                <ModulesList themeId={themeParentData._id} themeDescription={themeParentData.description} openByDefault={true}/>
            )}
        </section>
    );
}
