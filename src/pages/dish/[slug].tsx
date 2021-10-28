import { useRouter } from 'next/router';

export default function Dish() {
  const router = useRouter();

  return (
    <div>
      <div>
        <section>
          <img src="assets/camarao.svg" />
        </section>
        <section>
          <h3>{router.query.slug}</h3>
          <p>teste</p>
          <p>teste</p>
        </section>
      </div>
    </div>
  );
}
