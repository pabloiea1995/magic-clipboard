/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-empty-interface */

/* eslint-disable react/jsx-indent */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import React from 'react'
import styles from './Titlebar.css';

interface TitlebarProps {

}

const Titlebar: React.FC<TitlebarProps> = () => {
        return (
            <div className={styles.titlebar}>

                    Title bar

            </div>
           

        );
}

export default Titlebar