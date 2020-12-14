/* eslint-disable react/jsx-indent */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import { RegisterI } from '../lib/clipboard-memory/index';
import styles from './Home.css';
import Register from './Register/Register';
import Titlebar from './Titlebar/Titlebar';

export default function Home(): JSX.Element {
	const [ state, setstate ] = useState<RegisterI[]>([]);

	const refreshMemo = () => {
		/** Message to be sent */
		const message = 'give me clipboard history';

		/** Define channel name */
		const CHANNEL_NAME = 'main';

		/** Show response for a sync IPC request */
		ipcRenderer
			.invoke(CHANNEL_NAME, message)
			// eslint-disable-next-line promise/always-return
			.then((result: RegisterI[]) => {
				//	console.log(result);
				setstate(result.reverse());
			})
			.catch((e) => console.log(e));
	};

  const removeRegister = (register: RegisterI): void => {
		/** Message to be sent */
		const message = `delete_${register.uid}`;

		/** Define channel name */
		const CHANNEL_NAME = 'main';

		/** Show response for a sync IPC request */
		ipcRenderer
			.invoke(CHANNEL_NAME, message)
			// eslint-disable-next-line promise/always-return
			.then((result: RegisterI[]) => {
				setstate(result.reverse());
			})
			.catch((e) => console.log(e));
  };
  
	useEffect(() => {
		/** Create a processor for a button's click event */
		const interval = setInterval(() => {
			refreshMemo();
		}, 500);
		return () => clearInterval(interval);
	}, []);

	return (
    <>
    <Titlebar />
		<div className={styles.container} data-tid="container">
			<div style={{marginBottom: "30px"}}>
        {
          state.length === 0
          ?
          <i className={styles.empty}>Start by copying something :)</i>
          :
          state.map((register: RegisterI, index: number) => {

            if (register.value  && register.value !== "" ) {
              return <Register removeRegister={removeRegister} key={register.timestamp.toISOString()} register={register} index={index} />;
            }
              return null
            
            
          })
        }
				
			</div>
		</div>
    </>
	);
}
