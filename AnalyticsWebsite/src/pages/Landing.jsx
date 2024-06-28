import React, { useEffect, useState, useRef } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from "framer-motion"

const Landing = () => {
    const containerRef = useRef(null);
    const cardRef = useRef(null);

    return (
        <div ref={containerRef}>
            <h1>APPLUS</h1>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }} 
            >
                <Card sx={{ minWidth: 275 }} ref={cardRef}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Word of the Day
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            adjective
                        </Typography>
                        <Typography variant="body2">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </motion.div>
        </div>
    );
};

export default Landing;
