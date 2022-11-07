import Head from 'next/head';
import styles from '../../../../../styles/create.module.scss';
import {Navbar} from '../../../../components/Navbar';


import { Input, TextArea } from '../../../../components/ui/Input';
import { Button } from '../../../../components/ui/Button'
import {  useState } from 'react';
import { canSSRAuth } from '../../../../utils/canSSRAuth';



export default function CreateEvent() {
const [startDate, setStartDate] = useState('')
const [startHour, setStartHour] = useState('');
    return (
        <>
            <Head>
                <title>Meu Planner </title>
            </Head>

            <div>
                <Navbar/>
            </div>
            <div className={styles.containerCenter}>
                <div className={styles.login}>
                    <h1>
                        Evento
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
                                <label>Data</label>
                                <Input          
                                    type="date"
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>

                            <div className={styles.column2}>
                                <label>Horário</label>
                                <Input
                                    type="time"
                                    onChange={(e) => setStartHour(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            loading={false}
                        >
                            Salvar
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