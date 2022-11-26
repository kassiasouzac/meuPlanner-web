import { useState } from 'react'
import { canSSRAuth } from '../../../../utils/canSSRAuth';
import styles from './styles.module.scss';
import { FiRefreshCcw } from 'react-icons/fi'
import { Navbar } from '../../../../components/Navbar';

import { setupAPIClient } from '../../../../services/api'
import { ModalHabit } from '../../../../components/ModalHabit'

import { FaCalendar, FaClock, FaList, FaPlusCircle, FaTextWidth } from 'react-icons/fa';
import moment from 'moment';
import { ModalFrequency } from '../../../../components/ModalFrequency';

type HabitProps = {
  id: string,
  title: string,
  motivation: string,
  categoryId: string,
  frequency?:{
    days?: []
  }
}

interface HomeProps {
  habits: HabitProps[];
  categories: CategoryProps[]
}

type CategoryProps = {
  id: string,
  title: string
}

export type HabitItemProps = {
  id: string;
  title: string;
  motivation: string;
  categoryId: string;
  frequency?:{
    days?: []
  };
}

export type ItemProps = {
  id: string;
  title: string;
}

export default function ListHabits({ habits, categories }: HomeProps) {
  const [habitsList, setHabits] = useState(habits || [])
  const [modal, setModal] = useState(false);
  const [modalItem, setModalItem] = useState<HabitItemProps[]>()
  const [modalVisible, setModalVisible] = useState(false);


  function handleCloseModal() {
    setModalVisible(false);
  }

  function handleCloseModalFrequency() {
    setModal(false);
  }

  async function handleOpenModalView(id: string) {
 
    const apiClient = setupAPIClient();

    const response = await apiClient.get('/habit/detail', {
      params: {
        habitId: id,
      }
    })

    setModalItem(response.data);
    console.log(modalItem)
    setModalVisible(true);

  }

  async function handleOpenModalFrequency(id: string) {
 
    const apiClient = setupAPIClient();

    const response = await apiClient.get('/habit/detail', {
      params: {
        habitId: id,
      }
    })

    setModalItem(response.data);
    console.log(modalItem)
    setModal(true);

  }

  function RenderList(item: HabitItemProps) {

   

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
          <h1>Hábitos</h1>
          <button onClick={handleRefresh}>
            <FiRefreshCcw size={50} color="#3fffa3" />
          </button>
        </div>

        <article className={styles.listOreders}>

          {habitsList.length === 0 && (
            <span className={styles.emptyList}>
              Nenhum evento encontrado...
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
        <ModalHabit
          isOpen={modalVisible}
          onRequestClose={handleCloseModal}
          habit={modalItem}
        categories={categories}
        />
      )}
      {modal && (
        <ModalFrequency
          isOpen={modal}
          onRequestClose={handleCloseModalFrequency}
          habit={modalItem}
        
        />
      )}

    </>


  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const get = await apiClient.get('/planning');
  const planningId = get.data.planning.id;


  const response = await apiClient.get('/habits', {
    params: {
      planningId: planningId
    }
  });

  const categories = await apiClient.get('/categorys')

  return {
    props: {
      habits: response.data.habit,
      categories: categories.data.category
    }
  }
})

