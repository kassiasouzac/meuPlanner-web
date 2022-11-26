import Head from 'next/head';
import styles from '../../../../../styles/create.module.scss';
import { Navbar } from '../../../../components/Navbar';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import moment from 'moment';
import { Input, TextArea } from '../../../../components/ui/Input';
import { Button } from '../../../../components/ui/Button'
import { FormEvent, useState } from 'react';
import { canSSRAuth } from '../../../../utils/canSSRAuth';
import { setupAPIClient } from '../../../../services/api';
import { toast } from 'react-toastify';
import { api } from '../../../../services/apiClient';
import Router from 'next/router';


type ItemProps = {
    id: string;
    title: string;
}

interface CategoryProps {
    categoryList: ItemProps[];
}

export default function CreateEvent({ categoryList }: CategoryProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState();
    const [startHour, setStartHour] = useState('');
    const [category, setCategory] = useState(-1);
    const [categories, setCategories] = useState(categoryList || []);
    const [loading, setLoading] = useState(false);
    const current = new Date();

    async function handleCreate(event: FormEvent) {
        event.preventDefault();


        try {
            if (title === '' || description === '' || category === null || category === -1 || startDate === '' || startHour === '') {
                toast.error('Preencha os campos!');
                return;
            }
            setLoading(true);

            let categoryId = categories[category].id;
            let date = moment(startDate).format();
            let time = moment(startHour).format();

            const planningId = await (await api.get('/planning')).data.planning.id;
            


            const apiClient = setupAPIClient();

            await apiClient.post('/event', {
                title, description, date, time, categoryId, planningId
            });

            setLoading(false);
            toast.success('evento cadastrado!');
            Router.push('/auth/planning/events/listevents')

        } catch (err) {
            console.log(err);
            toast.error("Erro ao cadastrar!")
            setLoading(false)
        }
    }

   

    function handleChangeCategory(event) {

        setCategory(event.target.value);

    }

    return (
        <>
            <Head>
                <title>Meu Planner </title>
            </Head>

            <div>
                <Navbar />
            </div>
            <div className={styles.containerCenter}>
                <div className={styles.login}>
                    <h1>
                        Evento
                    </h1>
                    <form onSubmit={handleCreate}>
                        <label>Título</label>
                        <Input 
                        placeholder='Digite o título'
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                        <label>Descrição</label>
                        <TextArea 
                        placeholder='Descreva seu evento...'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        >
                        </TextArea>
                        <label>Categoria</label>
                        <select value={category} onChange={handleChangeCategory}>
                            <option >
                                Selecione uma categoria
                            </option>
                            {categories.map((item, index) => {
                                return (
                                    <option key={item.id} value={index}>
                                        {item.title}
                                    </option>
                                )
                            })}
                        </select>
                        <div className={styles.row}>
                            <div className={styles.column}>
                                <label>Data</label>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DatePicker
                                        
                                        value={startDate}
                                        onChange={(newValue) => {
                                            setStartDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>

                            <div className={styles.column2}>
                                <label>Horário</label>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <TimePicker
                                    
                                        value={startHour}
                                        onChange={(newValue) => {
                                        setStartHour(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
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

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/categorys');

    return {
        props: {
            categoryList: response.data.category
        }
    }
})