import Head from  'next/head';
import styles from '../../styles/index.module.scss';
import Image from 'next/image';
import Link from 'next/link';

import imgBackground from '../../public/home_background.png';
import {FaSpinner, FaSignInAlt} from 'react-icons/fa';
import { Header} from '../components/Header';

export default function Index() {
  return (
  <>
  <Head>
    <title>Meu Planner</title>
  </Head>
  <div>
    <Header/>
  </div>
 <div className={styles.container}>
 <div className={styles.first}>
    <h1>Que tal uma ajuda em seus planejamentos?</h1>
    <div className={styles.button}>
    <Link href={'/signup'}>
    <button>
      Cadastre-se aqui
      </button>
    </Link>
      </div>
  </div>
 <div className={styles.second}>
    <Image src={imgBackground} alt="Imagem de planejamento" width={1200}/>
    
 </div>
 </div>
  </>
  )
}
