import Head from 'next/head';
import styles from '../../../../../styles/create.module.scss';
import {Navbar} from '../../../../components/Navbar';


import { Input, TextArea } from '../../../../components/ui/Input';
import { Button } from '../../../../components/ui/Button'
import { useState } from 'react';
import { canSSRAuth } from '../../../../utils/canSSRAuth';

export default function NewEvent() {
    const [startDateFrom, setStartDateFrom] = useState('');
    const [startDateTo, setStartDateTo] = useState('');
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
                        Meta
                    </h1>
                    <form>
                        <label>Título</label>
                        <Input placeholder='Digite o título'
                            type="text"
                        />
                        <label>Descrição</label>
                        <TextArea placeholder='Descreva seu evento...'></TextArea>
                        <label>Categoria</label>
                        <select>
                            <option selected>Selecione uma categoria</option>
                            <option>Profissão</option>
                            <option>Religião</option>
                        </select>
                        <div className={styles.row}>
                            <div className={styles.column}>
                                <label>De</label>
                                <Input          
                                    type="date"
                                    onChange={(e) => setStartDateFrom(e.target.value)}
                                />

                            <div className={styles.column2}>
                                <label>Até</label>
                                <Input          
                                    type="date"
                                    onChange={(e) => setStartDateTo(e.target.value)}
                                />
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            loading={false}
                        >
                            Próximo
                        </Button>
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