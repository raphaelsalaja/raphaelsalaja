import styles from "./styles.module.css";

type StageProps = React.ComponentPropsWithoutRef<"div">;

const Stage: React.FC<StageProps> = (props) => {
  return (
    <div className={styles.stage} {...props} data-stage>
      {props.children}
    </div>
  );
};

export default Stage;
