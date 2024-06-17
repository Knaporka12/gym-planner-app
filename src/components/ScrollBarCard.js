import muscleIcon from "../img/icons/muscle.png"
import kettleIcon from "../img/icons/kettlebell.png"

const ScrollBarCard = ({text, filter, setFilter, header}) => {

    let imgSrc;
    header === "body part" ? imgSrc = muscleIcon : imgSrc = kettleIcon;

    const defaultClassName = "scrollbar-card";

    const handleClick = () => {
        setFilter(text);
    }

    return (

    <div className={filter === text ? `${defaultClassName} chosen-card` : defaultClassName} onClick={handleClick}>
        <p>{text}</p>
        <img src={imgSrc} alt={`${header} icon`} />
    </div>

    )

}

export default ScrollBarCard
