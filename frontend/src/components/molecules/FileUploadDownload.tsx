import { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, ButtonGroup } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { RootState } from 'store/store';
import { createTaskAsync } from 'store/tasks/tasksSlice';
import { useDispatch, useReadJsonFile } from 'hooks';
import { downloadFile } from 'utils';
import { TaskState } from 'typings/interfaces';

const validKeys = ['name', 'description', 'type', 'startDate', 'tags'];
const FileUploadDownload: FC = () => {
  const { data: tasks } = useSelector<RootState, TaskState>((state) => state.tasks);
  const { onFileChange, fileData, error } = useReadJsonFile(validKeys);
  const dispatch = useDispatch();
  const fileInput = useRef<HTMLInputElement>(null);

  const handleDownload = () => {
    const tasksWithoutId = tasks.map(({ id, ...rest }) => rest);
    downloadFile(tasksWithoutId);
  };

  //   Trigger the file input to open
  const handleSelectFile = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  useEffect(() => {
    if (error) {
      console.error(error);
    } else if (fileData) {
      // Loop through the file data and dispatch each task
      for (const task of fileData) {
        dispatch(createTaskAsync(task));
      }
    }
  }, [fileData, error, dispatch]);

  return (
    <Box>
      <ButtonGroup variant="outlined">
        <Button startIcon={<CloudDownloadIcon />} onClick={handleDownload} disabled={tasks.length === 0}>
          Download
        </Button>
        <Button startIcon={<CloudUploadIcon />} onClick={handleSelectFile}>
          <input type="file" accept=".json" ref={fileInput} onChange={onFileChange} hidden />
          Upload
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default FileUploadDownload;
