import { useEffect } from "react";
import { getWeather } from "../api/weatherApi";

function HomePage() {
    useEffect(() => {
        getWeather()
            .then((data) => console.log(data))
            .catch(console.error);
    }, []);

    return <div>SRMS</div>;
}

export default HomePage;