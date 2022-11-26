import { useState } from 'react'
import { canSSRAuth } from '../../../../utils/canSSRAuth';
import styles from './styles.module.scss';
import { FiRefreshCcw } from 'react-icons/fi'
import { Navbar } from '../../../../components/Navbar';

import { setupAPIClient } from '../../../../services/api'
import { ModalEvent } from '../../../../components/ModalEvent'

import { FaCalendar, FaClock, FaList, FaTextWidth } from 'react-icons/fa';
import moment from 'moment';

type EventProps = {
  id: string,
  title: string,
  description: string,
  date: Date,
  time: Date,
  categoryId: string
}

interface HomeProps {
  events: EventProps[];
  categories: CategoryProps[]
}

type CategoryProps = {
  id: string,
  title: string
}

export type EventItemProps = {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: Date;
  categoryId: string;
}

export type ItemProps = {
  id: string;
  title: string;
}

export default function ListEvents({ events, categories }: HomeProps) {
  const [eventsList, setEvents] = useState(events || [])

  const [modalItem, setModalItem] = useState<EventItemProps[]>()
  const [modalVisible, setModalVisible] = useState(false);


  function handleCloseModal() {
    setModalVisible(false);
  }

  async function handleOpenModalView(id: string) {
 
    const apiClient = setupAPIClient();

    const response = await apiClient.get('/event/detail', {
      params: {
        eventId: id,
      }
    })

    setModalItem(response.data);
    console.log(modalItem)
    setModalVisible(true);

  }



  function RenderList(item: EventItemProps) {

    const data = moment(item.date).format('DD-MM-YYYY')
    const time = moment(item.time).format('hh:mm a');
    

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

            <FaCalendar size={40} fill="#FF985F" />

            <div className={styles.item}>
              {data}
            </div>

            <FaClock size={50} fill="#FF985F" />

              <div className={styles.item}>
                {time}
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

    const response = await apiClient.get('/events', {
      params: {
        planningId: planningId
      }
    });
    setEvents(response.data.event);

  }


  return (
    <>
      <div>
        <Navbar />
      </div>
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <h1>Eventos</h1>
          <button onClick={handleRefresh}>
            <FiRefreshCcw size={50} color="#3fffa3" />
          </button>
        </div>

        <article className={styles.listOreders}>

          {eventsList.length === 0 && (
            <span className={styles.emptyList}>
              Nenhum evento encontrado...
            </span>
          )}

          {eventsList.map(item => (
            <section key={item.id} >

              <button onClick={() => handleOpenModalView(item.id)}>
                {RenderList(item)}
              </button>

            </section>
          ))}

        </article>


      </main>
      {modalVisible && (
        <ModalEvent
          isOpen={modalVisible}
          onRequestClose={handleCloseModal}
          event={modalItem}
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


  const response = await apiClient.get('/events', {
    params: {
      planningId: planningId
    }
  });

  const categories = await apiClient.get('/categorys')

  return {
    props: {
      events: response.data.event,
      categories: categories.data.category
    }
  }
})

