import styles from './styles.module.scss';
import Link from 'next/link';
import { FiLogOut} from 'react-icons/fi';

export function Navbar() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href={"/"}>
                    <img src="../../../logo.png" width={90} height={90} />

                </Link>

                <div className={styles.title}>
                    <a>Meu Planner</a>
                </div>

                <nav className={styles.menuNav}>
                    <Link href={'/'}>
                        <a>
                            Home
                        </a>
                    </Link>
                    <Link href={'/'}>
                        <a>
                            Tarefas
                        </a>
                    </Link>
                    <Link href={'/'}>
                        <a>
                            Hábitos
                        </a>
                    </Link>
                    <Link href={'/'}>
                        <a>
                            Metas
                        </a>
                    </Link>
                    <Link href={'/'}>
                        <a>
                            Eventos
                        </a>
                    </Link>
                    
                        <button>
                            <FiLogOut color='#FF985F' size={35}/>
                        </button>

                </nav>
            </div>

        </header>
    )
}