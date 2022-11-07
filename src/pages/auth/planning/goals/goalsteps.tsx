import Head from 'next/head';
import styles from '../../../styles/steps.module.scss';
import {Navbar} from '../../../../components/Navbar';

import { Button } from '../../../../components/ui/Button'
import { useState } from 'react';
import { IoFootsteps } from 'react-icons/io5'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import { canSSRAuth } from '../../../../utils/canSSRAuth';


export default function CreateSteps() {
    const [value, setValue] = useState('');
    const [inputs, setInputs] = useState([{ key: '', value: '' }]);


    return (
        <>
            <Head>
                <title>Meu Planner - Login</title>
            </Head>

            <div>
                <Navbar/>
            </div>
            <div className={styles.containerCenter}>
                <div className={styles.login}>
                    <h1>
                        Passos para atingir a meta
                    </h1>
                    <form>
                        <div className={styles.area}>
                            <div className={styles.inputArea}>
                                <IoFootsteps size={25} fill="#FF985F" />
                                <div className={styles.border}>
                                    <input
                                        placeholder='- 1'
                                        value={value}
                                        onChange={(s) => setValue(s.target.value)}
                                    />

                                </div>
                            </div>
                            <div className={styles.inputArea}>
                                <IoFootsteps size={25} fill="#FF985F" />
                                <div className={styles.border}>
                                    <input
                                        placeholder='- 2'
                                        value={value}
                                        onChange={(s) => setValue(s.target.value)}
                                    />

                                </div>
                            </div>
                            <div className={styles.inputArea}>
                                <IoFootsteps size={25} fill="#FF985F" />
                                <div className={styles.border}>
                                    <input
                                        placeholder='- 3'
                                        value={value}
                                        onChange={(s) => setValue(s.target.value)}
                                    />

                                </div>
                            </div>
                        </div>
                        <div className={styles.button}>
                            <Button
                                type="submit"
                                loading={false}
                            >
                                Salvar
                            </Button>
                        </div>
                    </form>

                </div>
            </div>

        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) =>{
    return{
        props:{}
    }
  })
