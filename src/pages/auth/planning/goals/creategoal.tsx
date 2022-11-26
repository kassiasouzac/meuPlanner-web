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
import { toast } from 'react-toastify';
import { api } from '../../../../services/apiClient';
import { setupAPIClient } from '../../../../services/api';
import Router from 'next/router';

type ItemProps = {
    id: string;
    title: string;
}

interface CategoryProps {
    categoryList: ItemProps[];
}

export default function CreateGoal({ categoryList }: CategoryProps) {
    const [startDateFrom, setStartDateFrom] = useState(new Date());
    const [startDateTo, setStartDateTo] = useState(new Date());
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(-1);
    const [categories, setCategories] = useState(categoryList || []);
    const [loading, setLoading] = useState(false);
    const current = new Date();

    function handleChangeCategory(event) {
        setCategory(event.target.value);
    }

    async function handleCreate(event: FormEvent) {
        event.preventDefault();

        if (title === '' || description === '' || category === null || category === -1 || startDateFrom === null || startDateTo === null) {
            toast.error('Preencha os campos!');
            return;
        }


        try {
            setLoading(true);
            let categoryId = categories[category].id;
            let startDate = moment(startDateFrom).format();
            let endDate = moment(startDateTo).format();

            const planningId = await (await api.get('/planning')).data.planning.id;

            const apiClient = setupAPIClient();

            const response = await apiClient.post('/goal', {
                title, description, startDate, endDate, categoryId, planningId
            });

            setLoading(false);
            toast.success('Meta cadastrada! Preencha o próximo passo');
            Router.push({
                pathname: '/auth/planning/goals/goalsteps',
                query: {id: response.data.goal.id }
            }, '/auth/planning/goals/goalsteps')

        } catch (err) {
            console.log(err);
            toast.error("Erro ao cadastrar!")
            setLoading(false)
        }
    }

    return (
        <>
            <Head>
                <title>Meu Planner - Meta</title>
            </Head>

            <div>
                <Navbar />
            </div>
            <div className={styles.containerCenter}>
                <div className={styles.login}>
                    <h1>
                        Meta
                    </h1>
                    <form onSubmit={handleCreate}>
                        <label>Título</label>
                        <Input placeholder='Digite o título'
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label>Descrição</label>
                        <TextArea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Descreva seu evento...'></TextArea>
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
                                <label>De</label>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DatePicker
                                        minDate={current}
                                        value={startDateFrom}
                                        onChange={(newValue) => {
                                            setStartDateFrom(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div className={styles.column2}>
                                <label>Até</label>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DatePicker
                                        minDate={current}
                                        value={startDateTo}
                                        onChange={(newValue) => {
                                            setStartDateTo(newValue);
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
                                Próximo
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