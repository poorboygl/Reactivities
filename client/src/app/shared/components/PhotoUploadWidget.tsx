import { CloudUpload } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import { useCallback } from "react";
import {useDropzone} from 'react-dropzone'

export default function PhotoUploadWidget() {
    const onDrop = useCallback((acceptedFiles : File[]) => {
            console.log(acceptedFiles);
        }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  return (
    <Grid container spacing={3}>
        <Grid size={4}>
            <Typography variant="overline" color="secondary">Step 1 - Add Photo</Typography>
            <Box {...getRootProps()}
                sx = {{ border: 'dashed 3px #eee',
                    borderColor: isDragActive ? 'green' : '#eee',
                    borderRadius: '5px',
                    paddingTop: '30px',
                    textAlign: 'center',
                    height: '280px',
                    cursor: 'pointer'
                }}
            >
                <input {...getInputProps()} />
                <CloudUpload sx={{ fontSize: 80 }} />
                <Typography variant="h5" color={isDragActive ? 'green' : 'inherit'}></Typography>
            </Box>
        </Grid>
        <Grid size={4}>
            <Typography variant="overline" color="secondary">Step 2 - Resize image</Typography>
        </Grid>
        <Grid size={4}>
            <Typography variant="overline" color="secondary">Step 3 - Preview & upload</Typography>
        </Grid>
    </Grid>
  )
}