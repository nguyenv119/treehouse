import { useState } from 'react';
import styles from './Help.module.css';

export default function Help() {
    return (
        <div>
            <div id="contact">
                <div className={styles.container}>
                <h1 className={styles.title}>Resources</h1>
                    <div className={styles.row}>
                        <div className={styles.contactLeft}>
                            <p>● Email: info@theActionAlliance.org</p>
                            <p>● Phone: 988</p>
                            <p>● Websites: https://theactionalliance.org/</p>
                            
                        </div>
                        <div className={styles.contactRight}>
                            <form name="submit-to-google-sheet">
                                <input type="text" name="Name" placeholder="Your Name" required />
                                <input type="email" name="Email" placeholder="Your Email" required />
                                <textarea name="Message" rows="6" placeholder="Your Message"></textarea>
                                
                            </form>
                            <button type="submit" className={styles.btn2}>Submit</button>
                            <span id={styles.msg}></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

