import Modal from 'react-modal';
import styles from './style.module.scss';

import { FiX } from 'react-icons/fi'

import { HabitItemProps, ItemProps } from '../../pages/auth/planning/habits/listhabits';
import { FaBookReader, FaBoxes, FaCalendar, FaCarCrash, FaClock, FaGamepad, FaList, FaObjectGroup, FaPeopleCarry, FaPlusCircle, FaPrayingHands, FaSpinner, FaTextWidth, FaTools } from 'react-icons/fa';
import { MdBusinessCenter, MdFamilyRestroom, MdSportsHandball } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { AiFillMedicineBox } from "react-icons/ai";

import Router from 'next/router';
import { useState } from 'react';
import { ModalEdit } from '../ModalEditHabit';
import { setupAPIClient } from '../../services/api';
import { IoAirplaneSharp, IoEarth } from 'react-icons/io5';
import moment from 'moment';


interface ModalHabitProps {
  isOpen: boolean;
  onRequestClose: () => void;
  habit: HabitItemProps[];
  categories: CategoryItemProps[];

}

type CategoryItemProps = {
  id: string;
  title: string;
}



export function ModalHabit({ isOpen, categories, onRequestClose, habit }: ModalHabitProps) {


  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [modalItem, setModalItem] = useState<HabitItemProps[]>()
  const [category, setCategory] = useState<ItemProps[]>()
  const [categoryList, setCategoryList] = useState(categories)
  const [loading, setLoading] = useState(false);

  function handleConfirm(id: string) {
    setLoading(true)
    if (window.confirm('Tem certeza que deseja remover este hábito?')) {
      handleRemove(id)
    }
    setLoading(false)

  }
  async function handleRemove(id: string) {

    const apiClient = setupAPIClient();
    await apiClient.delete('/habit/remove', {
      params: {
        habitId: id,
      }
    })

    setLoading(false)
    Router.reload();
  }

  async function handleOpenModalView(id: string) {

    const apiClient = setupAPIClient();

    const categoriesResponse = await apiClient.get('/categorys');


    const response = await apiClient.get('/habit/detail', {
      params: {
        habitId: id,
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
      <div>{result[0].title}</div>
    )
  }

  function renderIcon(categoryId) {
    console.log(categoryList[0]);

    switch (categoryId) {
      case categoryList[0].id:
        return (<FaCarCrash size={30} color="#FF985F" />);
        break;
      case categoryList[1].id:
        return (<IoEarth size={30} color="#FF985F" />);
        break;
      case categoryList[2].id:
        return (<FaBookReader size={30} color="#FF985F" />);
        break;
      case categoryList[3].id:
        return (<FaGamepad size={30} color="#FF985F" />);
        break;
      case categoryList[4].id:
        return (<MdSportsHandball size={30} color="#FF985F" />);
        break;
      case categoryList[5].id:
        return (<MdFamilyRestroom size={30} color="#FF985F" />);
        break;
      case categoryList[6].id:
        return (<FaPrayingHands size={30} color="#FF985F" />);
        break;
      case categoryList[7].id:
        return (<BiLike size={30} color="#FF985F" />);
        break;
      case categoryList[8].id:
        return (<IoAirplaneSharp size={30} color="#FF985F" />);
        break;
      case categoryList[9].id:
        return (<AiFillMedicineBox size={30} color="#FF985F" />);
        break;
      case categoryList[10].id:
        return (<FaBoxes size={30} color="#FF985F" />);
        break;
      case categoryList[11].id:
        return (<MdBusinessCenter size={30} color="#FF985F" />);
        break;
    }

  }


  function RenderList(item: HabitItemProps) {


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
              {item.motivation}
            </div>
          </div>

          <div className={styles.itemLineArea}>
            {renderIcon(item.categoryId)}
            <div className={styles.item}>
              {renderName(item.categoryId)}
            </div>
          </div>

        </div>
        {modalEditVisible && (
          <ModalEdit
            isOpen={modalEditVisible}
            onRequestClose={handleCloseModal}
            habit={modalItem}
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
            Editar
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

        <h2>Detalhes do Hábito</h2>
        <span className={styles.table}>

        </span>

        {habit.map(item => (
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

