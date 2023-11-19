import { useParams } from 'react-router-dom';
import DetailsInfo from './DetailsInfo';

export default function CardDetails() {
  const { id } = useParams();
  if (id) {
    return <DetailsInfo id={id} />;
  }
  return null;
}
