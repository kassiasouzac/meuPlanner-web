import styles from './styles.module.scss';
import Link from 'next/link';
import { FiLogOut} from 'react-icons/fi';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

export function Navbar() {
    const { signOut} = useContext(AuthContext);

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href={'/auth/home'}>
                    <img src="../../../logo.png" width={90} height={90} />

                </Link>

                <div className={styles.title}>
                    <a>Meu Planner</a>
                </div>

                <nav className={styles.menuNav}>
                    <Link href={'/auth/home'}>
                        <a>
                            Home
                        </a>
                    </Link>
                    <Link href={'/auth/planning/tasks/listtasks'}>
                        <a>
                            Tarefas
                        </a>
                    </Link>
                    <Link href={'/auth/planning/habits/listhabits'}>
                        <a>
                            Hábitos
                        </a>
                    </Link>
                    <Link href={'/auth/planning/goals/listgoals'}>
                        <a>
                            Metas
                        </a>
                    </Link>
                    <Link href={'/auth/planning/events/listevents'}>
                        <a>
                            Eventos
                        </a>
                    </Link>
                    
                        <button onClick={signOut}>
                            <FiLogOut color='#FF985F' size={35}/>
                        </button>

                </nav>
            </div>

        </header>
    )
}