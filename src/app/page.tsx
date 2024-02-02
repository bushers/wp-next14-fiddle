import type {
  WP_REST_API_Category,
  WP_REST_API_Posts,
  WP_REST_API_User,
} from "wp-types";
import styles from "./page.module.css";
import { getCategory, getPosts, getUser } from "@/lib/get-data";

export default async function Home() {
  const postsData: WP_REST_API_Posts = await getPosts();
  const { title, date, excerpt, author, categories } = postsData[0];

  const userData: WP_REST_API_User = await getUser(author);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h2>{title.rendered}</h2>
        <p>{userData.name}</p>
        <p>{date}</p>

        {categories?.map(async (cat, i) => {
          const categoryData: WP_REST_API_Category = await getCategory(cat);

          return (
            <span key={i}>{`${categoryData.name}${
              i !== categories.length - 1 ? ", " : ""
            }`}</span>
          );
        })}
        <div dangerouslySetInnerHTML={{ __html: excerpt.rendered }}></div>
      </div>
    </main>
  );
}
