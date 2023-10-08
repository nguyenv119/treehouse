import { useState } from 'react';
import styles from './Info.module.css';

export default function Info() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
        "Up to 70% of college students experience feelings of imposter syndrome at some point during their academic careers.",
        "In one study of over 1,700 undergraduate students, imposter syndrome was positively correlated with higher levels of anxiety, depression, psychological distress and burnout.",
        "College students experiencing imposter syndrome are more likely to set unattainably high standards for their academic performance, with 65% expecting nothing less than perfection.",
        "In a study of over 600 graduate students, 45% of those experiencing imposter syndrome reported feeling too ashamed or embarrassed to seek academic assistance when struggling."
    ];
    const references = [
        "(Canning et al., 2020; Peteet et al., 2015)",
        "(Serge et al., 2021).",
        "(Chae et al., 1995).",
        "(Peteet et al., 2015)."
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    return (
        <>
        <div id="info">
        <h1 className={styles.title}>Learn More:</h1>
            <div className={styles.container}>

                <div className={styles.section}>
                    <h2>The Problem: <br />Imposter Syndrome</h2><br></br>
                    <p>We've all been there. Imposter syndrome affects 70% of college students, leading to anxiety, depression, and burnout from the high expectations, self-doubt, and avoidance of help.</p>
                </div>

				<div className={styles.section}>
                    <h2>We found that:</h2><br></br>
                    <div className={styles.info}>
						<p>{slides[currentIndex]}</p><br></br>
						<p>{references[currentIndex]}</p>
					</div>

                    <div className={styles.buttonGroup}>
                        <button className={styles.prevButton} onClick={prevSlide}>Previous</button>
                        <button className={styles.nextButton} onClick={nextSlide}>Next</button>
                    </div>

                    <div className={styles.indicators}>
                        {slides.map((slide, index) => (
                            <span key={index} className={currentIndex === index ? styles.activeIndicator : styles.indicator}></span>
                        ))}
                    </div>

                </div>

                <div className={styles.section}>
                    <h2>Our Mission:</h2><br></br>
                    <p>
                        <ul>
                            We want to create a safe and supportive online community for people struggling with imposter syndrome.<br></br><br></br>
                            Through anonymous forums, AI-powered harmfulness filtering, we aim to break the boundaries of seeking help.<br></br><br></br>
                            Together, we can foster a positive, judgment-free conversations, to ensure that everyone's voice is heard and respected.
                        </ul>
                    </p>
                </div>
            </div>
        </div>
        </>
    );
}
