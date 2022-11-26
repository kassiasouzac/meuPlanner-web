import Modal from 'react-modal';
import styles from './style.module.scss';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { FiX } from 'react-icons/fi'
import { Input, TextArea } from '../ui/Input';

import { EventItemProps, ItemProps } from '../../pages/auth/planning/events/listevents';
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
  event: EventItemProps[];
  categoryList: ItemProps[]
}


export function ModalEdit({ isOpen, onRequestClose, event, categoryList }: ModalEditProps) {
  const [title, setTitle] = useState(event[0].title || '');
  const [id, setId] = useState(event[0].id)
  const [description, setDescription] = useState(event[0].description || '');
  const [category, setCategory] = useState(10);
  const [categories, setCategories] = useState(categoryList || []);
  const [savedDate, setDate] = useState(event[0].date)
  const [loading, setLoading] = useState(false);
  const [savedTime, setTime] = useState(event[0].time)
  const current = new Date();


  async function handleEdit(event: FormEvent) {
    event.preventDefault();


    try {

      if (title === '' || description === '' || category === null || savedDate === null || savedTime === null) {
        alert('Preencha os campos!');
        return;
      }
      let date = moment(savedDate).format()
      let time = moment(savedTime).format()
      setLoading(true);
      let categoryId = categories[category].id;


      const apiClient = setupAPIClient();
      await apiClient.put('event/edit', {
        eventId: id,
        title: title,
        description: description,
        date,
        time,
        categoryId: categoryId
      })


      toast.success('Evento Editado!');
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

  function RenderList(item: EventItemProps) {

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
              <label>Data</label>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  minDate={current}
                  value={savedDate}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className={styles.column}>
              <label>Horário</label>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <TimePicker

                  value={savedTime}
                  onChange={(newValue) => {
                    setTime(newValue);
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

        <h2>Editar Evento</h2>


        {event.map(item => (
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
