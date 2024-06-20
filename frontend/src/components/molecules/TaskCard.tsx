import moment from 'moment';
import { Card, Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteTaskAsync } from 'store/tasks/tasksSlice';
import { useDispatch } from 'hooks';
import { ITask } from 'typings/interfaces';
import { TagContainer, TaskCardContainer } from './TaskCard.styles';

interface TaskProps {
  data: ITask;
  onEdit: (task: ITask) => void;
}

const TaskCard: React.FC<TaskProps> = ({ data, onEdit }) => {
  const tagsDisplayLimit = 3;
  const dispatch = useDispatch();
  const tags = data.tags.split(';');
  const displayTags = tags.length > 0 ? data.tags.split(';').splice(0, tagsDisplayLimit) : [];

  return (
    <Card>
      <TaskCardContainer>
        <Box>
          <Typography variant="h6">{data.name || 'No name provided'}</Typography>

          <Typography gutterBottom>{data.description || 'No description provided'}</Typography>
          <Typography variant="body2">Type: {data.type || 'No type provided'}</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Typography variant="body2">Tags:</Typography>

            {displayTags.map((tag, index) => <TagContainer key={index} tag={tag} />) ?? 'No tags provided'}

            {tags.length > displayTags[0].length && (
              <TagContainer tag={`+ ${tags.length - displayTags[0].length} more`} />
            )}
          </Box>
          <Typography variant="body2">
            Start Date: {moment(data.startDate).fromNow() || 'No start date provided'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2">{moment(data.startDate).format('YYYY-MM-DD')}</Typography>
          <Box>
            <IconButton onClick={() => onEdit(data)} size="small">
              <EditIcon fontSize="inherit" />
            </IconButton>
            <IconButton onClick={() => dispatch(deleteTaskAsync(data.id))} size="small">
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </Box>
      </TaskCardContainer>
    </Card>
  );
};

export default TaskCard;
