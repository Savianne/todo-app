import './tabs.css';
import { useState, useEffect } from 'react';

const TABS = ({dispatch}) => {
    const [activeTab, switchTab] = useState('all');
    useEffect(() => {
        dispatch(activeTab);
    }, [activeTab])
    return <>
        <div className="btn-holder" style={{ display: 'flex', width: 'fit-content'}}>
            <span className="tab-btn" style={{ height: 'fit-content', width: 'fit-content', padding: '4px 10px', fontSize: '11px', borderRadius: '20px', color: 'white', backgroundColor: activeTab === 'all'? '#ffffff00' : 'rgb(0, 176, 240)'}}
            onClick={() => switchTab('all')}>All</span>
            <span className="tab-btn" style={{ height: 'fit-content', width: 'fit-content', padding: '4px 10px', fontSize: '11px', borderRadius: '20px', color: 'white', backgroundColor: activeTab === 'completed'? '#ffffff00' : 'rgb(0, 176, 240)', marginLeft: '5px', marginRight: '5px'}}
            onClick={() => switchTab('completed')}>Completed</span>
            <span className="tab-btn" style={{ height: 'fit-content', width: 'fit-content', padding: '4px 10px', fontSize: '11px', borderRadius: '20px', color: 'white', backgroundColor: activeTab === 'todo'? '#ffffff00' : 'rgb(0, 176, 240)'}}
            onClick={() => switchTab('todo')}>To do</span>
        </div>
    </>
}

export default TABS;