import styles from 'flexboxgrid/dist/flexboxgrid.css';
// import styles from './flexboxgrid.scss';

export default function getClass(className) {
  return styles && styles[className] ? styles[className] : className;
}
