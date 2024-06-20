import { useDispatch as useReduxDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';

const useDispatch = () => useReduxDispatch<AppDispatch>();
export default useDispatch;
