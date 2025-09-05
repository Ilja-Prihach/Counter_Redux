import React, { useEffect, useState } from "react";
import s from "./Watch.module.css"; // см. стили ниже

const pad = (n: number) => (n < 10 ? "0" + n : String(n));

export const Watch: React.FC = () => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    const h = now.getHours();
    const m = now.getMinutes();
    const sec = now.getSeconds();

    // углы поворота стрелок:
    const secDeg = sec * 6; // 360/60
    const minDeg = m * 6 + sec * 0.1; // 6° за минуту + доля секунды
    const hourDeg = (h % 12) * 30 + m * 0.5; // 30° за час + 0.5° за минуту

    return (
        <div className={s.wrapper}>
            {/* цифровые */}
            <div className={s.digital}>
                {pad(h)}:<span className={s.colon}>{pad(m)}</span>:<span>{pad(sec)}</span>
            </div>

            {/* аналоговые */}
            <div className={s.clock}>
                {/* риски по кругу (каждые 5 минут) */}
                {Array.from({ length: 12 }).map((_, i) => (
                    <span
                        key={i}
                        className={s.tick}
                        style={{ transform: `rotate(${i * 30}deg) translateY(-48%)` }}
                    />
                ))}

                {/* стрелки */}
                <div className={`${s.hand} ${s.hour}`} style={{ transform: `rotate(${hourDeg}deg)` }} />
                <div className={`${s.hand} ${s.minute}`} style={{ transform: `rotate(${minDeg}deg)` }} />
                <div className={`${s.hand} ${s.second}`} style={{ transform: `rotate(${secDeg}deg)` }} />

                {/* центр-точка */}
                <div className={s.pivot} />
            </div>
        </div>
    );
};
