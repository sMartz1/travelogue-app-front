import { Carrousel } from "../Carrousel"

const Discover = () => {

    return (
        <section className="discover--main">
            <div className="discover--slot">
                <Carrousel />
            </div>
            <div className="discover--slot">
                <Carrousel />
            </div>
            <div className="discover--slot">
                <Carrousel />
            </div>
        </section>
    )
}

export default Discover