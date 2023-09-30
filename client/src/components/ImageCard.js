import React from 'react';
import { Card, CardMedia } from '@mui/material';
import {Typography} from '@mui/material';

const ImageCard = ({image_Url, title}) => {
    return (
        <Card>
            <CardMedia
                component='img'
                image={image_Url}
                alt={title}
            />
            <div style={{ padding: 10 }}>
                <Typography variant='body2' color='text.primary' > 
                    {title}
                </Typography>
            </div>
        </Card>
    )
}

export default ImageCard;