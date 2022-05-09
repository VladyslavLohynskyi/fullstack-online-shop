import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import style from "./StarRating.module.css";

const StarRating = observer(({ addRate }) => {
  const { user } = useContext(Context);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {}, []);
  return (
    <div>
      {user.isAuth ? (
        <div>
          {[...Array(5)].map((star, index) => {
            index += 1;

            return (
              <button
                type="button"
                key={index}
                className={index <= (hover || rating) ? style.on : style.off}
                onClick={() => {
                  setRating(index);
                  addRate(index);
                }}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                <span className="star">&#9733;</span>
              </button>
            );
          })}
        </div>
      ) : (
        <div>You aren't authorized to estimate this product</div>
      )}
    </div>
  );
});

export default StarRating;
