import { CloudUpload } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import {useDropzone} from 'react-dropzone'
import  { type ReactCropperElement, Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";

type Props = {
    uploadPhoto: (file: Blob) => void;
    loading: boolean;
}

type FileWithPreview = File & { preview: string };

export default function PhotoUploadWidget({uploadPhoto, loading}: Props) {
    const [files, setfiles] = useState<FileWithPreview[]>([]);
    const cropperRef = useRef<ReactCropperElement>(null);

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview))
        }
    }, [files]);

    const onDrop = useCallback((acceptedFiles : File[]) => {
            setfiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }, []);

    const onCrop = useCallback(() =>{
        const cropper = cropperRef.current?.cropper;
        cropper?.getCroppedCanvas().toBlob(blob => {
            if(blob){
                uploadPhoto(blob);
            }
        });
    }, [uploadPhoto])

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
            {files[0] && 
                <Cropper 
                    src = {URL.createObjectURL(files[0])}
                    style={{height: 300, width: '90%'}}
                    initialAspectRatio={1}
                    aspectRatio={1}
                    preview='.img-preview'
                    guides={false}
                    viewMode={1}
                    background={false}
                    ref ={cropperRef}
                />
            }
        </Grid>
        <Grid size={4}>
            {files[0] && 
                <>
                     <Typography variant="overline" color="secondary">Step 3 - Preview & upload</Typography>
                     <div
                        className="img-preview"
                        style={{width: '100%', height: 300, overflow: 'hidden'}}
                     />
                     <Button
                        sx = {{my:1, width: 300}}
                        onClick={onCrop}
                        variant="contained"
                        color='secondary'
                        disabled={loading}
                     >
                         {loading ? 'Uploading...' : 'Upload'}
                     </Button>
                </>
            }
          
        </Grid>
    </Grid>
  )
}