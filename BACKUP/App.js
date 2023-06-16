import styles from "./App.module.css"
import { ReactComponent as ArrowRightSVG } from 'icons/arrow_right.svg';
import { ReactComponent as SortSVG } from 'icons/sort.svg';
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";



function App() {

  const [reviews, setReviews] = useState()

  useEffect(() => {
    const getReviews = async () => {
      try {
        const reviews = await axios({
          method: "GET",
          url: "https://kodoumo.ir/wp-json/api/v2/reviews-category/animations"
        })
        setReviews(reviews)
      } catch(err) {
        console.log(err)
      }
    }
    getReviews()
  },[])

  

  /* const infiniteReviewsQuery = useInfiniteQuery({
    queryKey: ["reviews", "infinite"],
    getNextPageParams: prevData => prevData.nextPage,
    queryFn: ({ pageParam = 1 }) => getReviews(pageParam),
  }); */


  return (
    <div className={styles.container}>
      {/* inner  container */}
      <div className={styles.innerContainer}>

        {/* navigation */}
        <nav className={styles.navigation}>
          <ArrowRightSVG height={15} width={15} />
          <span className={styles.navigationTitle}>
            بازگشت
          </span>
        </nav>

        {/* header */}
        <div className={styles.header}>
          <div className={styles.headerًRight}>
            <span className={styles.headerًRightTitle}>
              چیا ببینه؟
            </span>
            <span className={styles.headerًRightSubTitle}>
              مناسب برای ۳ تا ۷ سال
            </span>
          </div>
          <div className={styles.headerLeft}>
            <SortSVG height={15} width={15} />
            <span className={styles.sortTitle}>
              مرتب سازی
            </span>
          </div>
        </div>

        {/* cards grid */}
        <div className={styles.cardsGrid}>
          {infiniteReviewsQuery.isFetchingNextPage ? 'loading ...' : 'load more'}
        </div>

      </div>
    </div>
  );
}

export default App;


/* const Card = () => {


  return (
    
  )
} */