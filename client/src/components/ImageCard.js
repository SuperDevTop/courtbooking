import React from 'react';
import { Card, CardMedia } from '@mui/material';

const ImageCard = ({image}) => {
    return (
        <Card>
            <CardMedia
                component='img'
                image={image.imageUrl}
                alt={image.title}
            />
            {/* <CardContent>
                <Typography variant='body2' color='text.primary'> 
                    {image.title}
                </Typography>
            </CardContent> */}
        </Card>
    )
}

export default ImageCard;