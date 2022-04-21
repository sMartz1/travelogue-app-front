const Header = () => {
    const title = "Travelogue App"
    const navLinks = ["Home", "Login", "Features"]

    return(
        <header className="header--main">
            <div className="header--title">
                <h1>{title}</h1>
            </div>
            <nav>
                <ul className="header--navlinks">
                    {navLinks.map((element, index) => {
                        return <li key={index}>{element}</li>
                    })}
                </ul>
            </nav>
        </header>
    )

}

export default Header