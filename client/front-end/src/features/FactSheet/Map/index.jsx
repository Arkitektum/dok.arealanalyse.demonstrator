import { Paper } from '@mui/material';
import styles from './Map.module.scss';

export default function Map({ rasterResult }) {
    return (
        <Paper className={styles.mapImage}>
            <div >
                <img src={rasterResult} alt="Kartutsnitt" />
            </div>
        </Paper>
    );
}
