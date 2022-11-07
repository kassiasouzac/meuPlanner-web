import { useContext, FormEvent, useState } from 'react';
import Head from 'next/head';
import styles from '../../styles/login.module.scss';
import { AuthContext } from '../contexts/AuthContext'
import { canSSRGuest } from '../utils/canSSRGuest';
import { toast } from 'react-toastify';

import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button'
import { Header} from '../components/Header';


export default function Login() {
    const { signIn } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleLogin(event: FormEvent) {

        if(email === '' || password === ''){
            toast.error("Preencha os dados");
        }

        setLoading(true);

        event.preventDefault();
        let data = {
            email, password
        }
        await signIn(data);

        setLoading(false);
    }

    return (
        <>
            <Head>
                <title>Meu Planner - Login</title>
            </Head>

            <div>
                <Header/>
            </div>
            <div className={styles.containerCenter}>
                <div className={styles.login}>
                    <h1>
                        Login
                    </h1>
                    <form onSubmit={handleLogin}>
                        <label>E-mail:</label>
                        <Input placeholder='Digite seu e-mail'
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Senha:</label>
                        <Input placeholder='Digite sua senha'
                            type="password"
                            value={password}
                            onChange={(p) => setPassword(p.target.value)}
                        />
                        <Button
                            type="submit"
                            loading={loading}
                        >
                            Entrar
                        </Button>
                    </form>
                    <a className={styles.text}>Esqueceu sua senha?</a>
                    <a className={styles.text}>Ainda não tem cadastro?</a>
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