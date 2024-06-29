import React, { useState } from "react";
import { useMeasure } from "@react-hookz/web";
import './DeliveryArea.css'; // Make sure this CSS file exists and styles are defined

import {
    useDragControls,
    useMotionValue,
    useAnimate,
    motion,
} from "framer-motion";

export const DragCloseDrawerExample = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setOpen(true)}
                className="button"
            >
                Open drawer
            </button>

            <DragCloseDrawer open={open} setOpen={setOpen}>
                <div className="drawer-content">
                    <h2 className="drawer-title">
                        Delivery Areas
                    </h2>
                    <p>
                        We deliver to the following areas in Colombo:
                    </p>
                    <b>Colombo 01 - Fort</b><br />
                    <b>Colombo 02 - Slave Island</b><br />
                    <b>Colombo 03 - Kollupitiya</b><br />
                    <b>Colombo 04 - Bambalapitiya</b><br />
                    <b>Colombo 05 - Havelock Town</b><br />
                    <b>Colombo 06 - Wellawatte</b><br />
                    <b>Colombo 07 - Cinnamon Gardens</b><br />
                    <b>Colombo 08 - Borella</b><br />
                    <b>Colombo 09 - Dematagoda</b><br />
                    <b>Colombo 10 - Maradana</b><br />
                    <b>Colombo 11 - Pettah</b><br />
                    <b>Colombo 12 - Hultsdorf</b><br />
                    <b>Colombo 13 - Kotahena</b><br />
                    <b>Colombo 14 - Grandpass</b><br />
                    <b>Colombo 15 - Mutwal</b>
                </div>
            </DragCloseDrawer>
        </div>
    );
};

const DragCloseDrawer = ({ open, setOpen, children }) => {
    const [scope, animate] = useAnimate();
    const [drawerRef, { height }] = useMeasure();

    const y = useMotionValue(0);
    const controls = useDragControls();

    const handleClose = async () => {
        animate(scope.current, {
            opacity: [1, 0],
        });

        const yStart = typeof y.get() === "number" ? y.get() : 0;

        await animate("#drawer", {
            y: [yStart, height],
        });

        setOpen(false);
    };

    return (
        <>
            {open && (
                <motion.div
                    ref={scope}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={handleClose}
                    className="fixed inset-0 z-50 bg-neutral-950/70"
                >
                    <motion.div
                        id="drawer"
                        ref={drawerRef}
                        onClick={(e) => e.stopPropagation()}
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        transition={{
                            ease: "easeInOut",
                        }}
                        className="absolute bottom-0 h-[75vh] w-full overflow-hidden rounded-t-3xl bg-neutral-900"
                        style={{ y }}
                        drag="y"
                        dragControls={controls}
                        onDragEnd={() => {
                            if (y.get() >= 100) {
                                handleClose();
                            }
                        }}
                        dragListener={false}
                        dragConstraints={{
                            top: 0,
                            bottom: 0,
                        }}
                        dragElastic={{
                            top: 0,
                            bottom: 0.5,
                        }}
                    >
                        <div className="absolute left-0 right-0 top-0 z-10 flex justify-center bg-neutral-900 p-4">
                            <button
                                onPointerDown={(e) => {
                                    controls.start(e);
                                }}
                                className="h-2 w-14 cursor-grab touch-none rounded-full bg-neutral-700 active:cursor-grabbing"
                            ></button>
                        </div>
                        <div className="relative z-0 h-full overflow-y-scroll p-4 pt-12">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default DragCloseDrawerExample;

