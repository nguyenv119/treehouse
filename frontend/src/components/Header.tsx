import { useState, useEffect } from 'react';
import styles from './Header.module.css';

export default function Header() {
    const [color, setColor] = useState(false);

    useEffect(() => {
        const changeColor = () => {
            if (window.scrollY >= 950) {
                setColor(true);
            } else {
                setColor(false);
            }
        }

        window.addEventListener('scroll', changeColor);

        return () => {
            // Clean up the event listener when the component unmounts
            window.removeEventListener('scroll', changeColor);
        }
    }, []);

    return (
        <div className={styles.header}>
            <div className={`${styles.container} ${color ? styles['container-bg'] : ''}`}>
                <nav className={styles.navContainer}>
                    <ul id="sidemenu">
                        <li><a href="#home" >Home</a></li>
                        <li><a href="#spaces">Spaces</a></li>
                        <li><a href="#info">Info</a></li>
                        <li><a href="#contact">Resources</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}