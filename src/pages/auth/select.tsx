import Head from 'next/head';
import styles from '../../../styles/select.module.scss';
import Image from 'next/image';
import Router from 'next/router';
import {Navbar} from '../../components/Navbar';

import imgBackground from '../../../public/planner.png';
import { FaClipboardList, FaCalendarDay } from 'react-icons/fa';
import { GiStairsGoal, GiWaterBottle } from 'react-icons/gi';
import { canSSRAuth } from '../../utils/canSSRAuth';


export default function Select() {
    function handleCreateTask(){
        Router.push('/auth/planning/tasks/createtask')
      }
      
      function handleCreateGoal(){
        Router.push('/auth/planning/goals/creategoal')
      }
      
      function handleCreateHabit(){
        Router.push('/auth/planning/habits/createhabit')
      }
      
      function handleCreateEvent(){
        Router.push('/auth/planning/events/createevent')
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
            <div className={styles.title}><h1>O que deseja criar?</h1></div>
                <div className={styles.central}>
                    <div className={styles.column}>
                        <text>Tarefa</text>
                        <a onClick={handleCreateTask}>
                            <FaClipboardList size={90}/>
                        </a>
                    </div>
                    <Image src={imgBackground} alt="Imagem de planejamento" width={450} height={400} />
                    <div className={styles.column}>
                        <text>Evento</text>
                        <a onClick={handleCreateEvent}>
                            <FaCalendarDay size={90} />
                        </a>
                    </div>
                </div>
                <div className={styles.firstRow}>
                    <div className={styles.column}>
                        <a onClick={handleCreateGoal}>
                            <GiStairsGoal size={100} />
                        </a>
                        <text>Meta</text>
                    </div>
                    <div className={styles.column}>
                        <a onClick={handleCreateHabit}>
                            <GiWaterBottle size={100} />
                        </a>
                        <text>Hábito</text>
                    </div>
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