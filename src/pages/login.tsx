import Head from  'next/head';
import styles from '../../styles/login.module.scss';
import Image from 'next/image';


import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button'

export default function Login(){
    return(
    <>
    <Head>
        <title>Meu Planner - Login</title>
    </Head>
    
    <div>
        <h1>Navbar</h1>
    </div>
    <div className={styles.containerCenter}>
      <div className={styles.login}>
        <h1>
            Login
        </h1>
        <form>
            <label>E-mail:</label>
            <Input placeholder='Digite seu e-mail'
            type="text"
            />
            <label>Senha:</label>
            <Input placeholder='Digite sua senha'
            type="password"
            />
            <Button
                type="submit"
                loading={false}
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

