import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import style from "./StarRating.module.css";
import { useParams } from "react-router-dom";
import { addRating } from "../../http/ratingApi";

const StarRating = observer(() => {
  const { user } = useContext(Context);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const { id } = useParams();
  const addRate = (index) => {
    setRating(index);
    addRating({ deviceId: id, rate: index });
  };
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
