import classNames from "classnames";
import React from "react";

import styles from "./Languages.module.css";

export const Languages: React.FC<{
    languages: string[];
    selected?: string;
}> = ({ languages, selected }) => (
    <>
        {languages.map((lang) => (
            <span
                key={lang}
                className={classNames(
                    styles.lang,
                    selected === lang && styles.selected
                )}
            >
                {lang}
            </span>
        ))}
    </>
);
