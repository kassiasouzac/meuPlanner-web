import Head from 'next/head';
import styles from '../../../../../styles/steps.module.scss';
import { Navbar } from '../../../../components/Navbar';
import Router, { useRouter } from 'next/router'
import { Button } from '../../../../components/ui/Button'
import { FormEvent, useState } from 'react';
import { IoFootsteps } from 'react-icons/io5'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import { canSSRAuth } from '../../../../utils/canSSRAuth';
import { toast } from 'react-toastify';
import { setupAPIClient } from '../../../../services/api';

type InputProps = {
    key: number,
    value: string
}


export default function CreateSteps() {
    const [value, setValue] = useState('');
    const [stepTwo, setStepTwo] = useState('');
    const [stepThree, setStepThree] = useState('');
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState<InputProps[]>();
    const router = useRouter();

    async function create(number, value, goalId) {
        try {
            const apiClient = setupAPIClient();
            await apiClient.post('/step', {
                number,
                value,
                goalId
            });
        } catch (err) {
            console.log(err);
            toast.error("Erro ao cadastrar!")
            setLoading(false)
        }
    }


    async function handleCreate(event: FormEvent) {
        event.preventDefault();
        setInputs([{ key: 1, value: value }, { key: 2, value: stepTwo }, { key: 3, value: stepThree }]);
        if (stepTwo === '' || stepThree === '' || value === '') {
            toast.error('Preencha os campos!');
            return;
        }

        try {
            setLoading(true);

            const goalId = router.query.id;

            setInputs([{ key: 1, value: value }, { key: 2, value: stepTwo }, { key: 3, value: stepThree }]);

            if (inputs.length > 0) {

                await inputs.forEach(async function (step) {
                    await create(step.key, step.value, goalId)
                });
            }

            setLoading(false);
            toast.success('Passos Cadastrados!');
            Router.push('/auth/planning/goals/listgoals')
        } catch (err) {
            console.log(err);
            toast.error("Erro ao cadastrar!")
            setLoading(false)
        }

    }

    return (
        <>
            <Head>
                <title>Meu Planner - Meta</title>
            </Head>

            <div>
                <Navbar />
            </div>
            <div className={styles.containerCenter}>
                <div className={styles.login}>
                    <h1>
                        Passos para atingir a meta
                    </h1>
                    <form onSubmit={handleCreate}>
                        <div className={styles.area}>
                            <div className={styles.inputArea}>
                                <IoFootsteps size={35} fill="#FF985F" />
                                <div className={styles.border}>
                                    <input
                                        placeholder='- 1'
                                        value={value}
                                        onChange={(s) => setValue(s.target.value)}
                                    />

                                </div>
                            </div>
                            <div className={styles.inputArea}>
                                <IoFootsteps size={35} fill="#FF985F" />
                                <div className={styles.border}>
                                    <input
                                        placeholder='- 2'
                                        value={stepTwo}
                                        onChange={(s) => setStepTwo(s.target.value)}
                                    />

                                </div>
                            </div>
                            <div className={styles.inputArea}>
                                <IoFootsteps size={35} fill="#FF985F" />
                                <div className={styles.border}>
                                    <input
                                        placeholder='- 3'
                                        value={stepThree}
                                        onChange={(s) => setStepThree(s.target.value)}
                                    />

                                </div>
                            </div>
                        </div>
                        <div className={styles.button}>
                            <Button
                                type="submit"
                                loading={false}
                            >
                                Salvar
                            </Button>
                        </div>
                    </form>

                </div>
            </div>

        </>
    )
}
