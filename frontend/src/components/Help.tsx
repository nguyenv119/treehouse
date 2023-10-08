import styles from './Help.module.css';

export default function Help() {
    return (
        <div>
            <div id="contact">
                <div className={styles.container}>
                <h1 className={styles.title}>Talk to a Counseler</h1><br></br>
                    <div className={styles.row}>
                        <div className={styles.contactLeft}>
                            <p>Email: <i>therapist@gmail.com</i></p>
                            <p>Phone: <i>888-888-8888</i></p>
                            <p>Websites: <i>https://theactionalliance.org/</i></p>
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

