/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { RegisterI } from '../../lib/clipboard-memory';
import styles from './Register.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RegisterProps {
	register: RegisterI;
    index: number;
    removeRegister: (register: RegisterI) => void
}

const Register: React.FC<RegisterProps> = ({ register, removeRegister }) => {
	const [ date, time ] = register.timestamp.toISOString().split('T');

	const [ justCopied, setjustCopied ] = useState<boolean>(false);



	return (
		<div className={styles['register-container']}>
			<div className={styles.register}>{register.value}</div>
			<i className={styles.timestamp}>{`${time.split('.')[0]} ${date} `}</i>
			<CopyToClipboard
				text={register.value}
				onCopy={() => {
					setjustCopied(true);
					setTimeout(() => {
						setjustCopied(false);
					}, 2000);
				}}
			>
				<div className={styles.clipboard}>
					<i className={justCopied ? 'fas fa-check' : 'far fa-clipboard'} />
					{justCopied ? ' Copied!' : ''}
				</div>
			</CopyToClipboard>
			<div className={styles.trash}>
				<i
					className="far fa-trash-alt"
					onClick={() => {
						removeRegister(register);
					}}
				/>
			</div>
		</div>
	);
};

export default Register;
