import React from 'react'
import styles from '../../styles/styles'
import EventCard from './EventCard'

const Events = () => {
  return (
    <div>
        <div className={`${styles.section}`}>
            <div className={`${styles.heading}`}>
                <h2>Popular Event</h2>
            </div>
            <div className='w-full grid'>
                <EventCard />
            </div>
        </div>
    </div>
  )
}

export default Events