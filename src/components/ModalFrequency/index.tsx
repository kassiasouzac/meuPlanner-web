import Modal from 'react-modal';
import styles from './style.module.scss';
import { Calendar } from "react-multi-date-picker"
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header"
import "react-multi-date-picker/styles/layouts/mobile.css"
import { FiX } from 'react-icons/fi'
import { Input, TextArea } from '../ui/Input';
import { HabitItemProps, ItemProps } from '../../pages/auth/planning/habits/listhabits';
import Router from 'next/router';
import { IoFootsteps } from 'react-icons/io5'
import { FormEvent, useState } from 'react';
import { setupAPIClient } from '../../services/api';
import { toast } from 'react-toastify';
import { Button } from '../ui/Button';


interface ModalEditProps {
  isOpen: boolean;
  onRequestClose: () => void;
  habit: HabitItemProps[];
}


export function ModalFrequency({ isOpen, onRequestClose, habit }: ModalEditProps) {
  const [value, setValue] = useState(new Date());
  const [loading, setLoading] = useState(false);

  async function handleEdit(event: FormEvent) {
    event.preventDefault();
    

    

      toast.success('Hábito Editado!');
      setLoading(false);
      Router.reload();

    
  }

  

  function RenderList(item: HabitItemProps) {

    return (

      <div className={styles.login}>

        <form onSubmit={handleEdit}>
        <div className={styles.calendar}>
        <DatePicker 
          value={value}
          onChange={setValue}
          multiple={true}
          className="rmdp-mobile"
          
          
    />

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

        <h2>Editar</h2>


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
