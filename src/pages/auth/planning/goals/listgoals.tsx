import { useState } from 'react'
import { canSSRAuth } from '../../../../utils/canSSRAuth';
import styles from './styles.module.scss';
import { FiRefreshCcw } from 'react-icons/fi'
import { Navbar } from '../../../../components/Navbar';

import { setupAPIClient } from '../../../../services/api'
import { ModalGoal } from '../../../../components/ModalGoal'

import { FaCalendar, FaClock, FaList, FaPlusCircle, FaTextWidth } from 'react-icons/fa';
import moment from 'moment';
import { ModalFrequency } from '../../../../components/ModalFrequency';

type GoalProps = {
  id: string,
  title: string,
  description: string,
  categoryId: string,
  startDate: Date;
  endDate: Date;
}


interface HomeProps {
  goals: GoalProps[];
  categories: CategoryProps[];
}

type CategoryProps = {
  id: string,
  title: string
}

export type GoalItemProps = {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  startDate: Date;
  endDate: Date;
  steps?: StepProps[]
}

export type StepProps = {
  number: number,
  value: string,
  goalId: string,
  id: string
}

export type ItemProps = {
  id: string;
  title: string;
}

export default function ListGoals({ goals, categories }: HomeProps) {
  const [habitsList, setHabits] = useState(goals || [])
  const [modal, setModal] = useState(false);
  const [modalItem, setModalItem] = useState<GoalItemProps[]>();
  const [modalVisible, setModalVisible] = useState(false);


  function handleCloseModal() {
    setModalVisible(false);
  }

  function handleCloseModalFrequency() {
    setModal(false);
  }

  async function handleOpenModalView(id: string) {

    const apiClient = setupAPIClient();

    const response = await apiClient.get('/goal/detail', {
      params: {
        goalId: id,
      }
    });
  
    setModalItem(response.data);
    setModalVisible(true);

  }



  function RenderList(item: GoalItemProps) {

    return (

      <div className={styles.orderItem}>
        <div className={styles.itemArea}>

          <div className={styles.categoryTag}>


          </div>
          <div className={styles.itemBorder}>
            <div className={styles.itemLineArea}>

              <FaList size={20} fill="#FF985F" />
              <div className={styles.item}>
                {item.title}
              </div>
            </div>
            <div className={styles.itemLineArea}>

              <FaList size={20} fill="#FF985F" />
              <div className={styles.item}>
                {item.description}
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }

  async function handleRefresh() {
    const apiClient = setupAPIClient();

    const get = await apiClient.get('/planning');
    const planningId = get.data.planning.id;

    const response = await apiClient.get('/habits', {
      params: {
        planningId: planningId
      }
    });
    setHabits(response.data.habit);

  }


  return (
    <>
      <div>
        <Navbar />
      </div>
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <h1>Metas</h1>
          <button onClick={handleRefresh}>
            <FiRefreshCcw size={50} color="#3fffa3" />
          </button>
        </div>

        <article className={styles.listOreders}>

          {habitsList.length === 0 && (
            <span className={styles.emptyList}>
              Nenhuma meta encontrada...
            </span>
          )}

          {habitsList.map(item => (
            <section key={item.id} >

              <button onClick={() => handleOpenModalView(item.id)}>
                {RenderList(item)}
              </button>

            </section>
          ))}

        </article>


      </main>
      {modalVisible && (
        <ModalGoal
          isOpen={modalVisible}
          onRequestClose={handleCloseModal}
          goal={modalItem}
          categories={categories}
        />
      )}
      

    </>


  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const get = await apiClient.get('/planning');
  const planningId = get.data.planning.id;


  const response = await apiClient.get('/goals', {
    params: {
      planningId: planningId
    }
  });



  const categories = await apiClient.get('/categorys')

  return {
    props: {
      goals: response.data.goal,
      categories: categories.data.category
    }
  }
})

