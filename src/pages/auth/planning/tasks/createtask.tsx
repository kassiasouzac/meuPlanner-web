import { useState, FormEvent } from 'react';
import Head from 'next/head';
import styles from '../../../../../styles/create.module.scss';
import { toast } from 'react-toastify';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import moment from 'moment';

import {Navbar} from '../../../../components/Navbar';
import { Input, TextArea } from '../../../../components/ui/Input';
import { Button } from '../../../../components/ui/Button'

import { canSSRAuth } from '../../../../utils/canSSRAuth';
import { setupAPIClient } from '../../../../services/api';
import { api } from '../../../../services/apiClient';
import Router from 'next/router';

type ItemProps = {
    id: string;
    title:string;
}

interface CategoryProps{
    categoryList: ItemProps[];
}

export default function CreateTask({categoryList}: CategoryProps) {


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(-1);
    const [categories, setCategories] = useState(categoryList || []);
    const [startDate, setStartDate] = useState('');
    const [loading, setLoading] = useState(false);
    const current = new Date();

    async function handleCreate(event: FormEvent){
        event.preventDefault();
        let categoryId = categories[category].id;

        try{
            if(title === '' || description === '' || category === null || startDate === ''){
                toast.error('Preencha os campos!');
                return;
            }
            const planningId = await (await api.get('/planning')).data.planning.id ;
            const date = startDate;
            setLoading(true);


        const apiClient = setupAPIClient();

        await apiClient.post('/task', {
            title, description, date, categoryId, planningId 
        });

        setLoading(false);
        toast.success('tarefa cadastrada!');
        Router.push('/auth/planning/tasks/listtasks')

        }catch(err){
            console.log(err);
            toast.error("Erro ao cadastrar!")
            setLoading(false)
        }
    }

    function handleChangeCategory(event){
        
        setCategory(event.target.value);
        
    }

    return (
        <>
            <Head>
                <title>Meu Planner - Tarefa</title>
            </Head>

            <div>
                <Navbar/>
            </div>
            <div className={styles.containerCenter}>
                <div className={styles.login}>
                    <h1>
                        Tarefa
                    </h1>
                    <form onSubmit={handleCreate}>
                        <label>Título</label>
                        <Input placeholder='Digite o título'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                            type="text"
                        />
                        <label>Descrição</label>
                        <TextArea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Descreva seu evento...'></TextArea>

                        <label>Categoria</label>
                        <select value={category} onChange={handleChangeCategory}>
                        <option>
                            Selecione uma categoria
                        </option>
                        {categories.map( (item, index) => {
                             return(
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
                                        minDate={current}
                                        value={startDate}
                                        onChange={(newValue) => {
                                            setStartDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
 
                        </div>

                        <div className={styles.button}>
                        <Button
                            type="submit"
                            loading={loading}
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
const apiClient = setupAPIClient(ctx)

const response = await apiClient.get('/categorys');
//console.log(response.data.category)

    return{
        props:{
            categoryList: response.data.category
        }
    }
  })