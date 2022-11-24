// #region import
import React, { useState } from "react";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-monokai";
import { config } from "ace-builds";

import "../../style/codeSnippet.css";
import { useEffect } from "react";
// #endregion import

config.set(
    "basePath",
    "https://cdn.jsdelivr.net/npm/ace-builds@1.4.13/src-noconflict/"
);
config.setModuleUrl(
    "ace/mode/javascript_worker",
    "https://cdn.jsdelivr.net/npm/ace-builds@1.4.13/src-noconflict/worker-javascript.js"
);

export default function CustomCodeSnippet(props) {

    const { themeName, code } = props;

    //booléen qui va afficher le code Snippet une fois le state attribué
    const [isReady, setIsReady] = useState(false);

    //state qui va configurer Ace (mode) et Prettier (parser & plugin)
    const [state, setState] = useState({
        mode: "",
    });

    // Quand on reçoit le nom du thème, on configure Ace et prettier pour recevoir le langage voulu
    useEffect (() => {
        switch (themeName) {
            case "HTML":
                setState({ mode: "html"});
                setIsReady(true);
                break;
            case "CSS":
                setState({ mode: "css"});
                setIsReady(true);
                break;
            case "Javascript":
                setState({ mode: "javascript"});
                break;
            default:
                break;
        }
    }, [themeName])

    return (
        <figure className="code-snippet">
            {isReady && 
            (<AceEditor
                fontSize={16}
                showGutter={false}
                maxLines={Infinity}
                highlightActiveLine={false}
                width={"40vw"}
                mode={state.mode}
                theme="monokai"
                showPrintMargin={false}
                readOnly={true}
                name="code-snippet"
                value={code}
                editorProps={{ $blockScrolling: true }}
            />)
            
            }
        </figure>
    );
}
