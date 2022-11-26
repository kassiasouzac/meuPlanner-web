import Head from 'next/head';
import styles from '../../../../../styles/create.module.scss';
import {Navbar} from '../../../../components/Navbar';


import { Input, TextArea } from '../../../../components/ui/Input';
import { Button } from '../../../../components/ui/Button'
import { useState, FormEvent } from 'react';
import { canSSRAuth } from '../../../../utils/canSSRAuth';
import { setupAPIClient } from '../../../../services/api';
import { toast } from 'react-toastify';
import { api } from '../../../../services/apiClient';
import Router from 'next/router';


type ItemProps = {
    id: string;
    title:string;
}

interface CategoryProps{
    categoryList: ItemProps[];
}

export default function CreateHabit({categoryList}: CategoryProps) {
    const [title, setTitle] = useState('');
    const [motivation, setMotivation] = useState('');
    const [category, setCategory] = useState(0);
    const [categories, setCategories] = useState(categoryList || []);
    const [loading, setLoading] = useState(false);

    function handleChangeCategory(event){
        
        setCategory(event.target.value);
        
    }


    async function handleCreate(event: FormEvent){
        event.preventDefault();
        let categoryId = categories[category].id;

        
        try{
            if(title === '' || motivation === '' || category === null){
                toast.error('Preencha os campos!');
                return;
            }
            setLoading(true);
            const planningId = await (await api.get('/planning')).data.planning.id ;
            console.log(planningId);
        const apiClient = setupAPIClient();

        const response = await apiClient.post('/habit', {
            title,
            motivation,
            planningId,
            categoryId,
        })

        setLoading(false);
        toast.success('Hábito cadastrado!');
        Router.push('/auth/planning/habits/listhabits');

        }catch(err){
            console.log(err);
            toast.error("Erro ao cadastrar!")
            setLoading(false)
        }
    }

   
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
                        Hábito
                    </h1>
                    <form onSubmit={handleCreate}>
                        <label>Título</label>
                        <Input placeholder='Digite o título'
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label>Motivação</label>
                        <TextArea placeholder='Digite sua motivação' value={motivation}
                            onChange={(e) => setMotivation(e.target.value)}></TextArea>
                        <label>Categoria</label>
                        <select value={category} onChange={handleChangeCategory}>
                        {categories.map( (item, index) => {
                             return(
                                <option key={item.id} value={index}>
                                    {item.title}
                                </option>
                            )
                           })}
                        </select>

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