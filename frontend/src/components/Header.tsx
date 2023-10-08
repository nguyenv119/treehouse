import { useState, useEffect } from 'react';
import styles from './Header.module.css';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 200) { // Change background after scrolling 200px
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return (
        <div className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
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
