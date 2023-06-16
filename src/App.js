import styles from "./App.module.css"
import { ReactComponent as ArrowRightSVG } from 'icons/arrow_right.svg';
import { ReactComponent as SortSVG } from 'icons/sort.svg';
import { ReactComponent as VuesaxLinearStar } from 'icons/vuesax_linear_star.svg';
import axios from "axios";
import { useEffect, useState } from "react";
import PN from "persian-number";



function App() {

  const [reviews, setReviews] = useState([])
  const [reviewsPage, setReviewsPage] = useState(1)
  const [sortOption, setSortOption] = useState()
  const [loading, setLoading] = useState(false)
  const [showSortOptions, setShowSortOptions] = useState(false)

  //runs twice in development mode
  useEffect(() => {
    /* build query */
    const setQuery = () => {
      let query = []
      if (reviewsPage) query.push("page=" + reviewsPage)
      if (sortOption) query.push("sortby=" + sortOption)
      query = query.join("&")
      return query
    }

    /* fetch data */
    const getReviews = async () => {
      setLoading(true)
      try {
        const data = await axios({
          method: "GET",
          url: `https://kodoumo.ir/wp-json/api/v2/reviews-category/animations?${setQuery()}`
        })
        setReviews(prev => [...prev, ...data.data.data])
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
    }
    getReviews()
  }, [reviewsPage, sortOption])

  /* handle infinite scroll */
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !loading) {
      setReviewsPage(reviewsPage + 1)
    }
  })

  /* handle sortby change */
  const handleSortOptionChange = (e, value) => {
    setReviews([])
    setReviewsPage(1)
    setSortOption(value)
  }

  /* sortby options */
  const sortOptions = [
    {
      id: 1,
      title: "بیشترین امتیاز",
      value: "rate"
    },
    {
      id: 2,
      title: "بیشترین بازدید",
      value: "view"
    },
    {
      id: 3,
      title: "جدیدترین",
      value: "newest"
    }
  ]


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
              چیارو ببینه؟
            </span>
            <span className={styles.headerًRightSubTitle}>
              مناسب برای ۳ تا ۷ سال
            </span>
          </div>
          <div className={styles.headerLeft}>
            <button
              onClick={() => setShowSortOptions(true)}
              className={styles.sortOptionsButton}
            >
              <SortSVG height={12} width={12} />
              <span
                className={styles.sortTitle}>
                مرتب‌سازی
              </span>
            </button>
          </div>
        </div>

        {/* cards */}
        <div className={styles.reviewCardsContainer}>
          {reviews ? reviews.map(review => (
            <ReviewCard review={review} />
          )) : ""}
        </div>

        {/* sortBy container */}
        {showSortOptions ?
          <div
            className={styles.backdrop}
            onClick={() => setShowSortOptions(false)}
          >
          </div> : ""
        }
        <div
          className={`
          ${styles.sortOptionsContainer}
          ${showSortOptions ? styles.moveSortOptionsContainer : ""}
          `}>
          <span className={styles.sortOptionsContainerTitle}>
            مرتب‌سازی بر اساس
          </span>
          <ul
            className={styles.sortOptionsList}
          >
            {sortOptions.map(sortOption => (
              <li key={sortOption.id}>
                <input
                  type="radio"
                  id={sortOption.id}
                  name="sortOptions"
                  className={styles.sortOptionInput}
                  onChange={(e) => handleSortOptionChange(e, sortOption.value)}
                />
                <label
                  htmlFor={sortOption.id}
                  className={styles.sortOptionLabel}
                >
                  {sortOption.title}
                </label>
              </li>
            ))}

          </ul>
        </div>

      </div>
    </div>
  );
}

export default App;




const ReviewCard = ({ review }) => {
  return (
    <div
      key={review.id}
      className={styles.reviewCard}
    >
      <img
        alt={review.reviewsTitle}
        src={review.reviewsThumbnailUrl}
        className={styles.reviewCardImage}
      />
      <div
        className={styles.reviewCardFooter}
      >
        <div>
          <span
            className={styles.reviewCardTitle}
          >
            {review.reviewsTitle}
          </span>
        </div>
        <div className={styles.reviewCardFooterBottom}>
          <span
            className={styles.starIconWrapper}
          >
            <VuesaxLinearStar />
          </span>
          <span>
            {PN.convertEnToPe(review.reviewsRate)}
          </span>
        </div>
      </div>
    </div>
  )
}