import { useRouter } from 'next/router';

export default function Dish() {
  const router = useRouter();

  return (
    <div>
      <h3>{router.query.slug}</h3>
    </div>
  );
}
