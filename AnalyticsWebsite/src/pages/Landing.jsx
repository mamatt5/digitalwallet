import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Landing = () => {
    const containerRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        if (cardRef.current) {
            gsap.to(cardRef.current, { rotation: "+=360" });
        }
    }, []);

    return (
        <div ref={containerRef}>
            <h1>APPLUS</h1>
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
        </div>
    );
};

export default Landing;
