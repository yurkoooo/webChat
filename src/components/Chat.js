
export default function Chat () {
    return (
        <div className="navbar">
            <div className="navbar__main">
                <div className="navbar__account">
                    <img src="google.png" alt="" style={{width: '80px'}}/>
                    <p>name</p>
                </div>
                <input type="text" placeholder="Search or start new chat"/>
            </div>
            <div className="navbar__chats">
                <p>Chats</p>
                <div className="navbar__contacts">
                    <img src="google.png" alt="" style={{width: '80px'}}/>
                    <div>
                        <p>Contact Name</p>
                        <p>Last message</p>
                    </div>
                    <p>Jun 12, 2017</p>
                </div>
            </div>
        </div>
    )
}