import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

const index = () => {
    return (
        <Box sx={{ flexGrow: 1, fontSize: "20px" }}>
            <Grid container spacing={4}>
                <Grid xs={8}>
                    <Box marginBottom={3}>
                        <Skeleton variant='text' width='60%' sx={{ marginBottom: 1 }} />
                        <Skeleton variant='rectangular' height='40px' />
                    </Box>
                    <Box marginBottom={3}>
                        <Skeleton variant='text' width='80%' />
                        <Skeleton variant='text' width='70%' />
                        <Skeleton variant='text' width='90%' />
                    </Box>
                    <Box >
                        <Grid container spacing={2}>
                            <Grid>
                                <Skeleton variant='circular' width={32} height={32} />
                            </Grid>
                            <Grid flex={1}>
                                <Skeleton variant='rectangular' width='100%' height={60} />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid xs={4}>
                    <Box marginBottom={3}>
                        <Skeleton variant='text' width='100%' />
                        <Skeleton variant='text' width='70%' />
                    </Box>
                    <Box marginBottom={3}>
                        <Skeleton variant='text' width='80%' />
                        <Skeleton variant='text' width='100%' />
                    </Box>
                    <Box>
                        <Skeleton variant='text' width='70%' />
                        <Skeleton variant='text' width='70%' />
                    </Box>
                </Grid>

            </Grid>
        </Box>
    )
}

export default index