import Modal from 'react-modal';
import styles from './style.module.scss';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { FiX } from 'react-icons/fi'
import { Input, TextArea } from '../ui/Input';

import { HabitItemProps, ItemProps } from '../../pages/auth/planning/habits/listhabits';
import Router from 'next/router';
import { IoFootsteps } from 'react-icons/io5'
import { FormEvent, useState } from 'react';
import { setupAPIClient } from '../../services/api';
import { toast } from 'react-toastify';
import { Button } from '../ui/Button';
import { TextField } from '@mui/material';
import moment from 'moment';

interface ModalEditProps {
  isOpen: boolean;
  onRequestClose: () => void;
  habit: HabitItemProps[];
  categoryList: ItemProps[]
}


export function ModalEdit({ isOpen, onRequestClose, habit, categoryList }: ModalEditProps) {
  const [title, setTitle] = useState(habit[0].title || '');
  const [id, setId] = useState(habit[0].id)
  const [motivation, setMotivation] = useState(habit[0].motivation || '');
  const [category, setCategory] = useState(4);
  const [categories, setCategories] = useState(categoryList || []);
  const [loading, setLoading] = useState(false);

  async function handleEdit(event: FormEvent) {
    event.preventDefault();
    

    try {

      if (title === '' || motivation === '' || category === null  ) {
        alert('Preencha os campos!');
        return;
      }
      
      setLoading(true);
      let categoryId = categories[category].id;
      

      const apiClient = setupAPIClient();
      await apiClient.put('habit/edit', {
        habitId: id,
        title: title,
        motivation: motivation,
        categoryId: categoryId
      })


      toast.success('Hábito Editado!');
      setLoading(false);
      Router.reload();

    } catch (err) {
      console.log(err);
      toast.error("Erro ao editar!")
      setLoading(false)
    }
  }

  function handleChangeCategory(event) {

    setCategory(event.target.value);

  }

  function RenderList(item: HabitItemProps) {

    return (

      <div className={styles.login}>

        <form onSubmit={handleEdit}>
          <label>Título</label>
          <Input placeholder={item.title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
          <label>Motivação</label>
          <TextArea
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            placeholder='Descreva suas motivações...'></TextArea>

          <label>Categoria</label>
          <select value={category} onChange={handleChangeCategory}>
            {categories.map((item, index) => {
              return (
                <option key={item.id} value={index}>
                  {item.title}
                </option>
              )
            })}
          </select>

          <div className={styles.buttonLine}>
            <Button type='submit' loading={loading}>
              Salvar
            </Button>
          </div>


        </form>
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

        <h2>Editar Hábito</h2>


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
