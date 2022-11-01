import Head from  'next/head';
import styles from '../../styles/signup.module.scss';
import Image from 'next/image';


import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button'

export default function SignUp(){
    return(
    <>
    <Head>
        <title>Meu Planner - Cadastro</title>
    </Head>
    
    <div>
        <h1>Navbar</h1>
    </div>
    <div className={styles.containerCenter}>
      <div className={styles.login}>
        <h1>
            Cadastro de usuário
        </h1>
        <form>
            <label>Nome</label>
            <Input 
            type="text"
            />
            <label>Sobrenome</label>
            <Input 
            type="text"
            />
             <label>E-mail</label>
            <Input 
            type="text"
            />
            <div className={styles.password}>
             <label>Senha</label>
            <Input 
            type="password"
            />
             <label>Confirmação de senha</label>
            <Input 
            type="password"
            />
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

