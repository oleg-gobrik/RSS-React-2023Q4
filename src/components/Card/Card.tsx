import { usePathname } from 'next/navigation';
import styles from './Card.module.css';
import { Props } from './types';
import Link from 'next/link';
export default function Card(props: Props) {
  const { value } = props;

  const id = value.url.slice(0, -1).split('/').pop();
  const pathname = usePathname();
  const isDetails = pathname.includes('/details/');
  const isPageNumber = pathname.includes('/page/');

  let resultUrl: string = '';
  if (isDetails) {
    resultUrl = `${pathname}/../${id}`;
  } else if (isPageNumber) {
    resultUrl = `${pathname}/details/${id}`;
  } else {
    resultUrl = `${pathname}details/${id}`;
  }

  return (
    <div className={styles.card}>
      <Link href={resultUrl} className={styles.link}>
        <div className={styles.container}>
          <span className={styles.parameter}>{value.name}</span>
        </div>
      </Link>
    </div>
  );
}
