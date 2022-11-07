import styles from './styles.module.scss';
import Link from 'next/link';
import { Button } from '../ui/Button';

export function Header(){
    return(
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
                   
                    <Link href={'/signup'}>
                        <Button>
                            Cadastro
                        </Button>
                    </Link>
                    <Link href={'/login'}>
                    <Button style={{backgroundColor:'rgba(98, 148, 178, 0.79)'}}>
                            Login
                        </Button>
                    </Link>
                </nav>
            </div>
            
        </header>
    )
}