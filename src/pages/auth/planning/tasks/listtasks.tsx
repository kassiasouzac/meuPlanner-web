import { useState } from 'react'
import { canSSRAuth } from '../../../../utils/canSSRAuth';
import styles from './styles.module.scss';
import { FiRefreshCcw } from 'react-icons/fi'
import { Navbar } from '../../../../components/Navbar';

import { setupAPIClient } from '../../../../services/api'
import { ModalOrder } from '../../../../components/ModalTask'

import { FaCalendar, FaList, FaTextWidth } from 'react-icons/fa';

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
  categories: CategoryProps[]
}

type CategoryProps = {
  id: string,
  title: string
}


export type TaskItemProps = {
  id: string;
  title: string;
  description: string;
  date: string;
  categoryId: string;
  planningId: string;
}


export type ItemProps = {
  id: string;
  title: string;
}



export default function ListTasks({ tasks, categories }: HomeProps) {
  const [todos, setTodos] = useState(tasks || [])

  const [modalItem, setModalItem] = useState<TaskItemProps[]>()
  const [modalVisible, setModalVisible] = useState(false);


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
    console.log(modalItem);
    setModalVisible(true);

  }



  function RenderList(item: TaskItemProps) {

    const data = (item.date).split('T');

    return (
<div className={styles.orderItem}>
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
            <FiRefreshCcw size={50} color="#3fffa3" />
          </button>
        </div>

        <article className={styles.listOreders}>

          {todos.length === 0 && (
            <span className={styles.emptyList}>
              Nenhuma tarefa encontrada...
            </span>
          )}

          {todos.map(item => (
            <section key={item.id} >

              <button onClick={() => handleOpenModalView(item.id)}>
                {RenderList(item)}
              </button>

            </section>
          ))}

        </article>


      </main>
      {modalVisible && (
        <ModalOrder
          isOpen={modalVisible}
          onRequestClose={handleCloseModal}
          task={modalItem}
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


  const response = await apiClient.get('/tasks', {
    params: {
      planningId: planningId
    }
  });

  const categories = await apiClient.get('/categorys')

  return {
    props: {
      tasks: response.data.task,
      categories: categories.data.category
    }
  }
})

