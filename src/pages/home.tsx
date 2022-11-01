import Head from  'next/head';
import styles from '../../styles/home.module.scss';
import Image from 'next/image';

import imgBackground from '../../public/planner.png';
import {FaSpinner, FaSignInAlt} from 'react-icons/fa';


export default function Home() {
  return (
  <>
  <Head>
    <title>Meu Planner</title>
  </Head>
  <div>
    <h1>Navbar</h1>
  </div>
 <div className={styles.container}>

 <div className={styles.second}>
    <Image src={imgBackground} alt="Imagem de planejamento"/>
    
 </div>
 </div>
  </>
  )
}
