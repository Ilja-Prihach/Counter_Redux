import React, {useEffect, useState} from "react";

type PropsType = {}

const get2digitsString = (num: number) => num < 10 ? "0" + num : num


export const Watch: React.FC<PropsType> = () => {
    const [watch, setWatch] = useState(new Date())

    useEffect(() => {
        setInterval(() => {
            setWatch(new Date());
        }, 1000)
    }, []);


    const secondsString = get2digitsString(watch.getSeconds())
    const minutesString = get2digitsString(watch.getMinutes())
    const hoursString = get2digitsString(watch.getHours())

    return <div>
        <span>{hoursString}</span>
        :
        <span>{minutesString}</span>
        :
        <span>{secondsString}</span>
    </div>
}