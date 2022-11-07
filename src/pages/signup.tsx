import { FormEvent, useState, useContext} from 'react';
import Head from  'next/head';
import styles from '../../styles/signup.module.scss';
import { AuthContext } from '../contexts/AuthContext';

import { Header} from '../components/Header';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button'
import { canSSRGuest } from '../utils/canSSRGuest';

export default function SignUp(){
    const {signUp} = useContext(AuthContext);

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignUp(event: FormEvent){
        event.preventDefault();

        if(name === ''|| lastname === ''|| email === ''|| password === ''||confirm === ''){
            alert('Preencha os campos!');
        }

        if(password !== confirm){
            alert('As senhas não conferem');
        }

        setLoading(true);

        let data = {
            name, lastname, email, password
        }

        await signUp(data);

        setLoading(false);

    }

    return(
    <>
    <Head>
        <title>Meu Planner - Cadastro</title>
    </Head>
    
    <div>
        <Header/>
    </div>
    <div className={styles.containerCenter}>
      <div className={styles.login}>
        <h1>
            Cadastro de usuário
        </h1>
        <form onSubmit={handleSignUp}>
            <label>Nome</label>
            <Input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <label>Sobrenome</label>
            <Input 
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            />
             <label>E-mail</label>
            <Input 
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <div className={styles.password}>
             <label>Senha</label>
            <Input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
             <label>Confirmação de senha</label>
            <Input 
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            />
            </div>
            <Button
                type="submit"
                loading={loading}
                
            >
                Salvar
            </Button>
        </form>
        
        </div>
    </div>
    
  </>
    )
}

export const getServerSideProps = canSSRGuest(async (ctx) =>{
    return{
        props:{}
    }
})