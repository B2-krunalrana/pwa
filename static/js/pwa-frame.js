
// import (createSmoothChart)  
const { useState,useEffect } = React;

function Dashboard() {
    const [activeTab, setActiveTab] = useState('home');
    console.log("activeTab",activeTab)
    // JavaScript to update active button class on mount or when activeTab changes
    useEffect(() => {
        // Remove 'active' class from all buttons
        const buttons = document.querySelectorAll('.footer-btn');
        buttons.forEach(btn => btn.classList.remove('active-btn'));

        // Add 'active' class to the button corresponding to activeTab
        const activeButton = document.getElementById(activeTab);
        if (activeButton) {
            activeButton.classList.add('active-btn');
        }
    }, [activeTab]);

    const TabContent = {
        home: () => {
            setTimeout(() => {
                createSmoothChart(); // Call the function after render
            }, 0)
            return (
                    <div className={`tab-content active`}>
                        <div title="cehck tool tip" className="overview-card">
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span>Overview</span>
                                <i className="fas fa-arrow-trend-up"></i>
                            </div>
                            <div className="total-amount">34,628</div>
                            <div>Total Students</div>
                        </div>
                        <div className="grid-cards">
                            <div className="card purple-card">
                                <div style={{marginBottom: '20px'}}>
                                    <i className="fas fa-hashtag"></i>
                                    <span>Active Students</span>
                                </div>
                                <div style={{fontSize: '24px', fontWeight: 'bold'}}>2,273</div>
                                <div>#current</div>
                            </div>
                            <div className="card">
                                <div style={{marginBottom: '20px'}}>
                                    <span>Teachers</span>
                                    <i className="fas fa-users" style={{marginLeft: '10px'}}></i>
                                </div>
                                <div style={{display: 'flex', gap: '5px'}}>
                                    {[1, 2, 3].map(n => (
                                        <div key={n} style={{
                                            width: '30px',
                                            height: '30px',
                                            margin:'3px',
                                            padding:'3px',
                                            borderRadius: '20%',
                                            background: '#f0f0f0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>T{n}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='card grid-cards'>
                            <div id="chart-test"></div>
                        </div>
                    </div> 
            )
        },
        analytics: () => (
            <div className={`tab-content active`}>
                <h2>Analytics Dashboard</h2>
                {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="analytics-card content-section">
                        <h3>Analytics Card {item}</h3>
                        <div className="chart-container">
                            Chart Placeholder {item}
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{width: `${65 + item * 5}%`}}></div>
                        </div>
                        <p>Performance Metric: {75 + item}%</p>
                    </div>
                ))}
            </div>
        ),
        search: () => (
            <div className={`tab-content active`}>
                <div className="content-section">
                    <h2>Search</h2>
                    <input 
                        type="search" 
                        placeholder="Search courses..." 
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            marginBottom: '20px'
                        }}
                    />
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="analytics-card" style={{marginBottom: '15px'}}>
                            <h3>Search Result {item}</h3>
                            <p>Course Description {item}</p>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{width: `${60 + item * 10}%`}}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ),
        school: () => (
            <div className={`tab-content active`}>
                <h2>school Wise Students</h2>
                <div className="grid-cards">
                    {['Mumbai', 'Nadiad', 'Bangalore', 'Chennai'].map((city) => (
                        <div key={city} className="analytics-card">
                            <h3>{city}</h3>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{width: `${Math.random() * 50 + 50}%`}}></div>
                            </div>
                            <p>{Math.floor(Math.random() * 1000)} Students</p>
                        </div>
                    ))}
                </div>
            </div>
        ),
        profile: () => (
            <div className={`tab-content active`}>
                <h2>Profile</h2>
                <div className="analytics-card">
                    <div style={{textAlign: 'center', marginBottom: '20px'}}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            background: '#f0f0f0',
                            margin: '0 auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <i className="fas fa-user fa-3x"></i>
                        </div>
                        <h2 style={{marginTop: '10px'}}>Krunal Rana</h2>
                        <p>Administrator</p>
                    </div>
                    <div className="grid-cards">
                        {['Courses', 'Students', 'Reports', 'Settings'].map((item) => (
                            <div key={item} className="analytics-card">
                                <h3>{item}</h3>
                                <p>View {item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    };

    return (
        <div className="dashboard-container">
            {/* Render active tab content */}
            {TabContent[activeTab]()}

            {/* Footer with active tab check for button classNames */}
            <div className="footer">
                <button id="home"
                    className={`footer-btn ${activeTab === 'home' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('home')}
                >
                    <i className="fas fa-home"></i>
                </button>
                <button id="analytics"
                    className={`footer-btn ${activeTab === 'analytics' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('analytics')}
                >
                    <i className="fas fa-chart-bar"></i>
                </button>
                <button id="search"
                    className={`footer-btn ${activeTab === 'search' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('search')}
                >
                    <i className="fas fa-search"></i>
                </button>
                <button id="school"
                    className={`footer-btn ${activeTab === 'school' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('school')}
                >
                    <i class="fa-solid fa-school"></i>
                </button>
                <button id="profile"
                    className={`footer-btn ${activeTab === 'profile' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('profile')}
                >
                    <i className="fas fa-user"></i>
                </button>
            </div>
        </div>
    );
}

ReactDOM.render(<Dashboard />, document.getElementById('root'));



