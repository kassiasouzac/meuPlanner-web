import Modal from 'react-modal';
import styles from './style.module.scss';

import { FiX } from 'react-icons/fi'

import { TaskItemProps } from '../../pages/auth/planning/tasks/listtasks';
import { FaCalendar, FaList, FaTextWidth } from 'react-icons/fa';
import Router from 'next/router';


interface ModalOrderProps {
  isOpen: boolean;
  onRequestClose: () => void;
  task: TaskItemProps[];
}

export function ModalOrder({ isOpen, onRequestClose, task }: ModalOrderProps) {

  function handleEdit(){
  
    Router.push('/auth/planning/tasks/edittask')

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

  const customStyles = {
    content: {
      top: '50%',
      bottom: 'auto',
      left: '50%',
      right: 'auto',
      padding: '30px',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#fff'
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >

      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
        style={{ background: 'transparent', border: 0 }}
      >
        <FiX size={35} color="#FF985F" />
      </button>

      <div className={styles.container}>

        <h2>Detalhes da tarefa</h2>
        <span className={styles.table}>

        </span>

        {task.map(item => (
          <section key={item.id} className={styles.containerItem}>
            <span></span>
            <span className={styles.description}>
           {RenderList(item)}
            </span>
          </section>
        ))}

        
          <button className={styles.buttonOrder} onClick={() => handleEdit()}>
          Editar Tarefa
        </button>
        
        


      </div>

    </Modal>
  )
}