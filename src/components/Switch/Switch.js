import React from 'react';

import style from "./Switch.module.scss";

const Switch = ({active = false, onClick}) => {
    return (
        <div onClick={onClick}
             className={`${style.switch} ${active && style.active}`}>
        <div className={style.toggle}/>
        </div>
    );
}

export { Switch };
