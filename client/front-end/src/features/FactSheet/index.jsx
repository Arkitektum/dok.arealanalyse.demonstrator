import { useMemo, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper } from '@mui/material';
import GeneralInfo from './GeneralInfo';
import Map from './Map';
import Area from './Area';
import Buildings from './Buildings';
import Roads from './Roads';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import styles from './FactSheet.module.scss';

const DATASET_ID = {
    'AREA_TYPES': '166382b4-82d6-4ea9-a68e-6fd0c87bf788',
    'BUILDINGS': '24d7e9d1-87f6-45a0-b38e-3447f8d7f9a1',
    'ROADS': '900206a8-686f-4591-9394-327eb02d0899'
};

export default function FactSheet({ inputGeometryArea, municipalityNumber, municipalityName, rasterResult, cartography, factList }) {
    const [modalOpen, setModalOpen] = useState(false);

    const { areaTypes, buildings, roads } = useMemo(
        () => {
            return {
                areaTypes: factList
                    .find(({ runOnDataset }) => runOnDataset.datasetId === DATASET_ID.AREA_TYPES),
                buildings: factList
                    .find(({ runOnDataset }) => runOnDataset.datasetId === DATASET_ID.BUILDINGS),
                roads: factList
                    .find(({ runOnDataset }) => runOnDataset.datasetId === DATASET_ID.ROADS)
            };
        },
        [factList]
    );

    return (
        <>
            <div className={styles.factSheet}>
                <GeneralInfo
                    municipalityNumber={municipalityNumber}
                    municipalityName={municipalityName}
                    area={inputGeometryArea}
                />

                <Button
                    onClick={() => setModalOpen(true)}
                    variant="contained"
                    startIcon={<InfoIcon />}
                >
                    Vis faktaark
                </Button>
            </div>

            <Dialog
                open={modalOpen}
                sx={{
                    '& .MuiDialog-container': {
                        '& > .MuiPaper-root': {
                            maxWidth: '1280px',
                        }
                    }
                }}
                onClose={() => setModalOpen(false)}
            >
                <DialogTitle>Faktaark</DialogTitle>

                <IconButton
                    aria-label="Lukk"
                    onClick={() => setModalOpen(false)}
                    sx={theme => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>

                <DialogContent>
                    <GeneralInfo
                        municipalityNumber={municipalityNumber}
                        municipalityName={municipalityName}
                        area={inputGeometryArea}
                    />

                    <Map rasterResult={rasterResult} />
                    <Area factPart={areaTypes} />
                    <Buildings factPart={buildings} />
                    <Roads factPart={roads} />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setModalOpen(false)}>Lukk</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};