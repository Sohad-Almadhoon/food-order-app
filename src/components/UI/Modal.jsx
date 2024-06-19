import classes from './Modal.module.css'

const Modal = ({children }) => {
    return (
      <div className={classes.overlay}>
        <div className={classes.model}>
          <div className={classes.content}>{children}</div>
        </div>
      </div>
    );
}

export default Modal