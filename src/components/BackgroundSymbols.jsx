import React from 'react';
import { motion } from 'framer-motion';

const symbols = ['+', '-', '×', '÷'];

const BackgroundSymbols = () => {
    // Generate a set of random symbols with different positions and animation parameters
    const floatingSymbols = Array.from({ length: 20 }).map((_, i) => {
        const angle = 40 + Math.random() * 10; // Angle between 40-50 degrees
        const angleRad = (angle * Math.PI) / 180;
        const xDist = 120; // Total horizontal travel in vw
        const yDist = xDist * Math.tan(angleRad); // Calculated vertical travel in vh

        return {
            id: i,
            char: symbols[Math.floor(Math.random() * symbols.length)],
            startX: -10 - Math.random() * 20, // Start well off-screen left
            startY: 110 + Math.random() * 20,  // Start well off-screen bottom
            endX: 110 + Math.random() * 20,
            yDist: yDist,
            size: Math.random() * 20 + 20,
            duration: Math.random() * 15 + 25, // Slower, more graceful drift
            delay: Math.random() * -30,
            rotate: Math.random() * 360,
        };
    });

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            overflow: 'hidden',
            pointerEvents: 'none',
            opacity: 0.05
        }}>
            {floatingSymbols.map((s) => (
                <motion.div
                    key={s.id}
                    initial={{
                        x: `${s.startX}vw`,
                        y: `${s.startY}vh`,
                        rotate: s.rotate
                    }}
                    animate={{
                        x: `${s.startX + 140}vw`, // Ensure it crosses fully
                        y: `${s.startY - (140 * (s.yDist / 120))}vh`, // Maintain the calculated angle
                        rotate: [s.rotate, s.rotate + 360],
                    }}
                    transition={{
                        duration: s.duration,
                        repeat: Infinity,
                        delay: s.delay,
                        ease: "linear",
                    }}
                    style={{
                        position: 'absolute',
                        fontSize: `${s.size}px`,
                        color: 'var(--text-main)',
                        fontWeight: 'bold',
                    }}
                >
                    {s.char}
                </motion.div>
            ))}
        </div>

    );
};

export default BackgroundSymbols;
