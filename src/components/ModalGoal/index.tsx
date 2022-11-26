import Modal from 'react-modal';
import styles from './style.module.scss';

import { FiX } from 'react-icons/fi'

import { GoalItemProps, ItemProps, StepProps } from '../../pages/auth/planning/goals/listgoals';
import { FaBookReader, FaBoxes, FaCalendar, FaCarCrash, FaClock, FaGamepad, FaList, FaObjectGroup, FaPeopleCarry, FaPrayingHands, FaSpinner, FaStepForward, FaTextWidth, FaTools } from 'react-icons/fa';
import { MdBusinessCenter, MdFamilyRestroom, MdSportsHandball } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { AiFillMedicineBox } from "react-icons/ai";

import Router from 'next/router';
import { useState } from 'react';
import { ModalEdit } from '../ModalEditGoal';
import { setupAPIClient } from '../../services/api';
import { IoAirplaneSharp, IoEarth, IoFootsteps } from 'react-icons/io5';
import moment from 'moment';


interface ModalGoalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  goal: GoalItemProps[];
  categories: CategoryItemProps[];
}

type CategoryItemProps = {
  id: string;
  title: string;
}



export function ModalGoal({ isOpen, categories, onRequestClose, goal }: ModalGoalProps) {


  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [modalItem, setModalItem] = useState<GoalItemProps[]>()
  const [category, setCategory] = useState<ItemProps[]>()
  const [categoryList, setCategoryList] = useState(categories)
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState<StepProps[]>();

  function handleConfirm(id: string) {
    setLoading(true)
    if (window.confirm('Tem certeza que deseja remover esta meta?')) {
      handleRemove(id)
    }
    setLoading(false)

  }
  async function handleRemove(id: string) {
    const apiClient = setupAPIClient();

    await apiClient.delete('/steps/remove',{
      params:{
          goalId: id
      }
  })
 
    await apiClient.delete('/goal/remove', {
      params: {
        goalId: id,
      }
    })

    setLoading(false)
    Router.reload();
  }

  async function handleOpenModalView(id: string) {

    const apiClient = setupAPIClient();

    const categoriesResponse = await apiClient.get('/categorys');


    const response = await apiClient.get('/goal/detail', {
      params: {
        goalId: id,
      }
    })

    setModalItem(response.data);
    setCategory(categoriesResponse.data.category);
    setModalEditVisible(true);

  }





  function handleCloseModal() {
    setModalEditVisible(false);
  }

  function renderName(categoryId) {
    let result = categoryList.filter(item => item.id.match(categoryId));

    return (
      <div className={styles.item}>{result[0].title}</div>
    )
  }

  function renderIcon(categoryId) {

    switch (categoryId) {
      case categoryList[0].id:
        return (<FaCarCrash size={40} color="#FF985F" style={{ padding: 0, margin: 0 }} />);
        break;
      case categoryList[1].id:
        return (<IoEarth size={40} color="#FF985F" />);
        break;
      case categoryList[2].id:
        return (<FaBookReader size={40} color="#FF985F" />);
        break;
      case categoryList[3].id:
        return (<FaGamepad size={40} color="#FF985F" />);
        break;
      case categoryList[4].id:
        return (<MdSportsHandball size={40} color="#FF985F" style={{ padding: 0, marginLeft: -10 }}/>);
        break;
      case categoryList[5].id:
        return (<MdFamilyRestroom size={40} color="#FF985F" />);
        break;
      case categoryList[6].id:
        return (<FaPrayingHands size={40} color="#FF985F" />);
        break;
      case categoryList[7].id:
        return (<BiLike size={40} color="#FF985F" />);
        break;
      case categoryList[8].id:
        return (<IoAirplaneSharp size={40} color="#FF985F" />);
        break;
      case categoryList[9].id:
        return (<AiFillMedicineBox size={40} color="#FF985F" />);
        break;
      case categoryList[10].id:
        return (<FaBoxes size={40} color="#FF985F" />);
        break;
      case categoryList[11].id:
        return (<MdBusinessCenter size={32} color="#FF985F" style={{ padding: 0, margin: 0 }} />);
        break;
    }

  }


  function RenderList(item: GoalItemProps) {

    const dateFrom = moment(item.startDate).format('DD-MM-YYYY')
    const dateTo = moment(item.endDate).format('DD-MM-YYYY');


    return (

      <div className={styles.itemArea}>

        <div className={styles.categoryTag}>


        </div>
        <div className={styles.itemBorder}>
          <div className={styles.itemLineArea}>

            <a><FaList size={30} fill="#FF985F" /></a>
            <div className={styles.item}>
              {item.title}

            </div>
          </div>

          <div className={styles.itemLineArea}>
            <FaTextWidth size={30} fill="#FF985F" />
            <div className={styles.itemDescription}>
              {item.description}
            </div>
          </div>
          <div className={styles.itemLineArea}>

            <FaCalendar size={55} fill="#FF985F" style={{ padding: 0, marginRight: 5 }}/>
            <div className={styles.item}>
              {dateFrom}
            </div>

            <FaCalendar size={55} fill="#FF985F" />
            <div className={styles.item}>
              {dateTo}
            </div>
          </div>
          <div className={styles.itemLineArea}>
            {renderIcon(item.categoryId)}

            {renderName(item.categoryId)}

          </div>

          <div className={styles.steps}>
            <h2>Passos:</h2>
            </div>
            <div className={styles.itemLineArea}>

              <a><IoFootsteps size={30} fill="#FF985F" /></a>
              <div className={styles.item}>
                {item.steps[0].number} - {item.steps[0].value}
              </div>
            </div>
            <div className={styles.itemLineArea}>

              <a><IoFootsteps size={30} fill="#FF985F" /></a>
              <div className={styles.item}>
                {item.steps[1].number} - {item.steps[1].value}
              </div>
            </div>
            <div className={styles.itemLineArea}>

              <a><IoFootsteps size={30} fill="#FF985F" /></a>
              <div className={styles.item}>
                {item.steps[2].number} - {item.steps[2].value}
              </div>
            </div>
          


        </div>
        {modalEditVisible && (
          <ModalEdit
            isOpen={modalEditVisible}
            onRequestClose={handleCloseModal}
            goal={modalItem}
            categoryList={categories}

          />
        )}
        <div className={styles.buttonLine}>
          <button className={styles.buttonRemove} onClick={() => handleConfirm(item.id)}>
            {loading ? (
              <FaSpinner color='#FFF' size={16} />
            ) : 'Deletar'}

          </button>
          <button className={styles.buttonOrder} onClick={() => handleOpenModalView(item.id)}>
            Editar Meta
          </button>

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

        <h2>Detalhes da Meta</h2>
        <span className={styles.table}>

        </span>

        {goal.map(item => (
          <section key={item.id} className={styles.containerItem}>
            <span></span>
            <span className={styles.description}>
              {RenderList(item)}
            </span>
          </section>
        ))}




      </div>

    </Modal>
  )
}

