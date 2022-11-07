import { useState } from 'react'
import { canSSRAuth } from '../../../../utils/canSSRAuth';
import styles from './styles.module.scss';
import { FiRefreshCcw } from 'react-icons/fi'
import { Navbar } from '../../../../components/Navbar';

import { setupAPIClient } from '../../../../services/api'
import { ModalOrder } from '../../../../components/ModalOrder'

import Modal from 'react-modal';
import { FaCalendar, FaList, FaTextWidth } from 'react-icons/fa';
import { ModalEdit } from '../../../../components/ModalEdit';

type TaskProps = {
  id: string,
  title: string,
  description: string,
  date: string,
  categoryId: string,
  planningId: string;
}

interface HomeProps {
  tasks: TaskProps[];
}

export type TaskItemProps = {
  id: string;
  title: string;
  description: string;
  date: string;
  categoryId: string;
  planningId: string;
}

export default function ListTasks({ tasks }: HomeProps) {
  const [todos, setTodos] = useState(tasks || [])
  const [category, setCategory] = useState();
  const [modalItem, setModalItem] = useState<TaskItemProps[]>()
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  
  function handleCloseModal() {
    setModalVisible(false);
  }

  async function handleOpenModalView(id: string) {

    const apiClient = setupAPIClient();

    const response = await apiClient.get('/task/detail', {
      params: {
        taskId: id,
      }
    })

    setModalItem(response.data);
    setModalVisible(true);

  }


  async function searchCategory(item: TaskItemProps) {

    try {
      const apiClient = setupAPIClient();

      const response = await apiClient.get('/category/detail', {
        params: {
          categoryId: item.categoryId
        }
      });

      const cat = response.data;

      console.log(cat);

      return (
        { category }
      )
    } catch (err) {

    }


  }

  function RenderList(item: TaskItemProps) {

    const data = (item.date).split('T');

    return (

      <div className={styles.itemArea}>

        <div className={styles.categoryTag}>


        </div>
        <div className={styles.itemBorder}>
          <div className={styles.itemLineArea}>

            <a><FaList size={20} fill="#FF985F" /></a>
            <div className={styles.item}>
              {item.title}
            </div>
          </div>

          <div className={styles.itemLineArea}>
            <FaTextWidth size={20} fill="#FF985F" />
            <div className={styles.item}>
              {item.description}
            </div>
          </div>

          <div className={styles.itemLineArea}>

            <FaCalendar size={20} fill="#FF985F" />

            <div className={styles.item}>
              {data[0]}
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

    const response = await apiClient.get('/tasks', {
      params: {
        planningId: planningId
      }
    });
    setTodos(response.data.task);

  }


  return (
    <>

      <div>
        <Navbar />
      </div>
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <h1>Tarefas</h1>
          <button onClick={handleRefresh}>
            <FiRefreshCcw size={25} color="#3fffa3" />
          </button>
        </div>

        <article className={styles.listOreders}>

          {todos.length === 0 && (
            <span className={styles.emptyList}>
              Nenhum pedido aberto foi encontrado...
            </span>
          )}

          {todos.map(item => (
            <section key={item.id} className={styles.orderItem}>
              <a onClick={ () => handleOpenModalView(item.id)}>
                {RenderList(item)}
              </a>
            </section>
          ))}

        </article>
        {modalVisible && (
          <ModalOrder
            isOpen={modalVisible}
            onRequestClose={handleCloseModal}
            task={modalItem}

          />
        )}

{modalEditVisible && (
          <ModalEdit
            isOpen={modalVisible}
            onRequestClose={handleCloseModal}
            task={modalItem}

          />
        )}
      </main>

    </>


  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const get = await apiClient.get('/planning');
  const planningId = get.data.planning.id;
  console.log(planningId)

  const response = await apiClient.get('/tasks', {
    params: {
      planningId: planningId
    }
  });

  return {
    props: {
      tasks: response.data.task
    }
  }
})

