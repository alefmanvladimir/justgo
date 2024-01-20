// FullScreenModal.tsx

import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import {Backdrop, Button, Fade } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

interface FullScreenModalProps {
    open: boolean;
    children: React.ReactNode;
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({ open, children }) => {
    // Стили для модального окна, чтобы оно занимало всю страницу
    const style = {
        position: 'absolute',
        top: '0%',
        left: '0%',
        overflow: 'auto',
        width: '100%', // Ширина на всю страницу
        height: '100%', // Высота на всю страницу
        display: 'flex',
        bgcolor: 'background.paper', // Фоновый цвет, если нужно
        padding: '15px 15px',
    };

    return (
        <Modal
            open={open}
            // onClose={onClose}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 600,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    {children}
                </Box>
            </Fade>
        </Modal>
    );
};

export default FullScreenModal;
