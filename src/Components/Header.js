import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header({ userData, setUserData, isLoggedIn, setIsLoggedIn }) {
    const onLogout = () => {
        setIsLoggedIn(false);
        setUserData({});
        localStorage.removeItem('create-ai-token');
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Custom AI</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {isLoggedIn ? (
                        <Navbar.Text>
                            Signed in as: <span onClick={onLogout} role='button'>
                                {userData.username}
                            </span>
                        </Navbar.Text>) : (
                        <Navbar.Text>
                            Not logged in
                        </Navbar.Text>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header