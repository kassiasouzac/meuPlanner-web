import Head from 'next/head';
import styles from '../../../styles/Home.module.scss';
import Image from 'next/image';
import Router from 'next/router';
import Link from 'next/link';

import imgBackground from '../../../public/planner.png';
import {Navbar} from '../../components/Navbar';

import { FaClipboardList, FaCalendarDay, FaPlus } from 'react-icons/fa';
import { GiStairsGoal, GiWaterBottle } from 'react-icons/gi';
import { canSSRAuth } from '../../utils/canSSRAuth';


export default function Home() {


function handleCreate(){
  Router.push('/auth/select')
}



  return (
    <>
      <Head>
        <title>Meu Planner - Home</title>
      </Head>
      <div>
        <Navbar/>
      </div>
      <div className={styles.container}>

        <div className={styles.central}>
          <a>
            <Link href={'/auth/planning/tasks/listtasks'}>
              <FaClipboardList size={100} />
            </Link>
          </a>
          <Image src={imgBackground} alt="Imagem de planejamento" width={680} height={500} />
          <a><FaCalendarDay size={100}  /></a>
        </div>
        <div className={styles.firstRow}>
        <a><GiStairsGoal size={100}  /></a>
        <a onClick={handleCreate}>
            <div className={styles.circle}>
              <FaPlus color='white' size={35}/>
            </div>
          </a>
          <a>
            <Link href={'/auth/planning/habits/habitslist'} >
              <GiWaterBottle size={100}  />
            </Link>
          </a>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) =>{
  return{
      props:{}
  }
})