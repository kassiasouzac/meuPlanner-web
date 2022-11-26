import Modal from 'react-modal';
import styles from './style.module.scss';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import moment from 'moment';
import { FiX } from 'react-icons/fi'
import { Input, TextArea } from '../ui/Input';

import { GoalItemProps, ItemProps } from '../../pages/auth/planning/goals/listgoals';
import Router from 'next/router';
import { IoFootsteps } from 'react-icons/io5'
import { FormEvent, useState } from 'react';
import { setupAPIClient } from '../../services/api';
import { toast } from 'react-toastify';
import { Button } from '../ui/Button';

interface ModalOrderProps {
  isOpen: boolean;
  onRequestClose: () => void;
  goal: GoalItemProps[];
  categoryList: ItemProps[]
}


export function ModalEdit({ isOpen, onRequestClose, goal, categoryList }: ModalOrderProps) {
  const [title, setTitle] = useState(goal[0].title || '');
  const [id, setId] = useState(goal[0].id)
  const [description, setDescription] = useState(goal[0].description || '');
  const [category, setCategory] = useState(10);
  const [categories, setCategories] = useState(categoryList || []);
  const [dateFrom, setDateFrom] = useState(goal[0].startDate);
  const [dateTo, setDateTo] = useState(goal[0].endDate)
  const [loading, setLoading] = useState(false);
  const current = new Date();

  async function handleEdit(event: FormEvent) {
    event.preventDefault();
    let categoryId = categories[category].id;

    try {

      if (title === '' || description === '' || category === null || dateFrom === null || dateTo === null) {
        toast.error('Preencha os campos!')
        return;
      }
      setLoading(true);

      const apiClient = setupAPIClient();
      await apiClient.put('goal/edit', {
        goalId: id,
        title: title,
        description: description,
        startDate: dateFrom,
        endDate: dateTo,
        categoryId: categoryId
      })


      toast.success('Meta atualizada!');
      setLoading(false);
      Router.reload();

    } catch (err) {
      console.log(err);
      toast.error("Erro ao cadastrar!")
      setLoading(false)
    }
  }

  function handleChangeCategory(event) {

    setCategory(event.target.value);

  }

  function RenderList(item: GoalItemProps) {

    return (

      <div className={styles.login}>

        <form onSubmit={handleEdit}>
          <label>Título</label>
          <Input placeholder={item.title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
          <label>Descrição</label>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Descreva seu evento...'></TextArea>

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
          <div className={styles.row}>
            <div className={styles.column}>
              <label>De</label>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  minDate={current}
                  value={dateFrom}
                  onChange={(newValue) => {
                    setDateFrom(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className={styles.column2}>
              <label>Até</label>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  minDate={dateFrom}
                  value={dateTo}
                  onChange={(newValue) => {
                    setDateTo(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </div>


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

        <h2>Editar Tarefa</h2>


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
