import { useState } from 'react'
import styles from './Paragraph.module.scss'

const Paragraph = ({ children: text, maxCharacters }) => {
    const [isReadMore, setIsReadMore] = useState(true)

    if (text?.length < maxCharacters) {
        return <p>{text}</p>
    }
    return (
        <p>
            {isReadMore ?
                text?.slice(0, maxCharacters) + '...' :
                text}
            <span
                onClick={() => setIsReadMore(!isReadMore)}
                className={styles.more}
            >
                {isReadMore ? "more" : "less"}
            </span>
        </p>
    )
}

export default Paragraph