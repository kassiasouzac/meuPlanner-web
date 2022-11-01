import Head from  'next/head';
import styles from '../../styles/index.module.scss';
import Image from 'next/image';

import imgBackground from '../../public/home_background.png';
import {FaSpinner, FaSignInAlt} from 'react-icons/fa';


export default function Index() {
  return (
  <>
  <Head>
    <title>Meu Planner</title>
  </Head>
  <div>
    <h1>Navbar</h1>
  </div>
 <div className={styles.container}>
 <div className={styles.first}>
    <h1>Que tal uma ajuda em seus planejamentos?</h1>
    <div className={styles.button}>
    <button>
      Cadastre-se aqui
      </button>
      </div>
  </div>
 <div className={styles.second}>
    <Image src={imgBackground} alt="Imagem de planejamento"/>
    
 </div>
 </div>
  </>
  )
}
