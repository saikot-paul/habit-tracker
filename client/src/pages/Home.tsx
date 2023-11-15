import React from 'react'
import './Home.css'

export default function Home() {
    const mockItems: any[] = ["task", "event", "task"]
    const [items, setItems] = React.useState(mockItems)

    function addItem() {
        setItems([...items, "task"])
    }

    return (
        <div className='home'>
            <div className='header'>
                <h1>Home</h1>
                <p>Here are your upcoming tasks and events</p>
            </div>
            <div className='content'>
                {items.map((item, index) => { return <div className='item' key={index}>{item}</div> })}
                <div className='button-container'>
                    <p className='button-header'>ADD ITEM</p>
                    <button className='add-item' onClick={addItem}>+</button>
                </div>
            </div>
        </div>
    )
}
