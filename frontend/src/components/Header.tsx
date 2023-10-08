import { useEffect, useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    /** Function to handle the scroll event */
    const handleScroll = () => {
      if (window.scrollY > 20) {
        /** Add a condition for when to change the background color */
        setScrolled(true);
      } else setScrolled(false);
    };

    /** Add a scroll event listener */
    window.addEventListener('scroll', handleScroll);

    /** Remove the event listener when the component unmounts */
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headerClass = `${styles.header} ${scrolled ? styles.scrolledHeader : ''}`;

  return (
    <div className={headerClass}>
      <div className={styles.container}>
        <nav className={styles.navContainer}>
          <ul id="sidemenu">
            <li className={styles.navItem}><a href="#home">Home</a></li>
            <li className={styles.navItem}><a href="#spaces">Spaces</a></li>
            <li className={styles.navItem}><a href="#info">Info</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
