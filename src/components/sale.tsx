import { useState, useEffect } from "react"

export default function Sale() {
    const [hours, setHours] = useState(1);
    const [minutes, setMinutes] = useState(10);
    const [seconds, setSeconds] = useState(15);

    useEffect(
        () => {
            const interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else {
                    if (minutes > 0) {
                        setMinutes(minutes - 1);
                        setSeconds(59)
                    } else {
                        if ( hours > 0 ) {
                            setHours(hours - 1);
                            setMinutes(59);
                            setSeconds(59);
                        } else {
                            clearInterval(interval);
                        }
                    }
                }
            }, 1000)
            return () => {
                clearInterval(interval);
            }
        }, [hours, minutes, seconds])

    return(
        <>
            <div className="bg-red-700 flex flex-col gap-3 justify-center sm:flex-row sm:justify-around lg:py-14 pl-8 py-9 z-10 ">
                <h2 className="text-4xl lg:text-5xl tracking-widest"><strong>SALE STARTS IN</strong></h2>
                <h2 className="text-4xl lg:text-5xl tracking-widest"><strong>{hours}</strong> <span className="text-lg">Hour</span></h2>
                <h2 className="text-4xl lg:text-5xl tracking-widest"><strong>{minutes}</strong> <span className="text-lg">Minutes</span></h2>
                <h2 className="text-4xl lg:text-5xl tracking-widest"><strong>{seconds}</strong> <span className="text-lg">Seconds</span></h2>
            </div>
        </>
    )
}